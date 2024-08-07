
import { makeAutoObservable } from "mobx"
import { player } from "../RotateGame/RotateGameStore";
import { store } from "../../stores/store";



export type GridSize = 5 | 8;

export type BoatSize = 5 | 3 | 2;
export type BoatDirection = 'up' | 'right' | 'down' | 'left';

export interface BoatPosition {
    x: number,
    y: number
}

export interface Boat {
    position: BoatPosition,
    size: BoatSize,
    direction: BoatDirection,
    gridsTaken: string[],
    status?: 'crashed',

    initialPosition: BoatPosition,
    initial: boolean
}

export interface Bomb {
    index: number,
    status: 'bombed' | 'missed' | 'blank' | 'set'
    cssGridArea?: CssGridArea | 'hidden'
    crashedBoat?: Boat
}

export interface CssGridArea {
    row_start: number,
    row_end: number,
    column_start: number,
    column_end: number
}

export interface BoatDashboard {
    attackPrimaryBombs: Bomb[],
    attackSecondaryBombs: Bomb[],

    primaryBoats: Boat[],
    secondaryBoats: Boat[]
}

const right = window.innerWidth * 0.75;


export default class BombGameStore {

    dashboard: BoatDashboard = {
        attackPrimaryBombs: [],
        attackSecondaryBombs: [],
        // primaryBoats: this.getBoatsFromLocalStorage('primary'),
        // secondaryBoats: this.getBoatsFromLocalStorage('secondary')
        primaryBoats: [],
        secondaryBoats: []
    }

    tempBombs: { primaryIndex?: number, secondaryIndex?: number } = {}

    initialBoats: Boat[] = [
        {
            position: { x: 0, y: 200 }, direction: 'right', size: 3, gridsTaken: [],
            initial: true, initialPosition: { x: 0, y: 200 }
        },
        {
            position: { x: 0, y: 0 }, direction: 'right', size: 2, gridsTaken: [],
            initial: true, initialPosition: { x: 0, y: 0 }
        },
        {
            position: { x: right, y: 200 }, direction: 'right', size: 3, gridsTaken: [],
            initial: true, initialPosition: { x: right, y: 200 }
        },
        {
            position: { x: right, y: 0 }, direction: 'right', size: 2, gridsTaken: [],
            initial: true, initialPosition: { x: right, y: 0 }
        },
    ]

    boats: Boat[] = this.initialBoats;

    player1Ready = false;
    player2Ready = false;
    currentPlayer: player | 'bomb' = 'primary';
    // currentPlayer: player | 'bomb' = 'bomb';

    gridSize = 5;

    dragging = false;
    draggingIndex: number | undefined = undefined;
    dragStartPosition: BoatPosition = { x: 0, y: 0 };

    constructor() {
        makeAutoObservable(this);

        const bombs: Bomb[] = []
        for (let i = 0; i < this.gridSize ** 2; i++) {
            bombs.push({ index: i, status: 'blank' });
        }

        this.dashboard.attackPrimaryBombs = bombs;
        this.dashboard.attackSecondaryBombs = bombs;
    }

    getBoatsFromLocalStorage(player: player): Boat[] {
        const localStorageString = localStorage.getItem(`boat_${player}`);
        if (localStorageString) {
            const data = JSON.parse(localStorageString) as unknown as Boat[];
            return data;
        }

        throw new Error('no boat data found from localstorage');
    }

    getTargetBomb(player: player, index: number): Bomb {
        if (player === 'primary') {
            return this.dashboard.attackPrimaryBombs[index];
        }
        return this.dashboard.attackSecondaryBombs[index];
    }

    setBomb(player: player, index: number): void {

        // clear privous selection to blank
        if (this.tempBombs.primaryIndex !== undefined && player === 'primary') {
            let targetBomb = this.getTargetBomb(player, this.tempBombs.primaryIndex);
            targetBomb.status = 'blank';
            this.updateBomb(player, this.tempBombs.primaryIndex, targetBomb);
        }
        if (this.tempBombs.secondaryIndex !== undefined && player === 'secondary') {
            let targetBomb = this.getTargetBomb(player, this.tempBombs.secondaryIndex);
            targetBomb.status = 'blank';
            this.updateBomb(player, this.tempBombs.secondaryIndex, targetBomb);
        }

        // make new one to status set
        if (player === 'primary') {
            this.tempBombs.primaryIndex = index;
        } else {
            this.tempBombs.secondaryIndex = index;
        }

        let targetBomb = this.getTargetBomb(player, index);
        targetBomb.status = 'set';
        this.updateBomb(player, index, targetBomb);
    }

    triggerBomb(): void {
        const primarySuccess = this.bomb('primary', this.tempBombs.primaryIndex!);
        const secondarySuccess = this.bomb('secondary', this.tempBombs.secondaryIndex!);
        const gameMatch = (
            this.dashboard.primaryBoats.filter(x => x.status === 'crashed').length > 2 ||
            this.dashboard.primaryBoats.filter(x => x.status === 'crashed').length > 2
        );

        if ((primarySuccess || secondarySuccess) && !gameMatch) {
            // show congras
            store.playerStore.toggleWinnerWithoutLoop();
        }

        if (gameMatch) {
            store.playerStore.toggleWinner();
        }

        this.tempBombs = {};        
    }

    /**
     * 
     * @param player 
     * @param index 
     * @returns true if any boat is crashed within this attack
     */
    bomb(player: player, index: number): boolean {

        // set bomb
        const target: Bomb = this.getTargetBomb(player, index);
        if (target === undefined) {
            throw new Error(`Bomb (playe: ${player}, index: ${index}) not found`);
        }

        target.status = this.targetBombed(player, index) ? 'bombed' : 'missed';
        this.updateBomb(player, index, target);

        // check any boat is crashed
        const newlyCrashedBoatIndex = this.checkAnyBoatCrashed(player);
        if (newlyCrashedBoatIndex === -1) {
            return false;
        }

        const targetBoat: Boat = this.getTargetBoat(player, newlyCrashedBoatIndex);
        targetBoat.status = 'crashed';
        this.updateBoat(player, newlyCrashedBoatIndex, targetBoat);

        // starting grid css: grid-area calculation: CssGridArea
        const startingGridIndex = this.convertGridIdToIndex(targetBoat.gridsTaken[0]);
        const area: CssGridArea = this.getBoatCssGridArea(targetBoat);
        let targetBomb = this.getTargetBomb(player, startingGridIndex);
        targetBomb.cssGridArea = area;
        targetBomb.crashedBoat = targetBoat;
        this.updateBomb(player, startingGridIndex, targetBomb);

        // hide grid
        for (let i = 1; i < targetBoat.gridsTaken.length; i++) {
            const gridIndex = this.convertGridIdToIndex(targetBoat.gridsTaken[i]);
            let targetBomb = this.getTargetBomb(player, gridIndex);
            targetBomb.cssGridArea = 'hidden';
            this.updateBomb(player, gridIndex, targetBomb);
        }

        return true;
    }

    updateBoat(player: player, index: number, boat: Boat) {
        if (player === 'primary') {
            this.dashboard.primaryBoats[index] = boat;
            return;
        }

        this.dashboard.secondaryBoats[index] = boat;
    }


    getTargetBoat(player: player, index: number): Boat {
        if (player === 'primary') {
            return this.dashboard.primaryBoats[index];
        }
        return this.dashboard.secondaryBoats[index];
    }


    updateBomb(player: player, index: number, bomb: Bomb) {
        if (player === 'primary') {
            this.dashboard.attackPrimaryBombs[index] = bomb;
            return;
        }
        this.dashboard.attackSecondaryBombs[index] = bomb;

    }


    convertGridIdToIndex(gridId: string): number {
        return parseInt(gridId.replace('grid', ''));
    }

    getBoatCssGridArea(boat: Boat): CssGridArea {
        const gridId = boat.gridsTaken[0];
        const gridIndex = parseInt(gridId.replace('grid', ''));
        const row_start = Math.floor(gridIndex / this.gridSize) + 1;
        const column_start = (gridIndex % this.gridSize) + 1;

        let row_end = 0;
        let column_end = 0;
        if (boat.direction == 'left' || boat.direction == 'right') {
            row_end = row_start + 1;
            column_end = column_start + boat.size;
        } else {
            row_end = row_start + boat.size;
            column_end = column_start + 1;
        }

        return { row_end, row_start, column_end, column_start };
    }


    checkAnyBoatCrashed(player: player): number {
        let boats: Boat[] = [];
        let bombs: Bomb[] = [];
        if (player === 'primary') {
            boats = this.dashboard.primaryBoats;
            bombs = this.dashboard.attackPrimaryBombs;
        } else {
            boats = this.dashboard.secondaryBoats;
            bombs = this.dashboard.attackSecondaryBombs;
        }

        const validBombs = bombs.filter(x => x.status === 'bombed');
        for (let i = 0; i < boats.length; i++) {
            const boat = boats[i];
            if (boat.status === 'crashed') {
                continue;
            }

            const crashed = this.checkBoatCrashed(boat, validBombs);
            if (crashed) {
                return i;
            }
        }

        return -1;
    }


    checkBoatCrashed(boat: Boat, validBombs: Bomb[]): boolean {
        let crashed = true;
        for (let j = 0; j < boat.gridsTaken.length; j++) {

            const gridIndex = this.convertGridIdToIndex(boat.gridsTaken[j]);
            if (validBombs.filter(x => x.index === gridIndex).length === 0) {
                crashed = false;
                break;
            }
        }
        return crashed;
    }


    targetBombed(player: player, index: number): boolean {
        const boats = player === 'primary' ? this.dashboard.primaryBoats : this.dashboard.secondaryBoats;
        for (let i = 0; i < boats.length; i++) {
            for (let j = 0; j < boats[i].gridsTaken.length; j++) {
                const gridId = boats[i].gridsTaken[j];
                if (gridId === `grid${index}`) {
                    return true;
                }
            }
        }
        return false;
    }

    setToDefaultPosition(index: number): void {
        let targetBoat = this.boats[index];

        targetBoat.gridsTaken.forEach((id) => {
            document.getElementById(id)?.classList.remove('active');
        })

        targetBoat.gridsTaken = [];
        targetBoat.position = targetBoat.initialPosition;
        targetBoat.initial = true;
        this.boats[index] = targetBoat;
    }

    rotateBoat(index: number): void {
        let targetBoat = this.boats[index];

        if (targetBoat.gridsTaken.length > 0) {
            console.warn('boat is already set can not be roated');
            return;
        }

        if (targetBoat.direction === 'up') {
            targetBoat.direction = 'right';
        } else if (targetBoat.direction === 'right') {
            targetBoat.direction = 'down';
        } else if (targetBoat.direction === 'down') {
            targetBoat.direction = 'left';
        } else {
            targetBoat.direction = 'up';
        }

        this.boats[index] = targetBoat;
    }

    isPrimaryPlayer(): boolean {
        return this.currentPlayer === 'primary';
    }

    checkAllBoatsActive(): boolean {
        let result = true;

        this.boats.forEach((boat) => {
            if (boat.gridsTaken.length === 0) {
                result = false;
                return;
            }
        })

        return result;
    }

    handleDragStart(e: React.DragEvent<HTMLDivElement>, index: number): void {
        if (e.target) {
            this.draggingIndex = index;
            this.dragging = true;
            this.dragStartPosition = { x: e.clientX, y: e.clientY };
        }
    }

    checkValidMove(position: BoatPosition): boolean | string[] {
        let elements = document.elementsFromPoint(position.x, position.y);

        const gridElements = elements.filter(e => e.classList.contains('grid-item'));

        if (gridElements.length === 0) {
            console.warn('invalid move: no any grid-item is overlapped')
            return false;
        } else if (gridElements.length > 1) {
            console.warn('invalid move: overlapping more than 1 grid-item')
            return false;
        }

        const element = gridElements[0];
        if (element.classList.contains("active")) {
            console.warn('invalid move: overlapped grid-item is already taken')
            return false;
        }
        const targetId = element.id;

        const targetIndex = parseInt(targetId.replace('grid', ''));
        if (this.draggingIndex === undefined) {
            console.warn('draggingIndex is undefined');
            return false;
        }

        const targetBoat = this.boats[this.draggingIndex];

        const direction = targetBoat.direction;
        const size = targetBoat.size;
        const shipSizeGridIds: string[] = []
        if (direction === 'left' || direction === 'right') {
            for (let i = 0; i < size; i++) {
                shipSizeGridIds.push(`grid${targetIndex + i}`)
            }
        } else if (direction === 'up' || direction === 'down') {
            for (let i = 0; i < size; i++) {
                shipSizeGridIds.push(`grid${targetIndex + i * this.gridSize}`)
            }
        }

        for (let j = 0; j < shipSizeGridIds.length; j++) {
            const id = shipSizeGridIds[j];
            const element = document.getElementById(id);
            if (element?.classList.contains("active")) {
                console.warn('invalid move: overlapped grid-item is already taken')
                return false;
            }
        }

        return shipSizeGridIds;
    }

    drop(ev: React.DragEvent<HTMLDivElement>): void {
        ev.preventDefault();

        const delta: BoatPosition = {
            x: ev.clientX - this.dragStartPosition.x,
            y: ev.clientY - this.dragStartPosition.y
        };

        // get target boat
        if (this.draggingIndex === undefined) {
            console.warn('draggingIndex is undefined');
            return;
        }

        let targetBoat = this.boats[this.draggingIndex];

        const boatRect = document.getElementById(`ship${this.draggingIndex}`)!.getBoundingClientRect();


        let newPosition: BoatPosition = { x: 0, y: 0 };
        if (targetBoat.direction === 'left' || targetBoat.direction === 'right') {
            newPosition = {
                x: targetBoat.position.x + delta.x,
                y: targetBoat.position.y + delta.y + boatRect.width / 2
            }
        } else {
            newPosition = {
                x: targetBoat.position.x + delta.x + boatRect.width / 2,
                y: targetBoat.position.y + delta.y
            }
        }
        // document.getElementById('redDot')!.style.left = `${newPosition.x}px`;
        // document.getElementById('redDot')!.style.top = `${newPosition.y}px`;

        const gridsTaken = this.checkValidMove(newPosition);
        if (typeof gridsTaken == "boolean" && gridsTaken === false) {
            return;
        }

        // get center point for grids taken, and adjust position of boat
        const centerPoint: BoatPosition = this.calculateCenterPoint(gridsTaken as string[]);
        // document.getElementById('yellowDot')!.style.left = `${centerPoint.x}px`;
        // document.getElementById('yellowDot')!.style.top = `${centerPoint.y}px`;


        // const centerPointBoat: BoatPosition = { x: newPosition.x + boatRect.width / 2, y: newPosition.y + boatRect.height / 2 };
        newPosition = {
            x: centerPoint.x - boatRect.width / 2,
            y: centerPoint.y - boatRect.height / 2
        }

        // remove color of previous taken grids
        this.removeColorActive(targetBoat.gridsTaken);

        // set position
        targetBoat.position = newPosition;
        targetBoat.gridsTaken = gridsTaken as string[];
        targetBoat.initial = false;
        this.setColorActive(targetBoat.gridsTaken);

        // update boats
        this.boats[this.draggingIndex] = targetBoat;
        this.dragging = false;
        this.draggingIndex = undefined;

        // check all 
        if (this.checkAllBoatsActive()) {
            if (this.isPrimaryPlayer()) {
                this.player1Ready = true;
            } else {
                this.player2Ready = true;
            }
        }
    }


    calculateCenterPoint(takenGridIds: string[]): BoatPosition {
        const positionX: number[] = [];
        const positionY: number[] = [];

        for (let i = 0; i < takenGridIds.length; i++) {
            const id = takenGridIds[i];
            const react = document.getElementById(id)!.getBoundingClientRect();

            positionX.push(react.x);
            positionX.push(react.x + react.width);

            positionY.push(react.y);
            positionY.push(react.y + react.height);
        }

        const maxX = Math.max(...positionX.map(x => x));
        const minX = Math.min(...positionX.map(x => x));

        const maxY = Math.max(...positionY.map(x => x));
        const minY = Math.min(...positionY.map(x => x));

        const center = { x: (maxX + minX) / 2 - 30, y: (maxY + minY) / 2 - 30 }
        return center;
    }


    saveBoatsToLocalStorage(player: player) {
        localStorage.setItem(`boat_${player}`, JSON.stringify(this.boats));

        // clear boat data
        this.boats = this.initialBoats;

        // clear active grid
        var elems = document.querySelectorAll(".grid-item.active");
        elems.forEach((e) => {
            e.classList.remove("active");
        })

        // change player
        if (player === 'primary') {
            this.currentPlayer = 'secondary';
        } else if (player === 'secondary') {
            this.currentPlayer = 'bomb';

            // create initial dashboard
            const bombs: Bomb[] = []
            for (let i = 0; i < this.gridSize ** 2; i++) {
                bombs.push({ index: i, status: 'blank' });
            }

            this.dashboard.attackPrimaryBombs = bombs;
            this.dashboard.attackSecondaryBombs = bombs;
            this.dashboard.primaryBoats = this.getBoatsFromLocalStorage('primary');
            this.dashboard.secondaryBoats = this.getBoatsFromLocalStorage('secondary');
        }

    }

    setColorActive(gridsTaken: string[]) {
        // update grid color
        for (let j = 0; j < gridsTaken.length; j++) {
            const id = gridsTaken[j];
            const element = document.getElementById(id);
            element?.classList.add("active");
        }
    }

    removeColorActive(gridsTaken: string[]) {
        // update grid color
        for (let j = 0; j < gridsTaken.length; j++) {
            const id = gridsTaken[j];
            const element = document.getElementById(id);
            element?.classList.remove("active");
        }
    }
}
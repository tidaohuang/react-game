
import { makeAutoObservable } from "mobx"
import { player } from "../RotateGame/RotateGameStore";
import { MouseEvent } from "react";



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
    status?: 'crashed'
}

export interface Bomb {
    index: number,
    status: 'bombed' | 'missed' | 'blank'
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


export default class BombGameStore {

    dashboard: BoatDashboard = {
        attackPrimaryBombs: [],
        attackSecondaryBombs: [],
        primaryBoats: this.getBoatsFromLocalStorage('primary'),
        secondaryBoats: this.getBoatsFromLocalStorage('secondary')
    }

    initialBoats: Boat[] = [
        { position: { x: 0, y: 0 }, direction: 'left', size: 3, gridsTaken: [] },
        { position: { x: 0, y: 0 }, direction: 'right', size: 3, gridsTaken: [] },
        { position: { x: 0, y: 0 }, direction: 'up', size: 2, gridsTaken: [] },
        { position: { x: 0, y: 0 }, direction: 'up', size: 2, gridsTaken: [] },
    ]

    boats: Boat[] = this.initialBoats;

    player1Ready = false;
    player2Ready = false;
    // currentPlayer: player | 'bomb' = 'primary';
    currentPlayer: player | 'bomb' = 'bomb';

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

    bomb(player: player, index: number): void {

        // set bomb
        const target: Bomb = this.getTargetBomb(player, index);
        target.status = this.targetBombed(player, index) ? 'bombed' : 'missed';
        this.updateBomb(player, index, target);

        // check any boat is crashed
        const newlyCrashedBoatIndex = this.checkAnyBoatCrashed(player);
        if (newlyCrashedBoatIndex === -1) {
            return;
        }

        const targetBoat: Boat = this.getTargetBoat(player, newlyCrashedBoatIndex);
        targetBoat.status = 'crashed';
        this.updateBoat(player, index, targetBoat);

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

        return;


        if (player === 'primary') {


            // // set bomb
            // let targetGrid = this.dashboard.attackPrimaryBombs[index];
            // targetGrid.status = this.targetBombed(player, index) ? 'bombed' : 'missed';
            // this.dashboard.attackPrimaryBombs[index] = targetGrid;


            // check any boat is crashed
            const newlyCrashedBoatIndex = this.checkAnyBoatCrashed(player);

            if (newlyCrashedBoatIndex != -1) {
                // // alert(`boat with index: ${newlyCrashedBoatIndex} crashed`);
                // let targetBoat = this.dashboard.primaryBoats[newlyCrashedBoatIndex];
                // targetBoat.status = 'crashed';
                // //console.log(JSON.stringify(targetBoat));
                // this.dashboard.primaryBoats[newlyCrashedBoatIndex] = targetBoat;

                // // starting grid css: grid-area calculation: CssGridArea
                // const startingGridIndex = this.convertGridIdToIndex(targetBoat.gridsTaken[0]);
                // const area: CssGridArea = this.getBoatCssGridArea(targetBoat);
                // let targetBomb = this.dashboard.attackPrimaryBombs[startingGridIndex];
                // targetBomb.cssGridArea = area;
                // targetBomb.crashedBoat = targetBoat;
                // this.dashboard.attackPrimaryBombs[startingGridIndex] = targetBomb;

                // console.log(targetBoat.gridsTaken);

                // hide grid
                for (let i = 1; i < targetBoat.gridsTaken.length; i++) {
                    const gridIndex = this.convertGridIdToIndex(targetBoat.gridsTaken[i]);
                    // console.log(`gridIndex: ${gridIndex}`);
                    let targetBomb = this.dashboard.attackPrimaryBombs[gridIndex];
                    targetBomb.cssGridArea = 'hidden';
                    this.dashboard.attackPrimaryBombs[gridIndex] = targetBomb;
                }

            }

        }
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
        console.log(`gridIndex: ${gridIndex}`)
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

            let crashed = true;
            for (let j = 0; j < boat.gridsTaken.length; j++) {
                const gridId = boat.gridsTaken[j]; // grid1
                const gridIndex = parseInt(gridId.replace('grid', '')); // 1
                if (validBombs.filter(x => x.index === gridIndex).length === 0) {
                    crashed = false;
                    break;
                }
            }

            if (crashed) {
                return i;
            }
        }

        return -1;
    }


    targetBombed(player: player, index: number): boolean {

        const boats = this.isPrimaryPlayer() ? this.dashboard.primaryBoats : this.dashboard.secondaryBoats;

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
        targetBoat.position = { x: 0, y: 0 };
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
        // console.log('store handleDragStart')
        // console.log(e);
        if (e.target) {
            // console.log(e.clientX);
            // console.log(e.clientY);
            this.draggingIndex = index;
            this.dragging = true;
            this.dragStartPosition = { x: e.clientX, y: e.clientY };
            //console.log('dragStartPosition: ' + JSON.stringify(this.dragStartPosition));
        }
    }

    checkValidMove(position: BoatPosition): boolean | string[] {

        let elements = document.elementsFromPoint(position.x + 50, position.y + 80 + 60);

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
        //console.log('targetIndex: ' + targetIndex);

        // left/right direction [FIXME]

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

        const newPosition: BoatPosition = {
            x: targetBoat.position.x + delta.x,
            y: targetBoat.position.y + delta.y
        }

        const validMove = this.checkValidMove(newPosition);
        if (validMove === false) {
            return;
        }

        // remove color of previous taken grids
        this.removeColorActive(targetBoat.gridsTaken);

        // set position
        targetBoat.position = newPosition;
        targetBoat.gridsTaken = validMove as string[];
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



        // const react = document.getElementById('myship')!.getBoundingClientRect();
        // console.log(`size: (width: ${react.width}, height: ${react.height})`);
        // console.log(`correct previous pos: (x: ${react.x}, y: ${react.y})`);
        // console.log(`pos: (x: ${newPosition.x}, y: ${newPosition.y})`);

    }


    saveBoatsToLocalStorage() {

        localStorage.setItem(`boat_${this.currentPlayer}`, JSON.stringify(this.boats));


        // clear boat data
        this.boats = this.initialBoats;

        // clear active grid
        var elems = document.querySelectorAll(".grid-item.active");
        elems.forEach((e) => {
            e.classList.remove("active");
        })


        // change player
        if (this.isPrimaryPlayer()) {
            this.currentPlayer = 'secondary';
        } else {
            this.currentPlayer = 'bomb';

            // create initial dashboard
            const bombs: Bomb[] = []
            for (let i = 0; i < this.gridSize ** 2; i++) {
                bombs.push({ index: i, status: 'blank' });
            }

            this.dashboard.attackPrimaryBombs = bombs;
            this.dashboard.attackSecondaryBombs = bombs;
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
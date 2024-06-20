
import { makeAutoObservable, runInAction } from "mobx"



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
    gridsTaken: string[]
}


export default class BombGameStore {

    boats: Boat[] = [
        { position: { x: 0, y: 0 }, direction: 'left', size: 3, gridsTaken: [] },
        { position: { x: 0, y: 0 }, direction: 'left', size: 3, gridsTaken: [] }
    ];

    dragging = false;
    draggingIndex: number | undefined = undefined;
    dragStartPosition: BoatPosition = { x: 0, y: 0 };

    constructor() {
        makeAutoObservable(this);
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
        console.log('targetIndex: ' + targetIndex);

        // left/right direction [FIXME]
        const direction = 'left';
        const size = 3;
        const shipSizeGridIds: string[] = []
        if (direction === 'left' || direction === 'right') {
            for (let i = 0; i < size; i++) {
                shipSizeGridIds.push(`grid${targetIndex + i}`)
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




        // const react = document.getElementById('myship')!.getBoundingClientRect();
        // console.log(`size: (width: ${react.width}, height: ${react.height})`);
        // console.log(`correct previous pos: (x: ${react.x}, y: ${react.y})`);
        // console.log(`pos: (x: ${newPosition.x}, y: ${newPosition.y})`);

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
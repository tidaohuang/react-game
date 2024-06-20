
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
    direction: BoatDirection
}


export default class BombGameStore {

    dragging = false;

    dragStartPosition: BoatPosition = { x: 0, y: 0 };

    intialBoat: Boat = { position: { x: 0, y: 0 }, direction: 'left', size: 3 };

    constructor() {
        makeAutoObservable(this);
    }

    handleDragStart(e: React.DragEvent<HTMLDivElement>): void {
        // console.log('store handleDragStart')
        // console.log(e);
        if (e.target) {
            // console.log(e.clientX);
            // console.log(e.clientY);

            this.dragging = true;
            this.dragStartPosition = { x: e.clientX, y: e.clientY };
            //console.log('dragStartPosition: ' + JSON.stringify(this.dragStartPosition));
        }
    }

    drop(ev: React.DragEvent<HTMLDivElement>): void {
        ev.preventDefault();

        const delta: BoatPosition = {
            x: ev.clientX - this.dragStartPosition.x,
            y: ev.clientY - this.dragStartPosition.y
        };


        const newPosition: BoatPosition = {
            x: this.intialBoat.position.x + delta.x,
            y: this.intialBoat.position.y + delta.y
        }

        this.intialBoat.position = newPosition;


        this.dragging = false;
    }
}
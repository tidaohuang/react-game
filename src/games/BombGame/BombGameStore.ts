
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

    dragStartPosition: BoatPosition = { x: 0, y: 0 };

    intialBoat: Boat = { position: { x: 0, y: 0 }, direction: 'left', size: 3 };

    constructor() {
        makeAutoObservable(this);
    }

    handleDragStart(e: React.DragEvent<HTMLDivElement>): void {
        console.log('store handleDragStart')

        console.log(e);
        if (e.target) {
            console.log(e.clientX);
            console.log(e.clientY);
            console.log('dragStartPosition: ' + JSON.stringify(this.dragStartPosition));

            // e.dataTransfer.setData("text", (e.target as Element).id);
            runInAction(() => {
                this.dragStartPosition = { x: e.clientX, y: e.clientY };
            });
        }
    }
}
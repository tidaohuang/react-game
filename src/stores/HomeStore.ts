
import { makeAutoObservable } from "mobx";
import { GameCard, games } from "../constants/Games";






export default class HomeStore {


    games: GameCard[] = games;

    gameIndexes: number[] = [];
    startingCardIndex = 0;

    constructor() {
        makeAutoObservable(this);

        for (let i = 0; i < this.games.length; i++) {
            if (i < 5) {
                this.gameIndexes.push(i);
            }
        }
    }

    handleNext() {
        const tempIndexes: number[] = [];
        for (let i = 1; i <= 5; i++) {
            const tempIndex = this.startingCardIndex + i;
            if (tempIndex > this.games.length - 1) {
                tempIndexes.push(tempIndex - this.games.length)
            } else {
                tempIndexes.push(tempIndex)
            }
        }

        this.gameIndexes = tempIndexes;
        this.startingCardIndex = tempIndexes[0];
    }

    handlePrevious() {
        const tempIndexes: number[] = [];
        for (let i = 0; i < this.gameIndexes.length; i++) {
            const tempIndex = this.gameIndexes[i] - 1;
            if (tempIndex < 0) {
                tempIndexes.push(tempIndex + this.games.length)
            } else {
                tempIndexes.push(tempIndex)
            }
        }

        this.gameIndexes = tempIndexes;
        this.startingCardIndex = tempIndexes[0];
    }

}

import { makeAutoObservable } from "mobx"


export default class PlayerStore {


    showWinner = false;
    loop = true;



    constructor() {
        makeAutoObservable(this);
    }

    toggleWinner() {
        this.loop = true;
        this.showWinner = !this.showWinner;
    }

    toggleWinnerWithoutLoop() {
        this.loop = false;
        this.showWinner = !this.showWinner;
    }

}
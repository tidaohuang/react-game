
import { makeAutoObservable } from "mobx"


export default class PlayerStore {


    showWinner = false;



    constructor() {
        makeAutoObservable(this);
    }

    toggleWinner(){
        this.showWinner = !this.showWinner;
    }
}
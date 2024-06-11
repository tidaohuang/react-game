import { makeAutoObservable } from "mobx"



export default class NavBarStore {

    show: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggle = () => {
        this.show = !this.show;
    }
}
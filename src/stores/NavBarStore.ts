import { makeAutoObservable } from "mobx"
import { PAGE } from "../constants/Pages";






export default class NavBarStore {

    show: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggle = () => {
        this.show = !this.show;
    }

    getUrl(page: PAGE): string {
        return `/react-game/?g=${page}`;
    }
}
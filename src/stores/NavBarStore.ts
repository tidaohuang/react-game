import { makeAutoObservable } from "mobx"


export enum PAGE {
    Home = '',
    Rotate = 'rotate',
    FiveSeconds = 'five-seconds',
    Bomb = 'bomb',
    HeartConnect = 'heart-connect',
    Test = 'test'
}



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
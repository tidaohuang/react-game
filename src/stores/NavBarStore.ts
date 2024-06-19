import { makeAutoObservable } from "mobx"


export enum PAGE {
    Home = '',
    Rotate = 'rotate',
    FiveSeconds = '5seconds',
    Bomb = 'bomb',
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
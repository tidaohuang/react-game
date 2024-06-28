
import { makeAutoObservable } from "mobx"
import { PAGE } from "./NavBarStore";



export interface GameCard {
    name: string,
    img?: string | undefined,
    page: PAGE,
    tag: 'green' | 'dev',
    playerNumber: number | 'unlimited',
    time: string,
    category: '益智類' | '反應類' | '默契類'
    complexity: 1 | 2 | 3 | 4,
}



export default class HomeStore {


    games: GameCard[] = [
        {
            name: '旋轉棋',
            img: 'rotate-game-logo.svg',
            page: PAGE.Rotate,
            tag: 'green',
            playerNumber: 2,
            time: '5-10 mins',
            category: '益智類',
            complexity: 3
        },
        {
            name: '5秒反應',
            img: 'five-seconds-game-logo.svg',
            page: PAGE.FiveSeconds,
            tag: 'green',
            playerNumber: 'unlimited',
            time: '5-10 mins',
            category: '反應類',
            complexity: 1
        },
        {
            name: '深水炸彈',
            img: 'bomb-game-logo.svg',
            tag: 'green',
            page: PAGE.Bomb,
            playerNumber: 2,
            time: '5-10 mins',
            category: '益智類',
            complexity: 2
        },
        {
            name: '心電感應',
            img: 'heart-connection-logo.svg',
            tag: 'green',
            page: PAGE.HeartConnect,
            playerNumber: 2,
            time: '5-10 mins',
            category: '默契類',
            complexity: 2
        },
        {
            name: '步步為營',
            img: undefined,
            tag: 'dev',
            page: PAGE.Home,
            playerNumber: 2,
            time: '5-10 mins',
            category: '益智類',
            complexity: 2
        }
    ]

    gameIndexes: number[] = [];
    startingCardIndex = 0;

    constructor() {
        makeAutoObservable(this);

        for (let i = 0; i < this.games.length; i++) {
            this.gameIndexes.push(i);
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
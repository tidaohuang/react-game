import { PAGE } from "./Pages";


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


export const games: GameCard[] = [
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
        name: '模仿大賽',
        img: undefined,
        tag: 'dev',
        page: PAGE.Sticker,
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
];
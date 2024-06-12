
import { makeAutoObservable } from "mobx";
import { store } from "../../stores/store";


type player = 'primary' | 'secondary';
export type ColroStatus = 'p' | 's' | 'b'
export type GridStatus = 'active' | 'disable' | 'blank' | 'movable';
export type gridType = 'outer' | 'inner';
export type ArrowDirection = 'up' | 'right' | 'down' | 'left';

export interface CardStatus {
    gridStatus: GridStatus,
    colorStatus: ColroStatus,
    showDirectionNav: boolean,
    success: boolean
}


export type cardIndex = { gridType: gridType; gridIndex: number; } | undefined

export interface NavDirectionMap {
    up: cardIndex,
    right: cardIndex,
    down: cardIndex,
    left: cardIndex,
}

export default class RotateGameStore {
    currentPlayer: player = 'primary';
    activePrimaryCount = 0;
    activeSecondaryCount = 0;
    innerCardStatusList: CardStatus[] = this.getInitialStatusList(4);
    outerCardStatusList: CardStatus[] = this.getInitialStatusList(12);
    navDirectionMap: { inner: NavDirectionMap[], outer: NavDirectionMap[] } = {
        inner: [
            {
                up: { gridType: 'outer', gridIndex: 1 },
                right: { gridType: 'inner', gridIndex: 1 },
                down: { gridType: 'inner', gridIndex: 3 },
                left: { gridType: 'outer', gridIndex: 11 }
            }, // 0
            {
                up: { gridType: 'outer', gridIndex: 2 },
                right: { gridType: 'outer', gridIndex: 4 },
                down: { gridType: 'inner', gridIndex: 2 },
                left: { gridType: 'inner', gridIndex: 0 }
            }, // 1
            {
                up: { gridType: 'inner', gridIndex: 1 },
                right: { gridType: 'outer', gridIndex: 5 },
                down: { gridType: 'outer', gridIndex: 7 },
                left: { gridType: 'inner', gridIndex: 3 }
            }, // 2
            {
                up: { gridType: 'inner', gridIndex: 0 },
                right: { gridType: 'inner', gridIndex: 2 },
                down: { gridType: 'outer', gridIndex: 8 },
                left: { gridType: 'outer', gridIndex: 10 }
            }, // 3            
        ],
        outer: [
            {
                up: undefined,
                right: { gridType: 'outer', gridIndex: 1 },
                down: { gridType: 'outer', gridIndex: 11 },
                left: undefined
            }, // 0
            {
                up: undefined,
                right: { gridType: 'outer', gridIndex: 2 },
                down: { gridType: 'inner', gridIndex: 0 },
                left: { gridType: 'outer', gridIndex: 0 }
            }, // 1
            {
                up: undefined,
                right: { gridType: 'outer', gridIndex: 3 },
                down: { gridType: 'inner', gridIndex: 1 },
                left: { gridType: 'outer', gridIndex: 1 }
            }, // 2
            {
                up: undefined,
                right: undefined,
                down: { gridType: 'outer', gridIndex: 4 },
                left: { gridType: 'outer', gridIndex: 2 }
            }, // 3
            {
                up: { gridType: 'outer', gridIndex: 3 },
                right: undefined,
                down: { gridType: 'outer', gridIndex: 5 },
                left: { gridType: 'inner', gridIndex: 1 }
            }, // 4
            {
                up: { gridType: 'outer', gridIndex: 4 },
                right: undefined,
                down: { gridType: 'outer', gridIndex: 6 },
                left: { gridType: 'inner', gridIndex: 2 }
            }, // 5
            {
                up: { gridType: 'outer', gridIndex: 5 },
                right: undefined,
                down: undefined,
                left: { gridType: 'outer', gridIndex: 7 }
            }, // 6
            {
                up: { gridType: 'inner', gridIndex: 2 },
                right: { gridType: 'outer', gridIndex: 6 },
                down: undefined,
                left: { gridType: 'outer', gridIndex: 8 }
            }, // 7
            {
                up: { gridType: 'inner', gridIndex: 3 },
                right: { gridType: 'outer', gridIndex: 7 },
                down: undefined,
                left: { gridType: 'outer', gridIndex: 9 }
            }, // 8
            {
                up: { gridType: 'outer', gridIndex: 10 },
                right: { gridType: 'outer', gridIndex: 8 },
                down: undefined,
                left: undefined
            }, // 9
            {
                up: { gridType: 'outer', gridIndex: 11 },
                right: { gridType: 'inner', gridIndex: 3 },
                down: { gridType: 'outer', gridIndex: 9 },
                left: undefined
            }, // 10
            {
                up: { gridType: 'outer', gridIndex: 0 },
                right: { gridType: 'inner', gridIndex: 0 },
                down: { gridType: 'outer', gridIndex: 10 },
                left: undefined
            }, // 11
        ]
    }

    activeGrid: { gridType: gridType, gridIndex: number } | undefined = undefined;
    moveCount = 0;

    constructor() {
        makeAutoObservable(this);
    }

    validMove(direction: ArrowDirection, gridType: gridType, gridIndex: number): boolean {

        const directionObject = this.navDirectionMap[gridType][gridIndex];
        let nextCardGridIndex: cardIndex = undefined;
        if (direction === 'up') {
            nextCardGridIndex = directionObject.up;
        } else if (direction === 'right') {
            nextCardGridIndex = directionObject.right;
        } else if (direction === 'down') {
            nextCardGridIndex = directionObject.down;
        } else {
            nextCardGridIndex = directionObject.left;
        }

        if(nextCardGridIndex === undefined){
            return false;
        }

        // valid move but check color status
        const cardStatus = this.getCardStatus(nextCardGridIndex.gridType, nextCardGridIndex.gridIndex);
        if (cardStatus.colorStatus !== 'b'){
            return false;
        }

        return true;
    }


    moveGrid(direction: ArrowDirection, gridType: gridType, gridIndex: number, cardStatus: CardStatus): void {

        // change origin to blank
        const tempCardStatus: CardStatus = { gridStatus: 'blank', colorStatus: 'b', showDirectionNav: !cardStatus.showDirectionNav, success: false };
        this.updateSingleGrid(gridType, gridIndex, tempCardStatus);

        // move by direction

        const directionMap = this.navDirectionMap[gridType][gridIndex];
        let moveToGrid: { gridType: gridType, gridIndex: number } | undefined = undefined;
        if (direction === 'up') {
            moveToGrid = directionMap.up;
        } else if (direction === 'right') {
            moveToGrid = directionMap.right;
        } else if (direction === 'down') {
            moveToGrid = directionMap.down;
        } else {
            moveToGrid = directionMap.left;
        }

        if (moveToGrid) {
            const tempStatus: CardStatus = { colorStatus: cardStatus.colorStatus, gridStatus: cardStatus.gridStatus, showDirectionNav: false, success: false }
            this.updateSingleGrid(moveToGrid.gridType, moveToGrid.gridIndex, tempStatus);
        }

        this.moveCount++;

        this.checkSuccess();
    }

    updateSingleGrid(gridType: gridType, gridIndex: number, cardStatus: CardStatus) {
        if (gridType === 'inner') {
            this.innerCardStatusList[gridIndex] = cardStatus;
        } else {
            this.outerCardStatusList[gridIndex] = cardStatus;
        }
    }

    toggleNavDirection(gridType: gridType, gridIndex: number, cardStatus: CardStatus) {
        const tempCardStatus: CardStatus = { ...cardStatus, showDirectionNav: !cardStatus.showDirectionNav };
        this.updateSingleGrid(gridType, gridIndex, tempCardStatus);
    }

    rotate() {
        // update activeGrid
        this.activeGrid = undefined;
        // change player
        if (this.isPrimaryPlayer()) {
            this.currentPlayer = 'secondary';
        } else {
            this.currentPlayer = 'primary';
        }
        this.moveCount = 0;

        // set self-card to disable
        this.innerCardStatusList = this.setSelfCardsDisable(this.innerCardStatusList);
        this.outerCardStatusList = this.setSelfCardsDisable(this.outerCardStatusList);

        // set others cards to movable
        this.innerCardStatusList = this.setOtherCardsMovable(this.innerCardStatusList);
        this.outerCardStatusList = this.setOtherCardsMovable(this.outerCardStatusList);


        // rotate
        const firstItem = this.innerCardStatusList.shift()
        this.innerCardStatusList.push(firstItem!);
        const firstItem2 = this.outerCardStatusList.shift()
        this.outerCardStatusList.push(firstItem2!);


        this.checkSuccess();
    }


    setOtherCardsMovable(cards: CardStatus[]): CardStatus[] {
        const temp: CardStatus[] = []

        const targetColor = this.isPrimaryPlayer() ? 's' : 'p';

        cards.forEach((item) => {
            if (item.colorStatus === targetColor) {
                item.gridStatus = 'movable';
            }
            temp.push(item);
        })
        return temp;
    }


    private setSelfCardsDisable(cards: CardStatus[]): CardStatus[] {
        const temp: CardStatus[] = []

        const targetColor = this.isPrimaryPlayer() ? 'p' : 's';

        cards.forEach((item) => {
            if (item.colorStatus === targetColor) {
                item.gridStatus = 'disable';
            }
            temp.push(item);
        })
        return temp;
    }

    private isPrimaryPlayer(): boolean {
        return this.currentPlayer === 'primary';
    }

    toggleActiveGrid(gridType: gridType, gridIndex: number) {
        let tempStatus: GridStatus = 'disable';
        let tempColor: ColroStatus = this.isPrimaryPlayer() ? 'p' : 's';
        if (gridType === 'inner') {
            tempStatus = this.innerCardStatusList[gridIndex].gridStatus;
        } else {
            tempStatus = this.outerCardStatusList[gridIndex].gridStatus;
        }

        if (tempStatus === 'blank') {

            if (this.isPrimaryPlayer()) {
                this.activePrimaryCount++;
            } else {
                this.activeSecondaryCount++;
            }


            tempStatus = 'active';
            this.activeGrid = { gridType, gridIndex };
        } else if (tempStatus === 'active') {

            if (this.isPrimaryPlayer()) {
                this.activePrimaryCount--;
            } else {
                this.activeSecondaryCount--;
            }

            tempStatus = 'blank';
            tempColor = 'b';
            this.activeGrid = undefined;
        }

        const tempItem: CardStatus = { colorStatus: tempColor, gridStatus: tempStatus, showDirectionNav: false, success: false };
        this.updateSingleGrid(gridType, gridIndex, tempItem);


        this.checkSuccess();
    }

    getCardStatus(gridType: gridType, gridIndex: number): CardStatus {
        if (gridType === 'inner') {
            return this.innerCardStatusList[gridIndex];
        } else {
            return this.outerCardStatusList[gridIndex];
        }
    }

    checkSuccess() {
        const result = []
        // horizontal
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 0 },
            { gridType: 'outer', gridIndex: 1 },
            { gridType: 'outer', gridIndex: 2 },
            { gridType: 'outer', gridIndex: 3 },
        ]));

        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 11 },
            { gridType: 'inner', gridIndex: 0 },
            { gridType: 'inner', gridIndex: 1 },
            { gridType: 'outer', gridIndex: 4 },
        ]));
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 10 },
            { gridType: 'inner', gridIndex: 3 },
            { gridType: 'inner', gridIndex: 2 },
            { gridType: 'outer', gridIndex: 5 },
        ]));
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 9 },
            { gridType: 'outer', gridIndex: 8 },
            { gridType: 'outer', gridIndex: 7 },
            { gridType: 'outer', gridIndex: 6 },
        ]));

        // vertical
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 0 },
            { gridType: 'outer', gridIndex: 11 },
            { gridType: 'outer', gridIndex: 10 },
            { gridType: 'outer', gridIndex: 9 },
        ]));
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 1 },
            { gridType: 'inner', gridIndex: 0 },
            { gridType: 'inner', gridIndex: 3 },
            { gridType: 'outer', gridIndex: 8 },
        ]));
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 2 },
            { gridType: 'inner', gridIndex: 1 },
            { gridType: 'inner', gridIndex: 2 },
            { gridType: 'outer', gridIndex: 7 },
        ]));
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 3 },
            { gridType: 'outer', gridIndex: 4 },
            { gridType: 'outer', gridIndex: 5 },
            { gridType: 'outer', gridIndex: 6 },
        ]));

        // diagonal
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 0 },
            { gridType: 'inner', gridIndex: 0 },
            { gridType: 'inner', gridIndex: 2 },
            { gridType: 'outer', gridIndex: 6 },
        ]));
        result.push(this.checkOneSuccessByIndex([
            { gridType: 'outer', gridIndex: 3 },
            { gridType: 'inner', gridIndex: 1 },
            { gridType: 'inner', gridIndex: 3 },
            { gridType: 'outer', gridIndex: 9 },
        ]));


        const winners = result.filter(x => x.success);
        winners.forEach((item) => {
            item.cardIndex.forEach((card) => {
                const tempCard = this.getCardStatus(card.gridType, card.gridIndex);
                this.updateSingleGrid(card.gridType, card.gridIndex, { ...tempCard, success: true });
            })
        })

        if (winners.length > 0){
            store.playerStore.toggleWinner();
        }
    }

    checkOneSuccessByIndex(items: { gridType: gridType, gridIndex: number }[]): { success: boolean, winner: player | undefined, cardIndex: { gridType: gridType, gridIndex: number }[] } {
        const cards: CardStatus[] = [];
        items.forEach((item) => {
            cards.push(this.getCardStatus(item.gridType, item.gridIndex));
        })


        const result = this.checkOneSuccess(cards);

        return { ...result, cardIndex: items };
    }

    checkOneSuccess(cards: CardStatus[]): { success: boolean, winner: player | undefined } {
        let success = false;
        const p = cards.filter(x => x.colorStatus === 'p');
        if (p.length === 4) {
            success = true;
            return { success, winner: 'primary' };
        }

        const s = cards.filter(x => x.colorStatus === 's');
        if (s.length === 4) {
            success = true;
            return { success, winner: 'secondary' };

        }
        return { success, winner: undefined };

    }

    getInitialStatusList(count: number): CardStatus[] {
        return Array(count).fill({ gridStatus: 'blank', colorStatus: 'b', showDirectionNav: false })

        // const temp =  Array(count).fill({ gridStatus: 'blank', colorStatus: 'b', showDirectionNav: false });
        // if (count === 12){
        //     temp[1] = {...temp[1], colorStatus: 'p'};
        //     temp[2] = {...temp[2], colorStatus: 'p'};
        //     temp[3] = {...temp[3], colorStatus: 'p'};
        //     temp[4] = {...temp[4], colorStatus: 'p'};
        // }

        // return temp;
    }


    getNavDirection(gridType: gridType, gridIndex: number): { up: string, right: string, down: string, left: string } {
        const disable = 'disable';

        let temp = { up: '', right: '', down: '', left: '' };
        if (gridType === 'inner') {
            return temp;
        }

        // outer
        if (gridIndex === 0) {
            temp.up = disable;
            temp.left = disable;
        }
        else if (gridIndex === 3) {
            temp.up = disable;
            temp.right = disable;
        }
        else if (gridIndex === 6) {
            temp.down = disable;
            temp.right = disable;
        }
        else if (gridIndex === 9) {
            temp.down = disable;
            temp.left = disable;
        }
        else if (1 <= gridIndex && gridIndex <= 2) {
            temp.up = disable;
        }
        else if (4 <= gridIndex && gridIndex <= 5) {
            temp.right = disable;
        }
        else if (7 <= gridIndex && gridIndex <= 8) {
            temp.down = disable;
        }
        else if (10 <= gridIndex && gridIndex <= 11) {
            temp.left = disable;
        }

        return temp;
    }


    checkDirectionIsBlank(cardIndex: cardIndex, direction: ArrowDirection): boolean {
        if (cardIndex === undefined) {
            // no grid
            return false;
        }

        let nextCardIndex: cardIndex = undefined;
        if (cardIndex.gridType === 'inner') {
            if (direction === 'up') {
                nextCardIndex = this.navDirectionMap.inner[cardIndex.gridIndex].up;
            } else if (direction === 'right') {
                nextCardIndex = this.navDirectionMap.inner[cardIndex.gridIndex].right;
            } else if (direction === 'down') {
                nextCardIndex = this.navDirectionMap.inner[cardIndex.gridIndex].down;
            } else {
                nextCardIndex = this.navDirectionMap.inner[cardIndex.gridIndex].left;
            }
        } else {
            if (direction === 'up') {
                nextCardIndex = this.navDirectionMap.outer[cardIndex.gridIndex].up;
            } else if (direction === 'right') {
                nextCardIndex = this.navDirectionMap.outer[cardIndex.gridIndex].right;
            } else if (direction === 'down') {
                nextCardIndex = this.navDirectionMap.outer[cardIndex.gridIndex].down;
            } else {
                nextCardIndex = this.navDirectionMap.outer[cardIndex.gridIndex].left;
            }
        }

        if (nextCardIndex === undefined) {
            // no grid
            return false;
        }

        const nextCardStatus = this.getCardStatus(nextCardIndex.gridType, nextCardIndex.gridIndex);
        return nextCardStatus.colorStatus === 'b';
    }

    getDirection(gridType: gridType, gridIndex: number): ArrowDirection {
        if (gridType == 'inner') {
            if (gridIndex === 0) {
                return 'down';
            } else if (gridIndex === 1) {
                return 'left';
            } else if (gridIndex === 2) {
                return 'up';
            } else {
                return 'right';
            }
        }

        // outer 
        if (1 <= gridIndex && gridIndex <= 3) {
            return 'left';
        } else if (4 <= gridIndex && gridIndex <= 6) {
            return 'up';
        } else if (7 <= gridIndex && gridIndex <= 9) {
            return 'right';
        } else {
            return 'down';
        }
    }
}
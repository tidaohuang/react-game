
import { makeAutoObservable, runInAction } from "mobx";
import { questionPools } from "./FiveSecondsQuestionPools";
import { KeyboardEventKey } from "../../constants/KeyboardEvent";
import { generateRandomGameId, shuffle } from "../../utils/commonFunction";




export default class FiveSecondsStore {



    started = false;
    questionPools: string[] = [];
    activeIndex: number = 0;
    loading = false;

    constructor() {
        makeAutoObservable(this);
        this.questionPools = shuffle(questionPools, generateRandomGameId());

        // document.addEventListener("keydown", slideShowShortCutKeyDown);
    }

    startGame() {
        this.started = true;

        // add event listener
        document.addEventListener("keydown", fiveSecondsGameKeyDownHandler);

        // remove slideshow listener
        // document.removeEventListener("keydown", slideShowShortCutKeyDown);
    }

    getCurrentQuestion(): string {
        runInAction(() => {
            this.loading = true;
        })
        return this.questionPools[this.activeIndex];
    }

    nextQuestion() {
        this.activeIndex = this.activeIndex + 1;
    }

    clearLoading() {
        this.loading = false;
    }
}


export const fiveSecondsGameKeyDownHandler = (e: globalThis.KeyboardEvent) => {
    console.log('fiveSecondsGameKeyDownHandler');
    e.preventDefault();
    if (e.key === KeyboardEventKey.ENTER ||
        e.key === KeyboardEventKey.ARROW_RIGHT ||
        e.key === KeyboardEventKey.ARROW_DOWN
    ) {
        document.getElementById("five-seconds-next-btn")?.click();
    }
}

// export const slideShowShortCutKeyDown = (e: globalThis.KeyboardEvent) => {
//     console.log('slideShowShortCutKeyDown')
//     e.preventDefault();
//     if (e.key === 'i') {
//         document.getElementById("info")?.click();
//     }
// }


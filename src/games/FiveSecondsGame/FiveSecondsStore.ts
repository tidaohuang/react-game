
import { makeAutoObservable, runInAction } from "mobx";
import { questionPools, shuffle } from "./FiveSecondsQuestionPools";
import { KeyboardEventKey } from "../../constants/KeyboardEvent";




export default class FiveSecondsStore {



    started = false;
    questionPools: string[] = [];
    activeIndex: number = 0;
    loading = false;

    constructor() {
        makeAutoObservable(this);
        this.questionPools = shuffle(questionPools);

    }

    startGame() {
        this.started = true;
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
    e.preventDefault();
    if (e.key === KeyboardEventKey.ENTER ||
        e.key === KeyboardEventKey.ARROW_RIGHT ||
        e.key === KeyboardEventKey.ARROW_DOWN
    ) {
        document.getElementById("five-seconds-next-btn")?.click();
    }
}

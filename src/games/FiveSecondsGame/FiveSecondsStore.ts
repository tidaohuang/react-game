
import { makeAutoObservable, runInAction } from "mobx";
import { questionPools, shuffle } from "./FiveSecondsQuestionPools";




export default class FiveSecondsStore {
    
    

    questionPools: string[] = [];
    activeIndex: number = 0;
    loading = false;

    constructor() {
        makeAutoObservable(this);

        this.questionPools = shuffle(questionPools);
        
    }

    getCurrentQuestion(): string {
        // this.loading = false;
        runInAction(()=>{
            this.loading = true;
        })
        // this.clearLoading();
        // this.loading = true;
        return this.questionPools[this.activeIndex];
    }

    nextQuestion() {
        this.activeIndex = this.activeIndex + 1;
        // this.loading = true;
    }

    clearLoading() {
        this.loading = false;
    }
}
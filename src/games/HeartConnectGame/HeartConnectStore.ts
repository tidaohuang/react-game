import { makeAutoObservable } from "mobx"
import { player } from "../RotateGame/RotateGameStore";
import { questionPools } from "./HeartConnectQuestionPool";

/**
 * process
 * 
 * Leader: nextQuestion -> (deliverMessage)
 * Player:                                  -> guessDegree -> showResult (add score)
 * 
 * 
 * 
 * guessDegree: Enter -> showResult
 */


export interface HeartConnectQuestion {
    left: string,
    right: string
}


export default class HeartConnectStore {



    showingPie = false;
    status: 'init' | 'nextQuestion' | 'guessDegree' | 'showResult' = 'init';
    guessingPieDegree: number = 0;
    pieDegree: number = 30;
    questionPools: HeartConnectQuestion[] = questionPools;
    questions: HeartConnectQuestion = { left: '', right: '' }
    player: player = 'secondary';
    scores: { primary: number, secondary: number } = { primary: 0, secondary: 0 }
    playerNames: { primary: string, secondary: string } = { primary: 'Player 1', secondary: 'Player 2' }

    constructor() {
        makeAutoObservable(this);

        localStorage.setItem('status', 'init');
    }

    deductPoint() {
        let tempScore = this.scores;
        if (this.player === 'primary') {
            let tempValue = tempScore.primary - 1;
            if (tempValue < 0) {
                tempValue = 0;
            }
            tempScore.primary = tempValue;
        } else {
            let tempValue = tempScore.secondary - 1;
            if (tempValue < 0) {
                tempValue = 0;
            }
            tempScore.secondary = tempValue;
        }
        this.scores = tempScore;
        localStorage.setItem('scores', JSON.stringify(this.scores));
    }

    addPoint() {
        let tempScore = this.scores;
        if (this.player === 'primary') {
            tempScore.primary = tempScore.primary + 1;;
        } else {
            tempScore.secondary = tempScore.secondary + 1;
        }
        this.scores = tempScore;
        localStorage.setItem('scores', JSON.stringify(this.scores));
    }

    showResult() {
        this.status = 'showResult';
        this.showingPie = true;

        localStorage.setItem('status', this.status);
        localStorage.setItem('showingPie', this.showingPie.toString());
    }

    rotatePie(): void {
        this.pieDegree = Math.floor(Math.random() * 360);
    }

    nextQuestion(): void {
        const index = Math.floor(Math.random() * this.questionPools.length);
        this.rotatePie();
        this.questions = {
            left: this.questionPools[index].left,
            right: this.questionPools[index].right
        }

        this.questionPools = this.questionPools.filter((_, i) => i !== index);

        this.status = 'guessDegree';
        this.player = this.player === 'secondary' ? 'primary' : 'secondary';
        this.showingPie = false;
        this.guessingPieDegree = 0;

        localStorage.setItem('guessingPieDegree', this.guessingPieDegree.toString());
        localStorage.setItem('showingPie', this.showingPie.toString());
        localStorage.setItem('player', this.player);
        localStorage.setItem('status', this.status);
        localStorage.setItem('pieDegree', this.pieDegree.toString());
        localStorage.setItem('questions', JSON.stringify(this.questions));
    }

    sync(key: 'guessingPieDegree' | 'pieDegree' | 'questions' | 'status' |
        'showingPie' | 'player' | 'scores'
    ) {
        if (key === 'guessingPieDegree') {
            this.guessingPieDegree = parseInt(localStorage.getItem(key)!);
        } else if (key === 'pieDegree') {
            this.pieDegree = parseInt(localStorage.getItem(key)!);
        } else if (key === 'questions') {
            this.questions = JSON.parse(localStorage.getItem(key)!);
        } else if (key === 'status') {
            this.status = localStorage.getItem(key) as any;
        } else if (key === 'showingPie') {
            this.showingPie = JSON.parse(localStorage.getItem(key)!);
        } else if (key === 'player') {
            this.player = localStorage.getItem(key) as any;
        } else if (key === 'scores') {
            this.scores = JSON.parse(localStorage.getItem(key)!);
        }
    }

    addDegree() {
        let tempDegree = this.guessingPieDegree + 1;
        if (tempDegree > 90) {
            tempDegree = 90;
        }
        this.guessingPieDegree = tempDegree;
        localStorage.setItem('guessingPieDegree', tempDegree.toString());
    }

    deductDegree() {
        let tempDegree = this.guessingPieDegree - 1;
        if (tempDegree < -90) {
            tempDegree = -90;
        }
        this.guessingPieDegree = tempDegree;
        localStorage.setItem('guessingPieDegree', tempDegree.toString());
    }
}
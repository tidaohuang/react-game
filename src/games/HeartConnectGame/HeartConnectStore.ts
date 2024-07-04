import { makeAutoObservable, runInAction } from "mobx"
import { player } from "../RotateGame/RotateGameStore";
import { questionPools } from "./HeartConnectQuestionPool";
import StorageConnectionHub from "../../utils/StorageConnectionHub";

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


interface HeartConnectGameModel {
    guessingPieDegree: number,
    pieDegree: number,
    questions: HeartConnectQuestion,
    status: 'init' | 'nextQuestion' | 'guessDegree' | 'showResult',
    showingPie: boolean,
    player: player,
    scores: { primary: number, secondary: number },
    playerNames: { primary: string, secondary: string }
}


export default class HeartConnectStore {
    EVENT_KEY = 'HEART_CONNECT_MODEL';

    questionPools: HeartConnectQuestion[] = questionPools;

    hub: StorageConnectionHub | null = null;


    model: HeartConnectGameModel = {
        showingPie: false,
        status: 'init',
        guessingPieDegree: 0,
        pieDegree: 30,
        questions: { left: '', right: '' },
        player: 'secondary',
        scores: { primary: 0, secondary: 0 },
        playerNames: { primary: '', secondary: '' }
    }


    constructor() {
        makeAutoObservable(this);

        // this.model = JSON.parse(localStorage.getItem(this.EVENT_KEY)!);
    }

    createConnection() {
        console.log('create connection');
        this.hub = new StorageConnectionHub();

        this.hub.on(this.EVENT_KEY, (model: HeartConnectGameModel) => {
            runInAction(() => {
                this.model = model;
            });
        });
    }


    setPlayers(player1: string, player2: string): void {
        if (player1.length === 0) {
            throw new Error('請輸入Player1');
        } else if (player2.length === 0) {
            throw new Error('請輸入Player2');
        }

        let model = this.model;
        model.playerNames = {
            primary: player1,
            secondary: player2
        }
        this.model = model;

        this.hub?.send(this.EVENT_KEY, this.model);


    }

    deductPoint() {
        let tempScore = this.model.scores;
        if (this.model.player === 'primary') {
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

        let model = this.model;
        model.scores = tempScore;
        this.model = model;
        this.hub?.send(this.EVENT_KEY, this.model);
    }

    addPoint() {
        let tempScore = this.model.scores;
        if (this.model.player === 'primary') {
            tempScore.primary = tempScore.primary + 1;;
        } else {
            tempScore.secondary = tempScore.secondary + 1;
        }
        let model = this.model;
        model.scores = tempScore;
        this.model = model;
        this.hub?.send(this.EVENT_KEY, this.model);
    }

    showResult() {
        let model = this.model;

        model.status = 'showResult';
        model.showingPie = true;

        this.model = model;
        this.hub?.send(this.EVENT_KEY, this.model);
    }

    rotatePie(): number {
        return Math.floor(Math.random() * 360);
    }

    nextQuestion(): void {
        const index = Math.floor(Math.random() * this.questionPools.length);
        let model = this.model;
        model.pieDegree = this.rotatePie();

        model.questions = {
            left: this.questionPools[index].left,
            right: this.questionPools[index].right
        }

        this.questionPools = this.questionPools.filter((_, i) => i !== index);

        model.status = 'guessDegree';
        model.player = model.player === 'secondary' ? 'primary' : 'secondary';
        model.showingPie = false;
        model.guessingPieDegree = 0;
        this.model = model;
        this.hub?.send(this.EVENT_KEY, this.model);
    }

    addDegree() {
        let tempDegree = this.model.guessingPieDegree + 1;
        if (tempDegree > 90) {
            tempDegree = 90;
        }

        let model = this.model;

        model.guessingPieDegree = tempDegree;

        this.model = model;
        this.hub?.send(this.EVENT_KEY, this.model);
    }

    deductDegree() {
        let tempDegree = this.model.guessingPieDegree - 1;
        if (tempDegree < -90) {
            tempDegree = -90;
        }

        let model = this.model;

        model.guessingPieDegree = tempDegree;
        this.model = model;
        this.hub?.send(this.EVENT_KEY, this.model);
    }
}
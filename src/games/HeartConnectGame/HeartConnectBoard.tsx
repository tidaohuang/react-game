import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

interface Props {
    mode: 'player' | 'leader'
}



export default observer(function HeartConnectBoard(props: Props) {

    const { heartConnectStore } = useStore();

    return (

        <div className="container heart-connection">
            <div className="heart-board">
                <div className="heart-pie" style={{ transform: `rotate(${heartConnectStore.model.pieDegree}deg)` }}>
                </div>

                {props.mode === 'player' &&
                    <div className={`heart-shield bottom ${heartConnectStore.model.showingPie ? 'rotate' : ''}`}>
                    </div>
                }
                {props.mode === 'leader' &&
                    <div className="heart-shield bottom rotate">
                    </div>
                }
                <div className="heart-shied-square"></div>


                <div className="heart-pointer" id="pointer" style={{ transform: `translateX(-50%) rotate(${heartConnectStore.model.guessingPieDegree}deg)` }}>
                </div>
                <div className="heart-pointer-center">
                </div>

                {props.mode === 'player' && (heartConnectStore.model.status === 'init' || heartConnectStore.model.status === 'showResult') &&
                    <div className={`game-start-btn ${heartConnectStore.model.player === 'primary' ? 'secondary' : 'primary'}`} onClick={() => heartConnectStore.nextQuestion()}>
                        GO
                    </div>
                }

            </div>

            <div className="heart-keywords">
                <div className="heart-keyword">
                    <span>{heartConnectStore.model.questions.left}</span>
                </div>

                <div className="heart-keyword">
                    <span>{heartConnectStore.model.questions.right}</span>
                </div>
            </div>

            <div className="game-score-board">

                <div className="player1-outline">
                    <div className="player1">
                        <div className="name">{heartConnectStore.model.playerNames.primary}</div>
                    </div>
                </div>

                <div className="score-outline">
                    <div className="score">
                        <div className="player1">{heartConnectStore.model.scores.primary}</div>
                        <div className="divider">:</div>
                        <div className="player2">{heartConnectStore.model.scores.secondary}</div>
                    </div>
                </div>

                <div className="player2-outline">
                    <div className="player2">
                        <div className="name">{heartConnectStore.model.playerNames.secondary}</div>
                    </div>
                </div>
            </div>


        </div>
    )
})
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";



export default observer(function HeartConnectPlayerBoard() {

    const { heartConnectStore } = useStore();

    return (

        <div className="container heart-connection">
            <div className="heart-board">
                <div className="heart-pie" id="pie">
                </div>


                <div className={`heart-shield bottom ${heartConnectStore.showingPie ? 'rotate' : ''}`} id="shield">
                </div>
                <div className="heart-shield">
                </div>


                <div className="heart-pointer" id="pointer" style={{transform: `translateX(-50%) rotate(${heartConnectStore.guessingPieDegree}deg)`}}>
                </div>
                <div className="heart-pointer-center">
                </div>

            </div>

            <div className="heart-keywords">
                <div className="heart-keyword">
                    <span>{heartConnectStore.questions.left}</span>
                </div>

                <div className="heart-keyword">
                    <span>{heartConnectStore.questions.right}</span>
                </div>
            </div>

            <div className="game-score-board">

                <div className="player1-outline">
                    <div className="player1">
                        <div className="name">{heartConnectStore.playerNames.primary}</div>
                    </div>
                </div>

                <div className="score-outline">
                    <div className="score">
                        <div className="player1">{heartConnectStore.scores.primary}</div>
                        <div className="divider">:</div>
                        <div className="player2">{heartConnectStore.scores.secondary}</div>
                    </div>
                </div>

                <div className="player2-outline">
                    <div className="player2">
                        <div className="name">{heartConnectStore.playerNames.secondary}</div>
                    </div>
                </div>
            </div>
        </div>
    )
})
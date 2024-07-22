import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { KeyboardEventKey } from "../../constants/KeyboardEvent";
import { store, useStore } from "../../stores/store";
import HeartConnectBoard from "./HeartConnectBoard";
import Information from "../../components/Information";
import { MyAlert } from "../../components/MyAlert";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import './style-heart-connection.css';


export default observer(function HeartConnectGame() {
    const parsed = queryString.parse(window.location.search);
    const [mode, setMode] = useState(parsed.mode);
    const { heartConnectStore, modalStore } = useStore();

    if (heartConnectStore.hub === null) {
        heartConnectStore.createConnection();
    }

    useEffect(() => {
        if (mode === 'player') {
            document.addEventListener("keydown", heartConnectGameKeyDownHandler);
        }
        return () => {
            document.removeEventListener("keydown", heartConnectGameKeyDownHandler);
        };
    }, [mode]);


    const navigate = useNavigate();
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    function startHandler() {
        try {
            heartConnectStore.setPlayers(player1, player2);
            setMode('player');
            navigate('/react-game/?g=heart-connect&mode=player');
            // open new leader page
            window.open('/react-game/?g=heart-connect&mode=leader', "_blank", "popup=yes");

        } catch (error) {
            if (error instanceof Error) {
                modalStore.openModal(<MyAlert message={error.message} />);
            }
        }
    }

    if (mode === 'player') {
        return <HeartConnectBoard mode="player" />;
    } else if (mode === 'leader') {
        return <HeartConnectBoard mode="leader" />;
    }

    return (
        <div className="container heart-connection">
            <Information images={[
                "games/heart-connect/1.JPG",
                "games/heart-connect/2.JPG",
                "games/heart-connect/3.JPG",
                "games/heart-connect/4.JPG",
                "games/heart-connect/5.JPG",
                "games/heart-connect/6.JPG",
                "games/heart-connect/7.JPG",
            ]} />

            {
                (heartConnectStore.model.playerNames.primary.length == 0 ||
                    heartConnectStore.model.playerNames.secondary.length == 0) &&

                <div className="player-form">
                    <div className="input-group">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="player 1"
                            value={player1}
                            onChange={(e) => { setPlayer1(e.target.value) }}
                        />
                    </div>

                    <div className="input-group">
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="player 2"
                            value={player2}
                            onChange={(e) => { setPlayer2(e.target.value) }}
                        />
                    </div>

                    <button type="button" onClick={() => startHandler()}
                    >Start Game</button>
                </div>
            }



        </div >
    )
})

function heartConnectGameKeyDownHandler(this: Document, event: KeyboardEvent) {
    // console.log(event.key);

    if (store.heartConnectStore.model.status === 'guessDegree') {
        if (event.key === KeyboardEventKey.ARROW_RIGHT) {
            store.heartConnectStore.addDegree();
        } else if (event.key === KeyboardEventKey.ARROW_LEFT) {
            store.heartConnectStore.deductDegree();
        } else if (event.key === KeyboardEventKey.ENTER) {
            store.heartConnectStore.showResult();
        }
    } else if (store.heartConnectStore.model.status === 'showResult') {
        if (event.key === KeyboardEventKey.EQUAL) {
            store.heartConnectStore.addPoint();
        } else if (event.key === KeyboardEventKey.MINUS) {
            store.heartConnectStore.deductPoint();
        }
    }
}

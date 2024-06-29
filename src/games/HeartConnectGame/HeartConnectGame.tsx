import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { KeyboardEventKey } from "../../constants/KeyboardEvent";
import { store } from "../../stores/store";
import HeartConnectBoard from "./HeartConnectBoard";

interface Props {
    mode?: string
}


export default observer(function HeartConnectGame(props: Props) {

    useEffect(() => {
        window.addEventListener("storage", heartConnectGameStorageHandler);
        if (props.mode === 'player') {
            document.addEventListener("keydown", heartConnectGameKeyDownHandler);
        }

        return () => {
            window.removeEventListener("storage", heartConnectGameStorageHandler);
            document.removeEventListener("keydown", heartConnectGameKeyDownHandler);
        };
    }, []);

    if (props.mode === 'player') {
        return <HeartConnectBoard mode="player" />;
    } else if (props.mode === 'leader') {
        return <HeartConnectBoard mode="leader" />;
    }

    return (
        <div className="container heart-connection">
            
        </div>
    )
})

function heartConnectGameKeyDownHandler(this: Document, event: KeyboardEvent) {
    console.log(event.key);

    if (store.heartConnectStore.status === 'guessDegree') {
        if (event.key === KeyboardEventKey.ARROW_RIGHT) {
            store.heartConnectStore.addDegree();
        } else if (event.key === KeyboardEventKey.ARROW_LEFT) {
            store.heartConnectStore.deductDegree();
        } else if (event.key === KeyboardEventKey.ENTER) {
            store.heartConnectStore.showResult();
        }
    } else if (store.heartConnectStore.status === 'showResult') {
        if (event.key === KeyboardEventKey.EQUAL) {
            store.heartConnectStore.addPoint();
        } else if (event.key === KeyboardEventKey.MINUS) {
            store.heartConnectStore.deductPoint();
        }
    }


}

function heartConnectGameStorageHandler(this: Window, event: StorageEvent) {
    console.log(`local storage saved: key: ${event.key}`)
    if (event.key === 'guessingPieDegree' ||
        event.key === 'pieDegree' ||
        event.key === 'questions' ||
        event.key === 'status' ||
        event.key === 'showingPie' ||
        event.key === 'player' ||
        event.key === 'scores'
    ) {
        store.heartConnectStore.sync(event.key);
    }
}

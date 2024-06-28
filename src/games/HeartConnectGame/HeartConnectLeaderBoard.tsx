import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";



export default observer(function HeartConnectLeaderBoard() {

    const { heartConnectStore } = useStore();


    return (
        <div onClick={() => heartConnectStore.nextQuestion()}>
            start game: <br />
            player: {heartConnectStore.player} <br />
            scores: {JSON.stringify(heartConnectStore.scores)} <br />
            status: {heartConnectStore.status} <br />
            showingPie: {heartConnectStore.showingPie ? 'true' : 'false'} <br />
            guessingPieDegree: {heartConnectStore.guessingPieDegree} <br />
            pieDegree: {heartConnectStore.pieDegree}  <br />
            questions: {JSON.stringify(heartConnectStore.questions)}
        </div>
    )
})
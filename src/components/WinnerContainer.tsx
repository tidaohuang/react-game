import { observer } from "mobx-react-lite";
import Lottie from 'react-lottie';
import animationData from '../lotties/animation-congras.json';
import { useStore } from "../stores/store";

export default observer(function WinnerContainer() {

    const { playerStore } = useStore();


    const defaultOptions = {
        loop: playerStore.loop,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    return (
        playerStore.showWinner && <div className="lottie" onClick={() => playerStore.toggleWinner()}>
            <Lottie
                options={defaultOptions}
            />
        </div>
    )
})
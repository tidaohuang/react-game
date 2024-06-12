import { observer } from "mobx-react-lite";

import Lottie from 'react-lottie';
import animationData from '../lotties/animation-congras.json';
import { useStore } from "../stores/store";


export default observer(function WinnerContainer() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const { playerStore: { showWinner } } = useStore();

    return (
        showWinner && <div className="lottie">
            <Lottie
                options={defaultOptions}
            />
        </div>
    )
})
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import FiveSecondsCounter from "./FiveSecondsCounter";
import { useEffect, useState } from "react";


export default observer(function FiveSecondsGame() {

    const { fiveSecondsStore, slideShowStore } = useStore();

    const question = fiveSecondsStore.getCurrentQuestion();

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const interval = setInterval(() => { setLoading(false) }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [loading]);


    return (
        <div className="container five-seconds">
            <div className="info" onClick={() => slideShowStore.toggleSlideShow([
                "games/fiveSeconds/1.JPG",
                "games/fiveSeconds/2.JPG",
            ])}>
                <i className="fa-solid fa-circle-info"></i>
            </div>
            <div className="question-wrapper">
                <div className={`question ${loading ? 'active' : ''}`}>{question}</div>
                <FiveSecondsCounter handleClick={() => {
                    fiveSecondsStore.nextQuestion();
                    setLoading(true);
                }} />
            </div>
        </div>
    )
})
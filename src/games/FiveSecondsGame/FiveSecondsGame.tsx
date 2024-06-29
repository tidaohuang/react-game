import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import FiveSecondsCounter from "./FiveSecondsCounter";
import { useEffect, useState } from "react";
import Information from "../../components/Information";


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

            <Information images={[
                "games/fiveSeconds/1.JPG",
                "games/fiveSeconds/2.JPG",
            ]} />

            <div className="question-wrapper">
                {!fiveSecondsStore.started &&
                    <button className="start-btn" onClick={() => { fiveSecondsStore.startGame() }}>開始</button>
                }
                {fiveSecondsStore.started &&
                    <>
                        <div className={`question ${loading ? 'active' : ''}`}>{question}</div>
                        <FiveSecondsCounter handleClick={() => {
                            fiveSecondsStore.nextQuestion();
                            setLoading(true);
                        }} />
                    </>
                }
            </div>
        </div>
    )
})
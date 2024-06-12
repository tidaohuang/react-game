import { useEffect, useState } from "react";

interface Props {
    handleClick: () => void
}


export default function FiveSecondsCounter(props: Props) {
    const [count, setCount] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [count]);

    return (
        count >= 0 ? <div className="counter">{count}</div> :
            <button className="counter-stop" onClick={() => {
                props.handleClick();
                setCount(5);
            }}>下一題</button>
    )
}
import { observer } from "mobx-react-lite";
import { Boat } from "./BombGameStore";




interface Props {
    boat: Boat,
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
}

export default observer(function Boat(props: Props) {
    return (
        <img
            className={`ship ship-${props.boat.size}`}
            src={`./games/bomb/submarine-${props.boat.size}-${props.boat.direction}.svg`}
            onDragStart={props.onDragStart}
            draggable={true}
        ></img>
    )
})
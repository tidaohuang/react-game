import { observer } from "mobx-react-lite";
import { Boat } from "./BombGameStore";
import { useStore } from "../../stores/store";




interface Props {
    boat: Boat,
    // onDragStart: (e: React.DragEvent<HTMLDivElement>) => void
}

export default observer(function Boat(props: Props) {

    const { bombStore } = useStore();

    return (
        <img
            className={`ship ship-${props.boat.size}`}
            src={`./games/bomb/submarine-${props.boat.size}-${props.boat.direction}.svg`}
            style={{ top: props.boat.position.y, left: props.boat.position.x }}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => bombStore.handleDragStart(e)}
            // onDragStart={(e: React.DragEvent<HTMLDivElement>) => props.onDragStart(e)}
            draggable={true}
        ></img>
    )
})
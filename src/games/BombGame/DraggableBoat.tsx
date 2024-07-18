import { observer } from "mobx-react-lite";
import { Boat } from "./BombGameStore";
import { useStore } from "../../stores/store";
import { allowDrop } from "./BombGame";




interface Props {
    id: number,
    boat: Boat,
}

export default observer(function DraggableBoat(props: Props) {

    const { bombStore } = useStore();

    return (
        <img
            id={`ship${props.id}`}
            className={`ship ship-${props.boat.size}-${props.boat.direction}`}
            src={`./games/bomb/submarine-${props.boat.size}-${props.boat.direction}.svg`}
            style={{ top: props.boat.position.y, left: props.boat.position.x }}
            onDragStart={(e: React.DragEvent<HTMLDivElement>) => bombStore.handleDragStart(e, props.id)}
            draggable={true}
            onClick={() => bombStore.rotateBoat(props.id)}
            onDoubleClick={() => bombStore.setToDefaultPosition(props.id)}


            // allow drop on img (because some img is big and small img nearby cannot be dropped)
            onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                bombStore.drop(e);
            }}
            onDragOver={allowDrop}
        ></img>
    )
})
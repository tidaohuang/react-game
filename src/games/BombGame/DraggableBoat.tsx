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

    let style: React.CSSProperties = {};
    // if (props.boat.initial) {
    //     console.log(JSON.stringify(props.boat.initialPosition))        
    //     style.top = props.boat.initialPosition.top;
    //     style.right = props.boat.initialPosition.right;
    //     style.bottom = props.boat.initialPosition.bottom;
    //     style.left = props.boat.initialPosition.left;
    // } else {
    //     style.top = props.boat.position.y;
    //     style.left = props.boat.position.x;
    // }

    return (
        <img
            id={`ship${props.id}`}
            className={`ship ship-${props.boat.size}-${props.boat.direction}`}
            src={`./games/bomb/submarine-${props.boat.size}-${props.boat.direction}.svg`}
            style={{ top: props.boat.position.y, left: props.boat.position.x }}
            // style={props.boat.initial ? props.boat.initialPosition : { top: props.boat.position.y, left: props.boat.position.x }}
            // style={style}
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
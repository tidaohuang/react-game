import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { player } from "../RotateGame/RotateGameStore";
import { Bomb } from "./BombGameStore";


interface Props {
    bomb: Bomb,
    player: player
}

export default observer(function BombGameGrid(props: Props) {

    const { bombStore } = useStore();

    if (props.bomb.cssGridArea === 'hidden') {
        return (<></>);
    } else if (props.bomb.cssGridArea && !(props.bomb.cssGridArea instanceof String)) {
        const area = props.bomb.cssGridArea;
        // const backgroundColor = props.player === 'primary' ? '#25AEF2' : '4EC9B0';
        // css grid
        return (
            <div className={`grid-item ${props.bomb.status} crashed`}
                style={{ gridArea: `${area.row_start} / ${area.column_start} / ${area.row_end} / ${area.column_end}`}}
            >
                <img
                    src={`./games/bomb/submarine-${props.bomb.crashedBoat?.size}-${props.bomb.crashedBoat?.direction}.svg`}
                />
            </div>
        );
    }

    return (
        <div className={`grid-item ${props.bomb.status}`}
            onClick={() => {
                if (props.bomb.status === 'blank') {
                    bombStore.setBomb(props.player, props.bomb.index);
                }
            }}
        >
            {props.bomb.status === 'bombed' && <i className="fa-solid fa-bomb"></i>}
            {props.bomb.status === 'missed' && <i className="fa-solid fa-xmark"></i>}

        </div>
    )
})
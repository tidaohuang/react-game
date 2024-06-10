import { gridType, CardStatus, ArrowDirection } from './RotateGameStore';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { MyAlert } from '../../components/MyAlert';


interface Props {
    gridType: gridType,
    gridIndex: number,
    cardStatus: CardStatus,
}


export default observer(function RotateGrid(props: Props) {
    const { rotateGameStore: rotateGame, modalStore } = useStore();
    const arrowDirection = rotateGame.getDirection(props.gridType, props.gridIndex);
    const navDirection = rotateGame.getNavDirection(props.gridType, props.gridIndex);


    const handleToggleActiveGrid = () => {
        if (props.cardStatus.gridStatus === 'blank') {
            if (rotateGame.activeGrid !== undefined) {
                modalStore.openModal(<MyAlert message="cannot click more than 1 button" />);
                return;
            }

            // check no more than 8
            if ((rotateGame.currentPlayer === 'primary' && rotateGame.activePrimaryCount === 8) ||
                (rotateGame.currentPlayer === 'secondary' && rotateGame.activeSecondaryCount === 8)) {
                modalStore.openModal(<MyAlert message="no more button to click" />);
                return;
            }
            rotateGame.toggleActiveGrid(props.gridType, props.gridIndex);
        } else if (props.cardStatus.gridStatus === 'active') {
            rotateGame.toggleActiveGrid(props.gridType, props.gridIndex);
        } else if (props.cardStatus.gridStatus === 'movable' && !props.cardStatus.showDirectionNav) {
            rotateGame.toggleNavDirection(props.gridType, props.gridIndex, props.cardStatus);
        }
        // else {
        //     modalStore.openModal(<MyAlert message="cannot change status of diabled button to active or black" />);
        //     return;
        // }
    }

    const handleMoveGrid = (direction: ArrowDirection, props: Props) => {

        if (rotateGame.moveCount > 0) {
            modalStore.openModal(<MyAlert message="can only move 1 time" />);
            return;
        }

        if (rotateGame.validMove(direction, props.gridType, props.gridIndex)) {
            rotateGame.moveGrid(direction, props.gridType, props.gridIndex, props.cardStatus);
        } else {
            modalStore.openModal(<MyAlert message="invalid move" />);
        }

    }


    return (
        <div className={`grid ${props.cardStatus.success ? 'success' : ''}`}
            onClick={handleToggleActiveGrid}>
            <button className={`circle ${props.cardStatus.gridStatus} color-${props.cardStatus.colorStatus}`}>
                <i className={`fa-solid fa-arrow-${arrowDirection}`}></i>
            </button>
            <div className={`direction-navbar ${props.cardStatus.showDirectionNav ? 'show' : ''}`}>
                <div className={`direction ${navDirection.up}`}
                    onClick={() => handleMoveGrid('up', props)}
                >
                    <i className="fas fa-arrow-up"></i>
                </div>
                <div className={`direction ${navDirection.right}`}
                    onClick={() => handleMoveGrid('right', props)}
                >
                    <i className="fas fa-arrow-right"></i>
                </div>
                <div className={`direction ${navDirection.down}`}
                    onClick={() => handleMoveGrid('down', props)}
                >
                    <i className="fas fa-arrow-down"></i>
                </div>
                <div className={`direction ${navDirection.left}`}
                    onClick={() => handleMoveGrid('left', props)}
                >
                    <i className="fas fa-arrow-left"></i>
                </div>
                <div className="direction center"
                    onClick={() => {
                        rotateGame.toggleNavDirection(props.gridType, props.gridIndex, props.cardStatus)
                    }}
                ><i className="fa-solid fa-xmark"></i></div>
            </div>
        </div >
    )
})
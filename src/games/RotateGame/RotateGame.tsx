import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import RotateGrid from "./RotateGrid";
import { MyAlert } from "../../components/MyAlert";
import Information from "../../components/Information";


export default observer(function RotateGame() {

    const { rotateGameStore: rotateGame, modalStore } = useStore();


    const rotateHandler = () => {
        if (rotateGame.activeGrid === undefined) {
            modalStore.openModal(<MyAlert message="please pick one button before rotating" />);
            return;
        }
        rotateGame.rotate();
    }

    const primaryTable = [];
    for (let i = 0; i < 8 - rotateGame.activePrimaryCount; i++) {
        primaryTable.push(<div className="circle color-p" key={i}></div>)
    }

    const secondaryTable = [];
    for (let i = 0; i < 8 - rotateGame.activeSecondaryCount; i++) {
        secondaryTable.push(<div className="circle color-s" key={i}></div>)
    }

    return (
        <div className="container">

            <Information images={[
                "games/rotate/1.JPG",
                "games/rotate/2.JPG",
                "games/rotate/3.JPG",
                "games/rotate/4.JPG",
                "games/rotate/5.JPG",
                "games/rotate/6.JPG",
            ]} />

            <div className={`grid-table ${rotateGame.currentPlayer}`}>
                {/* // row 1 */}
                <div className="grid-row">
                    <RotateGrid
                        gridType="outer"
                        gridIndex={0}
                        cardStatus={rotateGame.outerCardStatusList[0]}
                    />
                    <RotateGrid
                        gridType="outer"
                        gridIndex={1}
                        cardStatus={rotateGame.outerCardStatusList[1]}
                    />
                    <RotateGrid
                        gridType="outer"
                        gridIndex={2}
                        cardStatus={rotateGame.outerCardStatusList[2]}
                    />
                    <RotateGrid
                        gridType="outer"
                        gridIndex={3}
                        cardStatus={rotateGame.outerCardStatusList[3]}
                    />
                </div>
                {/* // end of row 1 */}
                {/* // row 2  */}
                <div className="grid-row">

                    <RotateGrid
                        gridType="outer"
                        gridIndex={11}
                        cardStatus={rotateGame.outerCardStatusList[11]}
                    />

                    <RotateGrid
                        gridType="inner"
                        gridIndex={0}
                        cardStatus={rotateGame.innerCardStatusList[0]}
                    />
                    <RotateGrid
                        gridType="inner"
                        gridIndex={1}
                        cardStatus={rotateGame.innerCardStatusList[1]}
                    />

                    <RotateGrid
                        gridType="outer"
                        gridIndex={4}
                        cardStatus={rotateGame.outerCardStatusList[4]}
                    />
                </div>
                {/* // end of row 2 */}
                {/* row 3 */}
                <div className="grid-row">
                    <RotateGrid
                        gridType="outer"
                        gridIndex={10}
                        cardStatus={rotateGame.outerCardStatusList[10]}
                    />

                    <RotateGrid
                        gridType="inner"
                        gridIndex={3}
                        cardStatus={rotateGame.innerCardStatusList[3]}
                    />
                    <RotateGrid
                        gridType="inner"
                        gridIndex={2}
                        cardStatus={rotateGame.innerCardStatusList[2]}
                    />

                    <RotateGrid
                        gridType="outer"
                        gridIndex={5}
                        cardStatus={rotateGame.outerCardStatusList[5]}
                    />
                </div>
                {/* end of row 3 */}
                {/* row 4 */}
                <div className="grid-row">
                    <RotateGrid
                        gridType="outer"
                        gridIndex={9}
                        cardStatus={rotateGame.outerCardStatusList[9]}
                    />
                    <RotateGrid
                        gridType="outer"
                        gridIndex={8}
                        cardStatus={rotateGame.outerCardStatusList[8]}
                    />
                    <RotateGrid
                        gridType="outer"
                        gridIndex={7}
                        cardStatus={rotateGame.outerCardStatusList[7]}
                    />
                    <RotateGrid
                        gridType="outer"
                        gridIndex={6}
                        cardStatus={rotateGame.outerCardStatusList[6]}
                    />
                </div>
                {/* end of row 4 */}
            </div>

            <div className="ball-table">
                <div className="ball-priamary">
                    {primaryTable}
                </div>
                <div className="ball-secondary">
                    {secondaryTable}
                </div>
            </div>

            <button className={`rotate-button ${rotateGame.currentPlayer}`} type="button"
                onClick={rotateHandler}
            >
                <i className="fa-solid fa-rotate-left"></i>
            </button>

        </div>
    )
})
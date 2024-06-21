import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Boat } from "./BombGameStore";
import DraggableBoat from "./DraggableBoat";
import BombGameDashboard from "./BombGameDashboard";


export default observer(function BombGame() {

    const { bombStore } = useStore();

    if (bombStore.currentPlayer === 'bomb') {
        return (
            <BombGameDashboard />
        )
    }


    function allowDrop(ev: React.DragEvent<HTMLDivElement>): void {
        ev.preventDefault();
    }

    return (
        <div className={`container bomb ${bombStore.currentPlayer}`}>
            <div className="ship-container">
                {bombStore.boats.map((boat: Boat, index: number) => (
                    <DraggableBoat key={index} id={index} boat={boat} />
                ))}
            </div>
            <div className="grid-container"
                // id="grid"
                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                    bombStore.drop(e);
                }}
                onDragOver={allowDrop}
            >

                <div className="grid-item" id="grid0">(0, 0)</div>
                <div className="grid-item" id="grid1">(0, 1)</div>
                <div className="grid-item" id="grid2">(0, 2)</div>
                <div className="grid-item" id="grid3">(0, 3)</div>
                <div className="grid-item" id="grid4">(0, 4)</div>

                <div className="grid-item" id="grid5">(1, 0)</div>
                <div className="grid-item" id="grid6">(1, 1)</div>
                <div className="grid-item" id="grid7">(1, 2)</div>
                <div className="grid-item" id="grid8">(1, 3)</div>
                <div className="grid-item" id="grid9">(1, 4)</div>

                <div className="grid-item" id="grid10">(2, 0)</div>
                <div className="grid-item" id="grid11">(2, 1)</div>
                <div className="grid-item" id="grid12">(2, 2)</div>
                <div className="grid-item" id="grid13">(2, 3)</div>
                <div className="grid-item" id="grid14">(2, 4)</div>

                <div className="grid-item" id="grid15">(3, 0)</div>
                <div className="grid-item" id="grid16">(3, 1)</div>
                <div className="grid-item" id="grid17">(3, 2)</div>
                <div className="grid-item" id="grid18">(3, 3)</div>
                <div className="grid-item" id="grid19">(3, 4)</div>

                <div className="grid-item" id="grid20">(4, 0)</div>
                <div className="grid-item" id="grid21">(4, 1)</div>
                <div className="grid-item" id="grid22">(4, 2)</div>
                <div className="grid-item" id="grid23">(4, 3)</div>
                <div className="grid-item" id="grid24">(4, 4)</div>
            </div>


            {bombStore.isPrimaryPlayer() && bombStore.player1Ready &&
                <div className="bomb-ready-btn" onClick={() => bombStore.saveBoatsToLocalStorage()}>
                    完成配置
                </div>
            }

            {!bombStore.isPrimaryPlayer() && bombStore.player2Ready &&
                <div className="bomb-ready-btn" onClick={() => bombStore.saveBoatsToLocalStorage()}>
                    完成配置
                </div>
            }



        </div>
    )
})


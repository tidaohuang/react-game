import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Boat } from "./BombGameStore";
import DraggableBoat from "./DraggableBoat";
import BombGameDashboard from "./BombGameDashboard";


export function allowDrop(ev: React.DragEvent<HTMLDivElement>): void {
    ev.preventDefault();
}


export default observer(function BombGame() {


    

    const { bombStore, slideShowStore } = useStore();

    if (bombStore.currentPlayer === 'bomb') {
        return (
            <BombGameDashboard />
        )
    }


    return (
        <div className={`container bomb ${bombStore.currentPlayer}`}>

            <div className="info" onClick={() => slideShowStore.toggleSlideShow([
                "games/bomb/1.JPG",
                "games/bomb/2.JPG",
                "games/bomb/3.JPG",
                "games/bomb/4.JPG",
                "games/bomb/5.JPG",
            ])}>
                <i className="fa-solid fa-circle-info"></i>
            </div>

            <div className="ship-container">
                {bombStore.boats.map((boat: Boat, index: number) => (
                    <DraggableBoat key={index} id={index} boat={boat} />
                ))}

                {/* <div id='yellowDot' className="dot" style={{backgroundColor: 'yellow', zIndex: 1000, position: 'absolute'}}></div>
                <div id='redDot' className="dot" style={{backgroundColor: 'red', zIndex: 1000,  position: 'absolute'}} ></div> */}
            </div>
            <div className="grid-container"
                // id="grid"
                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                    bombStore.drop(e);
                }}
                onDragOver={allowDrop}
            >

                <div className="grid-item" id="grid0"></div>
                <div className="grid-item" id="grid1"></div>
                <div className="grid-item" id="grid2"></div>
                <div className="grid-item" id="grid3"></div>
                <div className="grid-item" id="grid4"></div>

                <div className="grid-item" id="grid5"></div>
                <div className="grid-item" id="grid6"></div>
                <div className="grid-item" id="grid7"></div>
                <div className="grid-item" id="grid8"></div>
                <div className="grid-item" id="grid9"></div>

                <div className="grid-item" id="grid10"></div>
                <div className="grid-item" id="grid11"></div>
                <div className="grid-item" id="grid12"></div>
                <div className="grid-item" id="grid13"></div>
                <div className="grid-item" id="grid14"></div>

                <div className="grid-item" id="grid15"></div>
                <div className="grid-item" id="grid16"></div>
                <div className="grid-item" id="grid17"></div>
                <div className="grid-item" id="grid18"></div>
                <div className="grid-item" id="grid19"></div>

                <div className="grid-item" id="grid20"></div>
                <div className="grid-item" id="grid21"></div>
                <div className="grid-item" id="grid22"></div>
                <div className="grid-item" id="grid23"></div>
                <div className="grid-item" id="grid24"></div>
            </div>


            {bombStore.isPrimaryPlayer() && bombStore.player1Ready &&
                <div className="bomb-ready-btn" onClick={() => bombStore.saveBoatsToLocalStorage('primary')}>
                    完成配置
                </div>
            }

            {!bombStore.isPrimaryPlayer() && bombStore.player2Ready &&
                <div className="bomb-ready-btn" onClick={() => bombStore.saveBoatsToLocalStorage('secondary')}>
                    完成配置
                </div>
            }



        </div>
    )
})


import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import BombGameGrid from "./BombGameGrid";



export default observer(function BombGameDashboard() {

    const { bombStore } = useStore();

    return (
        <div className="container bomb-dashboard">
            <div className="dashboard">



                <div className="grid-container primary">
                    {bombStore.dashboard.attackPrimaryBombs.map((b, index) => (
                        <BombGameGrid key={index} bomb={b} player="primary" />
                    ))}
                </div>

                <div className="grid-container secondary">
                    {bombStore.dashboard.attackSecondaryBombs.map((b, index) => (
                        <BombGameGrid key={index} bomb={b} player="secondary" />
                    ))}
                </div>



                {bombStore.tempBombs.primaryIndex != undefined && bombStore.tempBombs.secondaryIndex != undefined &&
                    <div className="bomb-trigger-btn" onClick={() => bombStore.triggerBomb()}>
                        <button className="bomb-btn-pushable">
                            <span className="bomb-btn-shadow"></span>
                            <span className="bomb-btn-edge"></span>
                            <span className="bomb-btn-front text">
                                BOMB
                            </span>
                        </button>
                    </div>

                }

            </div>
        </div>
    )
})
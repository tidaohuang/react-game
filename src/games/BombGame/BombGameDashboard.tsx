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

                <div className="grid-container">
                    <div className="grid-item">(0, 0)</div>
                    <div className="grid-item">(0, 1)</div>
                    <div className="grid-item">(0, 2)</div>
                    <div className="grid-item">(0, 3)</div>
                    <div className="grid-item">(0, 4)</div>

                    <div className="grid-item">(1, 0)</div>
                    <div className="grid-item">(1, 1)</div>
                    <div className="grid-item">(1, 2)</div>
                    <div className="grid-item">(1, 3)</div>
                    <div className="grid-item">(1, 4)</div>

                    <div className="grid-item">(2, 0)</div>
                    <div className="grid-item">(2, 1)</div>
                    <div className="grid-item">(2, 2)</div>
                    <div className="grid-item">(2, 3)</div>
                    <div className="grid-item">(2, 4)</div>

                    <div className="grid-item">(3, 0)</div>
                    <div className="grid-item">(3, 1)</div>
                    <div className="grid-item">(3, 2)</div>
                    <div className="grid-item">(3, 3)</div>
                    <div className="grid-item">(3, 4)</div>

                    <div className="grid-item">(4, 0)</div>
                    <div className="grid-item">(4, 1)</div>
                    <div className="grid-item">(4, 2)</div>
                    <div className="grid-item">(4, 3)</div>
                    <div className="grid-item">(4, 4)</div>
                </div>
            </div>
        </div>
    )
})
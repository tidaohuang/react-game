import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import Boat from "./Boat";


export default observer(function BombGame() {

    const { bombStore } = useStore();


    // let start: { x: number, y: number } = { x: 0, y: 0 }
    // let delta: { x: number, y: number } = { x: 0, y: 0 }
    // function handleDragStart(e: React.DragEvent<HTMLDivElement>): void {
    //     if (e.target) {
    //         e.dataTransfer.setData("text", (e.target as Element).id);
    //         start = { x: e.clientX, y: e.clientY }
    //     }
    // }

    // function drop(ev: React.DragEvent<HTMLDivElement>): void {
    //     console.log('drop ...')
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("text");
    //     var node = document.getElementById(data);
    //     if (node) {
    //         delta = { x: ev.clientX - start.x, y: ev.clientY - start.y };
    //         // console.log('delta: ' + JSON.stringify(delta));

    //         let shiftX = getPxToNumber(node.style.left) + delta.x;
    //         let shiftY = getPxToNumber(node.style.top) + delta.y;
    //         // console.log('position: ' + JSON.stringify({ x: shiftX, y: shiftY }));

    //         node.style.left = shiftX + 'px';
    //         node.style.top = shiftY + 'px';
    //     }
    // }

    // function getPxToNumber(px: string): number {
    //     if (px) {
    //         return parseInt(px.replace('px', ''));
    //     }
    //     return 0;
    // }


    function allowDrop(ev: React.DragEvent<HTMLDivElement>): void {
        ev.preventDefault();
    }

    return (
        <div className="container bomb">
            <div className="ship-container">
                {/* <img src="./games/bomb/submarine-3-left.svg" className='ship ship-3' id="ship"
                    onDragStart={handleDragStart}
                    draggable={true}
                ></img> */}


                <Boat
                    boat={bombStore.intialBoat}
                    // onDragStart={bombStore.handleDragStart}
                />
            </div>
            <div className="grid-container" id="grid"
                onDrop={(e: React.DragEvent<HTMLDivElement>) => bombStore.drop(e)}
                onDragOver={allowDrop}>

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
    )
})


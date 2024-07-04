import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";



export default observer(function TestGame(){

    return (
        <>test</>
    )

    const {testGameStore} = useStore();

    if (testGameStore.hub === null){
        testGameStore.createConnection();
    }

    return (
        <>Test Game
        
            <div onClick={()=>testGameStore.triggerEventListener()}>click me</div>
            <div>click: {testGameStore.value}</div>

            <hr />
            <hr />
            <hr />
            <hr />
            <div onClick={()=>testGameStore.triggerEventListener2()}>click me</div>
            <div>object: {JSON.stringify(testGameStore.object)}</div>
        </>
    )
})
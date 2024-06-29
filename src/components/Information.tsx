import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";


interface Props {
    images: string[]
}


export default observer(function Information(props: Props) {

    const { slideShowStore } = useStore();
    return (
        <div className="info" onClick={() => slideShowStore.toggleSlideShow(props.images)}>
            <i className="fa-solid fa-circle-info"></i>
        </div>
    )
})
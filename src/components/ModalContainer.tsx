import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";


export default observer(function ModalContainer() {
    const { modalStore } = useStore();

    return (
        modalStore.modal.open &&
        <div className={`modal-container ${modalStore.modal.open ? 'open' : ''}`}
            onClick={() => {
                modalStore.closeModal();
            }}
        >
            <div className="modal">
                {modalStore.modal.body}
            </div>
        </div>
    )
})
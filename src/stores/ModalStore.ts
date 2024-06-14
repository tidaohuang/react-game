import { makeAutoObservable } from "mobx"
import { store } from "./store";
import { KeyboardEventKey } from "../constants/KeyboardEvent";


interface Modal {
    open: boolean;
    body: JSX.Element | null;
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null
    }

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element) => {
        this.modal.open = true;
        this.modal.body = content;
        document.addEventListener("keydown", keyDownHandler);
    }

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
        document.removeEventListener("keydown", keyDownHandler);
    }
}

const keyDownHandler = (e: globalThis.KeyboardEvent) => {
    e.preventDefault();
    if (e.key === KeyboardEventKey.ESCAPE) {
        store.modalStore.closeModal();
    }
}

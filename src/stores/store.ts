import { createContext, useContext } from "react";
import RotateGameStore from "../games/RotateGame/RotateGameStore";
import ModalStore from "./ModalStore";
import SlideShowStore from "./SlideShowStore";


interface Store {
    rotateGameStore: RotateGameStore,
    modalStore: ModalStore,
    slideShowStore: SlideShowStore,
}

export const store: Store = {
    rotateGameStore: new RotateGameStore(),
    modalStore: new ModalStore,
    slideShowStore: new SlideShowStore(),
};

export const StoreContext = createContext(store);

// react hook
export function useStore() {
    return useContext(StoreContext);
}

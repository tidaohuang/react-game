import { createContext, useContext } from "react";
import RotateGameStore from "../games/RotateGame/RotateGameStore";
import ModalStore from "./ModalStore";
import SlideShowStore from "./SlideShowStore";
import NavBarStore from "./NavBarStore";


interface Store {
    rotateGameStore: RotateGameStore,
    modalStore: ModalStore,
    slideShowStore: SlideShowStore,
    navbarStore: NavBarStore,
}

export const store: Store = {
    rotateGameStore: new RotateGameStore(),
    modalStore: new ModalStore,
    slideShowStore: new SlideShowStore(),
    navbarStore: new NavBarStore()
};

export const StoreContext = createContext(store);

// react hook
export function useStore() {
    return useContext(StoreContext);
}

import { createContext, useContext } from "react";
import RotateGameStore from "../games/RotateGame/RotateGameStore";
import ModalStore from "./ModalStore";
import SlideShowStore from "./SlideShowStore";
import NavBarStore from "./NavBarStore";
import FiveSecondsStore from "../games/FiveSecondsGame/FiveSecondsStore";
import PlayerStore from "./PlayerStore";


interface Store {
    rotateGameStore: RotateGameStore,
    fiveSecondsStore: FiveSecondsStore,
    modalStore: ModalStore,
    slideShowStore: SlideShowStore,
    navbarStore: NavBarStore,
    playerStore: PlayerStore,
}

export const store: Store = {
    rotateGameStore: new RotateGameStore(),
    fiveSecondsStore: new FiveSecondsStore(),
    modalStore: new ModalStore,
    slideShowStore: new SlideShowStore(),
    navbarStore: new NavBarStore(),
    playerStore: new PlayerStore()
};

export const StoreContext = createContext(store);

// react hook
export function useStore() {
    return useContext(StoreContext);
}

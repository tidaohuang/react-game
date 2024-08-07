import { createContext, useContext } from "react";
import RotateGameStore from "../games/RotateGame/RotateGameStore";
import ModalStore from "./ModalStore";
import SlideShowStore from "./SlideShowStore";
import NavBarStore from "./NavBarStore";
import FiveSecondsStore from "../games/FiveSecondsGame/FiveSecondsStore";
import PlayerStore from "./PlayerStore";
import BombGameStore from "../games/BombGame/BombGameStore";
import HomeStore from "./HomeStore";
import HeartConnectStore from "../games/HeartConnectGame/HeartConnectStore";


interface Store {
    rotateGameStore: RotateGameStore,
    fiveSecondsStore: FiveSecondsStore,
    bombStore: BombGameStore,
    heartConnectStore: HeartConnectStore,
    // testGameStore: TestGameStore,

    modalStore: ModalStore,
    slideShowStore: SlideShowStore,
    navbarStore: NavBarStore,
    playerStore: PlayerStore,
    homeStore: HomeStore
}

export const store: Store = {
    rotateGameStore: new RotateGameStore(),
    fiveSecondsStore: new FiveSecondsStore(),
    bombStore: new BombGameStore(),
    heartConnectStore: new HeartConnectStore(),
    // testGameStore: new TestGameStore(),

    modalStore: new ModalStore,
    slideShowStore: new SlideShowStore(),
    navbarStore: new NavBarStore(),
    playerStore: new PlayerStore(),
    homeStore: new HomeStore()
};

export const StoreContext = createContext(store);

// react hook
export function useStore() {
    return useContext(StoreContext);
}

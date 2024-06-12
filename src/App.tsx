import { observer } from "mobx-react-lite";
import ModalContainer from "./components/ModalContainer";
import SlideShowContainer from "./components/SlideShowContainer";
import { Outlet } from "react-router-dom";
import HomePage from "./components/HomePage";
import NvaBarContainer from "./components/NvaBarContainer";
import WinnerContainer from "./components/WinnerContainer";

function App() {
  return (
    <>
      <SlideShowContainer />
      <ModalContainer />
      <NvaBarContainer/>
      <WinnerContainer/>
      {location.pathname === '/react-game/' ? <HomePage/> : <Outlet/>}
    </>
  )
}

export default observer(App);

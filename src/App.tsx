import { observer } from "mobx-react-lite";
import RotateGame from "./games/RotateGame/RotateGame"
import ModalContainer from "./components/ModalContainer";
import SlideShowContainer from "./components/SlideShowContainer";

function App() {
  return (
    <>
      <SlideShowContainer />
      <ModalContainer />
      <RotateGame />
    </>
  )
}

export default observer(App);

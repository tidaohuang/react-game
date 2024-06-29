import queryString from "query-string";
import { observer } from "mobx-react-lite";
import ModalContainer from "./components/ModalContainer";
import SlideShowContainer from "./components/SlideShowContainer";
import HomePage from "./components/HomePage";
import NvaBarContainer from "./components/NavBarContainer";
import WinnerContainer from "./components/WinnerContainer";
import RotateGame from "./games/RotateGame/RotateGame";
import FiveSecondsGame from "./games/FiveSecondsGame/FiveSecondsGame";
import BombGame from "./games/BombGame/BombGame";
import HeartConnectGame from "./games/HeartConnectGame/HeartConnectGame";
import { PAGE } from "./constants/Pages";

function App() {
	const parsed = queryString.parse(window.location.search);

	const game = parsed?.g;

	const content = [];

	if (game === PAGE.Rotate) {
		content.push(<RotateGame key={PAGE.Rotate} />)
	} else if (game === PAGE.FiveSeconds) {
		content.push(<FiveSecondsGame key={PAGE.FiveSeconds} />)
	} else if (game === PAGE.Bomb) {
		content.push(<BombGame key={PAGE.Bomb} />)
	} else if (game === PAGE.HeartConnect) {

		const mode = parsed?.mode;
		if (mode != null) {
			content.push(<HeartConnectGame mode={mode.toString()} key={PAGE.HeartConnect} />)
		} else {
			content.push(<HeartConnectGame key={PAGE.HeartConnect} />)
		}

	} else {
		content.push(<HomePage key={PAGE.Home} />)
	}

	return (
		<>
			<SlideShowContainer />
			<ModalContainer />
			<NvaBarContainer />
			<WinnerContainer />
			{content}
		</>
	)
}

export default observer(App);

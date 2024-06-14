import queryString from "query-string";
import { observer } from "mobx-react-lite";
import ModalContainer from "./components/ModalContainer";
import SlideShowContainer from "./components/SlideShowContainer";
import HomePage from "./components/HomePage";
import NvaBarContainer from "./components/NavBarContainer";
import WinnerContainer from "./components/WinnerContainer";
import { PAGE } from "./stores/NavBarStore";
import RotateGame from "./games/RotateGame/RotateGame";
import FiveSecondsGame from "./games/FiveSecondsGame/FiveSecondsGame";
import { fiveSecondsGameKeyDownHandler } from "./games/FiveSecondsGame/FiveSecondsStore";

function App() {
	const parsed = queryString.parse(window.location.search);

	const game = parsed?.g;

	const content = [];

	if (game === PAGE.Rotate) {
		content.push(<RotateGame key={PAGE.Rotate} />)
	} else if (game === PAGE.FiveSeconds) {
		document.addEventListener("keydown", fiveSecondsGameKeyDownHandler);
		content.push(<FiveSecondsGame key={PAGE.FiveSeconds} />)
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

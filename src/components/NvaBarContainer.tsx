import { observer } from "mobx-react-lite"
import { useStore } from "../stores/store"



export default observer(function NvaBarContainer() {

    const { navbarStore } = useStore();

    return (
        <nav className={`navbar ${navbarStore.show ? 'show' : ''}`}>
            <div className="hamburger-menu" onClick={navbarStore.toggle}>
                <div className="line line-nav1"></div>
                <div className="line line-nav2"></div>
                <div className="line line-nav3"></div>
            </div>

            <ul className="nav-list">
                <li className="nav-item">
                    <a href="/react-game/" className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href="/react-game/rotate" className="nav-link">旋轉棋</a>
                </li>
                <li className="nav-item">
                    <a href="/react-game/5seconds" className="nav-link">5秒反應</a>
                </li>
            </ul>
        </nav>
    )
})
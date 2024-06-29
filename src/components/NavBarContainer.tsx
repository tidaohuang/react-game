import { observer } from "mobx-react-lite"
import { useStore } from "../stores/store"
import { PAGE } from "../constants/Pages";



export default observer(function NavBarContainer() {

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
                    <a href={navbarStore.getUrl(PAGE.Home)} className="nav-link">Home</a>
                </li>
                <li className="nav-item">
                    <a href={navbarStore.getUrl(PAGE.Rotate)} className="nav-link">旋轉棋</a>
                </li>
                <li className="nav-item">
                    <a href={navbarStore.getUrl(PAGE.FiveSeconds)} className="nav-link">5秒反應</a>
                </li>
                <li className="nav-item">
                    <a href={navbarStore.getUrl(PAGE.Bomb)} className="nav-link">深水炸彈</a>
                </li>
                <li className="nav-item">
                    <a href={navbarStore.getUrl(PAGE.HeartConnect)} className="nav-link">心電感應</a>
                </li>
            </ul>
        </nav>
    )
})
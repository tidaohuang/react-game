import { observer } from "mobx-react-lite"
import { useStore } from "../stores/store"
import { PAGE } from "../constants/Pages";



export default observer(function NavBarContainer() {

    const { navbarStore, homeStore } = useStore();

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
                {homeStore.games.map((g) => (
                    g.tag === 'green' &&
                    <li className="nav-item" key={g.page}>
                        <a href={navbarStore.getUrl(g.page)} className="nav-link">{g.name}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
})
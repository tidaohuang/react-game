import queryString from "query-string";
import StickerGamePlayer from "./StickerGamePlayer";
import StickerGameLeader from "./StickerGameLeader";
import Information from "../../components/Information";
import './style-sticker.css';

export default function StickerGame() {


    const parsed = queryString.parse(window.location.search);

    if (parsed.mode && parsed.mode === 'player') {
        return <StickerGamePlayer />
    }

    if (parsed.mode && parsed.mode === 'leader') {
        return <StickerGameLeader />
    }

    return (
        <div className="container sticker-game">

            <Information images={[
                "games/fiveSeconds/1.JPG",
                "games/fiveSeconds/2.JPG",
            ]} />

            <div className="sticker-btn-wrapper">
                <div className="sticker-next-btn" onClick={() => {
                    window.open('/react-game/?g=sticker&mode=player', "_blank");
                }}>
                    <span>Player</span>
                </div>
                <div className="sticker-next-btn" onClick={() => {
                    window.open('/react-game/?g=sticker&mode=leader', "_blank");
                }}>
                    <span>Leader</span>
                </div>
            </div>

        </div>
    )
}
import { useEffect, useState } from "react";
import Information from "../../components/Information";
import '../../styles/style-sticker.css';
import Sticker from "./Sticker";

export default function StickerGame() {

    const [stickerIndex, setStickerIndex] = useState<number>(1);

    useEffect(() => {

    }, [stickerIndex])

    return (
        <div className="container sticker-game">

            <Information images={[
                "games/fiveSeconds/1.JPG",
                "games/fiveSeconds/2.JPG",
            ]} />

            <div className="sticker-wrapper">
                <Sticker number={1} img={`games/sticker/question/${stickerIndex}/1.png`} />
                <Sticker number={2} img={`games/sticker/question/${stickerIndex}/2.png`} />
                <Sticker number={3} img={`games/sticker/question/${stickerIndex}/3.png`} />
                <Sticker number={4} img={`games/sticker/question/${stickerIndex}/4.png`} />
            </div>

            {stickerIndex < 11 &&
                <div className="sticker-next-btn" onClick={() => setStickerIndex(stickerIndex + 1)}>
                    <span>下一題</span>
                </div>
            }
        </div>
    )
}
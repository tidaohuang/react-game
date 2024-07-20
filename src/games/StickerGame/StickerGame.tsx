import { useEffect, useState } from "react";
import Information from "../../components/Information";
import '../../styles/style-sticker.css';
import Sticker from "./Sticker";
import { shuffleV1 } from "../../utils/commonFunction";

export default function StickerGame() {

    const [stickerIndex, setStickerIndex] = useState<number>(1);
    const [images, setImages] = useState(['1', '2', '3', '4'])
    useEffect(() => {
        setImages(shuffleV1(images));
    }, [stickerIndex])

    const stickers = []
    for (let i = 0; i < images.length; i++) {

        if (stickerIndex === 9 && images[i] === '3') {
            stickers.push(<Sticker key={i}
                number={i + 1}
                img={`games/sticker/question/${stickerIndex}/${images[i]}-x.png`}
            />)
        }
        else {
            stickers.push(<Sticker key={i}
                number={i + 1}
                img={`games/sticker/question/${stickerIndex}/${images[i]}.png`}
            />)
        }


    }

    return (
        <div className="container sticker-game">

            <Information images={[
                "games/fiveSeconds/1.JPG",
                "games/fiveSeconds/2.JPG",
            ]} />

            <div className="sticker-wrapper">
                {/* <Sticker number={1} img={`games/sticker/question/${stickerIndex}/1.png`} />
                <Sticker number={2} img={`games/sticker/question/${stickerIndex}/2.png`} />
                <Sticker number={3} img={`games/sticker/question/${stickerIndex}/3.png`} />
                <Sticker number={4} img={`games/sticker/question/${stickerIndex}/4.png`} /> */}
                {stickers}
            </div>

            {stickerIndex < 11 &&
                <div className="sticker-next-btn" onClick={() => {
                    setStickerIndex(stickerIndex + 1)
                    setImages(shuffleV1(images));
                }}>
                    <span>下一題</span>
                </div>
            }

            {stickerIndex === 11 &&
                <div className="sticker-next-btn">
                    <span>End</span>
                </div>
            }
        </div>
    )
}
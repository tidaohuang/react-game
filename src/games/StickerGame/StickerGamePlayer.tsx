import { useEffect, useState } from "react";
import { shuffleV1 } from "../../utils/commonFunction";
import Sticker from "./Sticker";

export function inhibitSticker(stickerIndex: number, imageIndex: string): boolean{
    if (stickerIndex === 9 && imageIndex === '3') {
        return true;
    }
    return false;
}


export default function StickerGamePlayer(){


    const [stickerIndex, setStickerIndex] = useState<number>(1);
    const [images, setImages] = useState(['1', '2', '3', '4'])
    useEffect(() => {
        setImages(shuffleV1(images));
    }, [stickerIndex])

    const stickers = []
    for (let i = 0; i < images.length; i++) {

        if (inhibitSticker(stickerIndex, images[i])) {
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

            <div className="sticker-wrapper">
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
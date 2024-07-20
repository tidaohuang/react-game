import { useEffect, useState } from "react";
import { inhibitSticker } from "./StickerGamePlayer";


export default function StickerGameLeader() {

    const [stickerIndex, setStickerIndex] = useState<number>(1);
    const [imageIndex, setImageIndex] = useState<string>('1');


    function randImageIndex() {
        return (Math.floor(Math.random() * 4) + 1).toString();
    }

    useEffect(() => {
        setImageIndex(randImageIndex());
        if (inhibitSticker(stickerIndex, imageIndex)) {
            setImageIndex(_ => '1');
        }

    }, [stickerIndex, imageIndex]);



    return (
        <div className="container sticker-game">

            <div className="sticker-wrapper">
                <div className="sticker">
                    <div className="image">
                        <img src={`games/sticker/question/${stickerIndex}/${imageIndex}.png`} alt="" />
                    </div>
                </div>
            </div>


            {stickerIndex < 11 &&
                <div className="sticker-next-btn" onClick={() => {
                    setStickerIndex(stickerIndex + 1);
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

interface Props {
    img: string,
    number: number
}

export default function Sticker({ img, number }: Props) {
    return (
        <div className="sticker">
            <div className="image">
                <img src={img} alt="" />
            </div>
            <div className="number">
                {number}
            </div>
        </div>
    )
}
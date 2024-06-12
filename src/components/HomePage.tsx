
// import { useNavigate } from "react-router-dom";

export default function HomePage() {

    // let navigate = useNavigate();


    return (
        <div className="container home">

            <div className="game-card-wrapper">
                <div className="game-card" onClick={() => window.location.href = "/react-game/rotate"}>
                    <div className="game-card-top">
                        <img src="rotate-game-logo.svg" className="game-card-logo" />
                    </div>
                    <div className="game-card-bottom">
                        <div className="game-title">
                            旋轉棋
                            <div className="tag green">
                                Live
                            </div>
                        </div>

                        <div className="game-card-meta">
                            <div className="meta">人數</div>
                            <div className="meta-value">2人</div>
                        </div>
                        <div className="game-card-meta">
                            <div className="meta">時間</div>
                            <div className="meta-value">5-10 mins</div>
                        </div>
                        <div className="game-card-meta">
                            <div className="meta">類型</div>
                            <div className="meta-value">
                                益智類
                                <i className="fa fa-brain"></i>
                            </div>
                        </div>


                        <div className="game-rate">
                            <div className="game-complexity">難易度</div>
                            <div className="stars">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="game-card" onClick={() => window.location.href = "/react-game/5seconds"}>
                    <div className="game-card-top">
                        <img src="five-seconds-game-logo.svg" className="game-card-logo five-seconds" />
                    </div>
                    <div className="game-card-bottom">
                        <div className="game-title">
                            5秒反應
                            <div className="tag green">
                                Live
                            </div>
                        </div>

                        <div className="game-card-meta">
                            <div className="meta">人數</div>
                            <div className="meta-value">不限</div>
                        </div>
                        <div className="game-card-meta">
                            <div className="meta">時間</div>
                            <div className="meta-value">5-10 mins</div>
                        </div>
                        <div className="game-card-meta">
                            <div className="meta">類型</div>
                            <div className="meta-value">
                                反應類
                                <i className="fa-solid fa-gauge"></i>
                            </div>
                        </div>


                        <div className="game-rate">
                            <div className="game-complexity">難易度</div>
                            <div className="stars">
                                <i className="fa-solid fa-star"></i>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="game-card" onClick={() => window.location.href = "/react-game/"}>
                    <div className="game-card-top">
                        {/* <img src="rotate-game-logo.svg" className="game-card-logo" /> */}
                    </div>
                    <div className="game-card-bottom">
                        <div className="game-title">
                            深水炸彈
                            <div className="tag dev">
                                開發中
                            </div>
                        </div>

                        <div className="game-card-meta">
                            <div className="meta">人數</div>
                            <div className="meta-value">2人</div>
                        </div>
                        <div className="game-card-meta">
                            <div className="meta">時間</div>
                            <div className="meta-value">5-10 mins</div>
                        </div>
                        <div className="game-card-meta">
                            <div className="meta">類型</div>
                            <div className="meta-value">
                                益智類
                                <i className="fa fa-brain"></i>
                            </div>
                        </div>


                        <div className="game-rate">
                            <div className="game-complexity">難易度</div>
                            <div className="stars">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
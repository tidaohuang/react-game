import { useEffect, useRef } from "react";
import { store, useStore } from "../stores/store"
import { KeyboardEventKey } from "../constants/KeyboardEvent";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {

    const { navbarStore, homeStore } = useStore();

    // for mobile
    const startX = useRef(0);
    const startY = useRef(0);
    const endX = useRef(0);
    const endY = useRef(0);
    const threshold = 50; // Minimum distance for a swipe to be registered


    const content = [];


    for (let i = 0; i < homeStore.gameIndexes.length; i++) {
        const card = homeStore.games[homeStore.gameIndexes[i]];
        let cardStyle = undefined;
        if (i === 0) {
            cardStyle = 'game-card blur-left';
        } else if (i === homeStore.gameIndexes.length - 1) {
            cardStyle = 'game-card blur-right';
        } else {
            cardStyle = 'game-card';
        }

        content.push(
            <div className={cardStyle} key={card.page}
                onClick={() => window.location.href = navbarStore.getUrl(card.page)}>
                <div className="game-card-top">
                    <img src={card.img} className={`game-card-logo ${card.page}-logo`} />
                </div>
                <div className="game-card-bottom">
                    <div className="game-title">
                        {card.name}
                        <div className={`tag ${card.tag}`}>
                            {card.tag === 'green' && 'Live'}
                            {card.tag === 'dev' && '開發中'}
                        </div>
                    </div>

                    <div className="game-card-meta">
                        <div className="meta">人數</div>
                        <div className="meta-value">{card.playerNumber === 'unlimited' ? '不限' : card.playerNumber}</div>
                    </div>
                    <div className="game-card-meta">
                        <div className="meta">時間</div>
                        <div className="meta-value">{card.time}</div>
                    </div>
                    <div className="game-card-meta">
                        <div className="meta">類型</div>
                        <div className="meta-value">
                            {card.category}
                            {card.category === '益智類' && <i className="fa fa-brain"></i>}
                            {card.category === '反應類' && <i className="fa-solid fa-gauge"></i>}
                            {card.category === '默契類' && <i className="fa-solid fa-heart-pulse"></i>}
                        </div>
                    </div>


                    <div className="game-rate">
                        <div className="game-complexity">難易度</div>
                        <div className="stars">
                            {card.complexity === 1 &&
                                <i className="fa-solid fa-star"></i>
                            }
                            {card.complexity === 2 &&
                                <>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </>
                            }
                            {card.complexity === 3 &&
                                <>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </>
                            }
                            {card.complexity === 4 &&
                                <>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                </>
                            }
                        </div>
                    </div>

                </div>
            </div>
        )
    }

    const handleTouchStart = (e: any) => {
        startX.current = e.touches[0].clientX;
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: any) => {
        endX.current = e.touches[0].clientX;
        endY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
        const deltaX = endX.current - startX.current;
        const deltaY = endY.current - startY.current;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (Math.abs(deltaX) > threshold) {
                if (deltaX > 0) {
                    handleSwipeRight();
                } else {
                    handleSwipeLeft();
                }
            }
        }

        // Reset values
        startX.current = 0;
        startY.current = 0;
        endX.current = 0;
        endY.current = 0;
    };

    const handleSwipeLeft = () => {
        store.homeStore.handlePrevious();
    };

    const handleSwipeRight = () => {
        store.homeStore.handleNext();
    };

    useEffect(() => {

        // for mobile swiping
        const slideShowElement = document.getElementById('all-games');
        slideShowElement?.addEventListener('touchstart', handleTouchStart);
        slideShowElement?.addEventListener('touchmove', handleTouchMove);
        slideShowElement?.addEventListener('touchend', handleTouchEnd);



        document.addEventListener("keydown", homePageKeyDownHandler);

        return () => {
            document.removeEventListener("keydown", homePageKeyDownHandler);

            // for mobile
            slideShowElement?.removeEventListener('touchstart', handleTouchStart);
            slideShowElement?.removeEventListener('touchmove', handleTouchMove);
            slideShowElement?.removeEventListener('touchend', handleTouchEnd);
        }
    }, [homeStore.gameIndexes]);



    return (
        <div className="container home">
            <div className="game-card-wrapper" id="all-games">
                {content}
            </div>
        </div>
    )
})



function homePageKeyDownHandler(this: Document, event: KeyboardEvent) {
    if (event.key === KeyboardEventKey.ARROW_RIGHT) {
        store.homeStore.handleNext();
    } else if (event.key === KeyboardEventKey.ARROW_LEFT) {
        store.homeStore.handlePrevious();
    }
}

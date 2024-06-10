import { observer } from "mobx-react-lite";
import { useStore } from "../stores/store";



export default observer(function SlideShowContainer() {
    const { slideShowStore } = useStore();

    return (
        <>
            {slideShowStore.slide.open &&
                <div className="slideshow-wrapper">
                    <div className="control left-arrow" onClick={slideShowStore.showPreviousSlide}>
                        <div className="arrow">
                            <div className="line line-1"></div>
                            <div className="line line-2"></div>
                        </div>
                    </div>
                    <div className="slides">
                        {slideShowStore.slide.images.map((image, index) => (
                            <div className={`slide ${!image.visible ? 'hidden' : ''} slide-${index + 1}`} key={index}>
                                <img src={image.url} />
                            </div>
                        ))}
                    </div>
                    <div className="control right-arrow" onClick={slideShowStore.showNextSlide}>
                        <div className="arrow">
                            <div className="line line-3"></div>
                            <div className="line line-4"></div>
                        </div>
                    </div>
                    <div className="slide-close" onClick={slideShowStore.closeSlideShow}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
            }

        </>
    )
})
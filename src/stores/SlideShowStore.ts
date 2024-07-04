import { makeAutoObservable } from "mobx"
import { store } from "./store";
import { KeyboardEventKey } from "../constants/KeyboardEvent";
import { isOneOf } from "../utils/commonFunction";


interface Image {
    url: string;
    visible: boolean;
}


interface SlideShow {
    open: boolean;
    images: Image[];
}




export default class SlideShowStore {

    slide: SlideShow = {
        open: false,
        images: []
    }
    current = 0;
    constructor() {
        makeAutoObservable(this);
    }

    toggleSlideShow = (imgUrls: string[]) => {
        if (!this.slide.open) {
            this.openSlideShow(imgUrls);
        } else {
            this.closeSlideShow();
        }
    }

    openSlideShow = (imgUrls: string[]) => {

        if (imgUrls.length === 0) {
            throw new Error('no img to show');
        }

        this.slide.open = true;
        this.slide.images = imgUrls.map((url, index) => {
            if (index === 0) {
                return { url, visible: true };
            }
            return { url, visible: false };
        });

        document.addEventListener("keydown", keyDownHandler);
    }




    closeSlideShow = () => {
        this.slide.open = false;
        this.slide.images = [];

        document.removeEventListener("keydown", keyDownHandler);
    }

    changeSlides = () => {
        if (this.current > this.slide.images.length - 1) {
            this.current = 0;
        } else if (this.current < 0) {
            this.current = this.slide.images.length - 1;
        }

        const tempImages: Image[] = [];
        this.slide.images.forEach((image: Image, index: number) => {
            if (index === this.current) {
                tempImages.push({ url: image.url, visible: true });
            } else {
                tempImages.push({ url: image.url, visible: false });
            }
        });

        this.slide.images = tempImages;
    }

    showNextSlide = () => {
        this.current++;
        this.changeSlides();
    }

    showPreviousSlide = () => {
        this.current--;
        this.changeSlides();
    }
}


const keyDownHandler = (e: globalThis.KeyboardEvent) => {
    console.log('SlideShowStore keyDownHandler ...')

    e.preventDefault();
    if (e.key === KeyboardEventKey.ESCAPE) {
        store.slideShowStore.closeSlideShow();
    } else if (isOneOf(e.key, 
        KeyboardEventKey.ARROW_DOWN, 
        KeyboardEventKey.ARROW_RIGHT, 
        KeyboardEventKey.ENTER)) {
        store.slideShowStore.showNextSlide();
    } else if (isOneOf(e.key, 
        KeyboardEventKey.ARROW_LEFT, 
        KeyboardEventKey.ARROW_UP)) {
        store.slideShowStore.showPreviousSlide();
    }
}

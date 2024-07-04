



export default class StorageConnectionHub {
    constructor() {

    }

    on(eventKey: string, eventHandler: (...args: any[]) => any) {
        console.log(`window.addEventListener added: ${eventKey}`);


        // window.addEventListener(eventKey, eventHandler);
        window.addEventListener('storage', (event: StorageEvent) => {
            if (event.key === eventKey){

                const localString = localStorage.getItem(eventKey);
                if (localString !== null){
                    eventHandler(JSON.parse(localString));
                } else {
                    console.warn(`localStorage.getItem{'${eventKey}'} not found`);
                }
            }
        });
    }

    send(eventKey: string, args: any) {
        console.log(`trigger local storage event: ${eventKey}`);
        localStorage.setItem(eventKey, JSON.stringify(args));
        // window.dispatchEvent(new CustomEvent(eventKey, { ...args }));
    }



}

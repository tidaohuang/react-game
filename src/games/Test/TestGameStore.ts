import StorageConnectionHub from "../../utils/StorageConnectionHub";
import { makeAutoObservable, runInAction } from "mobx"


export default class TestGameStore {

    hub: StorageConnectionHub | null = null;

    value = 0;

    object: { value: string, pos: string } = { value: '', pos: '' };

    constructor() {
        makeAutoObservable(this);
    }


    createConnection() {
        const hub = new StorageConnectionHub();
        console.log(JSON.stringify(hub));
        this.hub = hub;

        this.hub.on('EVENT_KEY', (value: number) => {
            runInAction(() => {
                this.value = value;
            });
        });


        this.hub.on('object', (value: { value: string, pos: string }) => {
            runInAction(() => {
                this.object = value;
            });
        });
    }

    triggerEventListener() {
        this.value = this.value + 1;
        this.hub?.send('EVENT_KEY', this.value);
    }

    triggerEventListener2() {
        const object = {
            value: Date.UTC.toString(),
            pos: Math.random().toString()
        }

        this.object = object;
        this.hub?.send('object', this.object);
    }

}
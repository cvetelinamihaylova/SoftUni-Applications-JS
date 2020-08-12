export class Provider {
    constructor(data = null) {
        this.subscribers = [];
        this.data = data;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
        this.subscribers.forEach(s => {
            s(data);
        })
    }

    subscribe(handler) {
        this.subscribers.push(handler);
    }
    unsubscribe(handler) {
        this.subscribers = this.subscribers.filter(s => s !== handler);
    }
}
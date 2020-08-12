
export class Consumer {
    constructor(provider, element) {
        provider.subscribe(this.onData.bind(this))
        this.element = element;
    }

    getElement(){
        return this.element;
    }

    onData(data) {
        this.element.textContent = `Number: ${data}`
    }
    

}

class AppButton extends HTMLButtonElement {
    static get observedAttributes() {
        return ['btn-type', 'text']
    }
    constructor() {
        super();
        this.classList.add('btn');

        console.log('Btn is active')
    }

    set btnType(newValue) {
        if (this._btnType) { this.classList.remove(this._btnType) }
        this.classList.add(newValue);
        this._btnType = newValue;
    }

    set text(newValue) {
        this.textContent = newValue;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'btn-type') {
            this.btnType = newValue;
        } else if (name === 'text') {
            this.text = newValue;
        }
    }
}

customElements.define('app-btn', AppButton, { extends: 'button' });
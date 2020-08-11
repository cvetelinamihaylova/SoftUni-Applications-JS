import { render, html } from 'lit-html';
import * as axios from 'axios';
//import * as appTxt from './app.txt';

function getTemplate(ctx) {
    return html`
    <style>${require('./app.css')}</style>
    <div>${require('./app.txt')}</div>
    <button @click=${ctx.btnClickHandler}>Click me!</button>
    `
}

class AppRoot extends HTMLElement {
    btnClickHandler = () => {
        console.log(this)
    }
    //appText = appTxt;
    constructor() {
        super();
        const root = this.attachShadow({ mode: 'closed' });
        this._update = function () {
            const template = getTemplate(this);
            render(template, root)
        }
        this._update();
    }
    connectedCallback() {
        axios.get('https://jsonplaceholder.typicode.com/users').then(users => {
            console.log(users)
        })
    }
}

customElements.define('app-root', AppRoot);
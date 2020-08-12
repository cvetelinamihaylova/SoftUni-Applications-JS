import { Provider } from './provider.js';
import {Consumer} from './consumer.js';

window.addEventListener('load', function () {
    app();


    function app() {
        const provider = new Provider();
        const numberLabel = new Consumer(provider, document.createElement('p'))
        const anotherNumLabel = new Consumer(provider, document.createElement('p'));

        document.querySelector('main').appendChild(numberLabel.getElement());
        document.querySelector('main').appendChild(anotherNumLabel.getElement());


        document.querySelector('#setNumber').addEventListener('click', function () {
            const value = document.querySelector('#inputBox').value;
            provider.setData(value);
        })
    }
});
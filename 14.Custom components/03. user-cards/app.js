import { render, html } from '../node_modules/lit-html/lit-html.js';

function getUserCardTemplate(context) {
    const userInfo = context.showInfo ? html`
      <div>
         <p>
             <slot name="email" />
         </p>
         <p>
             <slot name="phone" />
         </p>
      </div>
     `
        : null;

    return html`
      <style>
            .user-card {
                display: flex;
                font-family: 'Arial', sans-serif;
                background-color: #EEE;
                border-bottom: 5px solid darkorchid;
                width: 100%;
            }

            .user-card img {
                width: 200px;
                height: 200px;
                border: 1px solid darkorchid;
            }

            .info {
                display: flex;
                flex-direction: column;
            }

            .info h3 {
                font-weight: bold;
                margin-top: 1em;
                text-align: center;
            }

            .info button {
                outline: none;
                border: none;
                cursor: pointer;
                background-color: darkorchid;
                color: white;
                padding: 0.5em 1em;
            }

            @media only screen and (max-width: 500px) {
                .user-card {
                    flex-direction: column;
                    margin-bottom: 1em;
                }

                .user-card figure,
                .info button {
                    align-self: center;
                }

                .info button {
                    margin-bottom: 1em;
                }

                .info p {
                    padding-left: 1em;
                }
            }
        </style>
        <div class="user-card">
            <figure>
                <img src="${context['avatar-url']}" />
            </figure>
            <div class="info">
                <h3>${context.username}</h3>
                ${userInfo}
                <button @click=${context.toggleBtnHandler} class="toggle-info-btn">Toggle Info</button>
            </div>
        </div>
     `
}
class UserCard extends HTMLElement {
    static get observedAttributes() {
        return ['avatar-url', 'username']
    }
    constructor() {
        super();
        this.showInfo = false;
        this["avatar-url"] = null;
        this.username = null;
        const shadow = this.attachShadow({ mode: 'closed' });
        this._render = function () {
            const template = getUserCardTemplate(this);
            render(template, shadow, { eventContext: this });
        }

        this._render();
    }

    toggleBtnHandler() {
        this.showInfo = !this.showInfo;
        this._render();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
        this._render();
    }
}

customElements.define('user-card', UserCard);
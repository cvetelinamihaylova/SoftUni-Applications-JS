import { getHome } from './controllers/home.js'
import { getRegister, postRegister } from './controllers/register.js'
import { getLogin, postLogin } from './controllers/login.js'
import { getLogout } from './controllers/logout.js'
import { postCreate, getCreate, getDetails, getEdit, postEdit, getDelete } from './controllers/articles.js'


window.addEventListener('load', () => {
    const app = Sammy('#root', function () {
        // include a plugin
        this.use('Handlebars', 'hbs');

        this.userData = {
            isLoggedIn: false,
            isAuthor: false
        }

        // define a 'route'
        this.get('#/', getHome);
        this.get('#/home', getHome);

        this.get('#/register', getRegister);
        this.post('#/register', (ctx) => { postRegister.call(ctx) });

        this.get('#/logout', getLogout);
        this.get('#/login', getLogin);
        this.post('#/login', (ctx) => { postLogin.call(ctx) });

        this.get('#/create', getCreate);
        this.post('#/create', (ctx) => { postCreate.call(ctx) });

        this.get('#/details/:id', getDetails);

        this.get('#/edit/:id', getEdit);
        this.post('#/edit/:id', (ctx) => { postEdit.call(ctx) });

         this.get('#/delete/:id', getDelete);

    });

    // start the application
    app.run('#/');
})
import { getHome } from './controllers/home.js';
import { getRegister, postRegister } from './controllers/register.js';
import { getLogin, postLogin } from './controllers/login.js';
import { getLogout } from './controllers/logout.js';
import {
    getMovies,
    getCreate,
    getDetails,
    getEdit,
    postCreate,
    getBuyTickets,
    getOwnerMovies,
    postEdit,
    getDelete
} from './controllers/movies.js';


window.addEventListener('load', () => {

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/', getHome);
        this.get('#/home', getHome);

        this.get('#/register', getRegister);
        this.post('#/register', (ctx) => { postRegister.call(ctx) })
        this.get('#/login', getLogin);
        this.post('#/login', (ctx) => { postLogin.call(ctx) })
        this.get('#/logout', getLogout);

        this.get('#/movies', getMovies);
        this.get('#/my-movies', getOwnerMovies);

        this.get('#/create', getCreate);
        this.post('#/create', (ctx) => { postCreate.call(ctx) });

        this.get('#/details/:id', getDetails);

        this.get('#/edit/:id', getEdit);
        this.post('#/edit/:id', (ctx) => { postEdit.call(ctx) });

        this.get('#/buy/:id', getBuyTickets);

        this.get('#/delete/:id', getDelete);

    });
    app.run('#/')
});
import { homeController } from './controllers/home.js';
import { aboutController } from './controllers/about.js';
import { loginController, loginPost, logoutController } from './controllers/login.js';
import { registerController, registerPost } from './controllers/register.js';
import { catalogController } from './controllers/catalog.js';
import { detailsController } from './controllers/details.js';
import { createController, createPost } from './controllers/create.js';
import { editController } from './controllers/edit.js';


window.addEventListener('load', () => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            hasTeam: false
        }
        this.get('#/home', homeController);
        this.get('#/', homeController);

        this.get('#/about', aboutController);

        this.get('#/login', loginController);
        this.post('#/login', (ctx) => { loginPost.call(ctx) });

        this.get('#/register', registerController);
        this.post('#/register', (ctx) => { registerPost.call(ctx) });
       
        this.get('#/logout', logoutController);

        this.get('#/catalog', catalogController);
        this.get('#/catalog/:id', detailsController);

        this.get('#/create', createController);
        this.post('#/create', (ctx) => { createPost.call(ctx) });

        this.get('#/edit/:id', editController);

    });

    // start the application
    app.run('#/');
});
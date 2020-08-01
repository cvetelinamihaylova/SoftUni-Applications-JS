import { register } from '../data.js'

export async function registerController() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        registerForm: await this.load('../templates/register/registerForm.hbs'),
    };
    this.partial('../templates/register/registerPage.hbs', this.app.userData);
}

export async function registerPost() {
    const password = this.params.password;
    const username = this.params.username;
    if (password !== this.params.repeatPassword) { alert('Passwords doesn\'t match'); return; }

    try {
        const response = await register(username, password);
        if (response.code) { alert(response.message); return; }
        this.redirect('#/login');
    } catch (error) {
        console.log(error)
    }
}
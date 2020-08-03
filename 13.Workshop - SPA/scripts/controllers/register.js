import { register } from '../data.js';
import { showInfo, showError } from '../notifications.js';

export async function getRegister() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        registerForm: await this.load('../templates/register/registerForm.hbs'),
    }
    this.partial('../templates/register/registerPage.hbs')
}

export async function postRegister() {
    const username = this.params.username;
    const password = this.params.password;
    const repeatPassword = this.params.repeatPassword;
    const isValidData = _validateData(username, password, repeatPassword)
    if (!isValidData) { return; };
    try {
        const response = await register(username, password);
        if (response.code) {
            alert(response.message);
            return;
        }
        showInfo('Successfully registered!');
        this.redirect('#/login');

    } catch (error) {
        console.log(error);
        showError(error.message);
    }

}

function _validateData(username, pass, repeatPass) {
    if (username.length < 3) { showError('The username should be at least 3 characters long!'); return false; }
    if (pass.length < 6) { showError('The password should be at least 6 characters long!'); return false; }
    if (pass !== repeatPass) { showError('Passwords do not match!'); return false; }
    return true;
}
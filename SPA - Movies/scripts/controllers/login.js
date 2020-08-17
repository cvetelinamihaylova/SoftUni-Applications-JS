import { login } from "../data.js";
import { showError, showInfo } from "../notifications.js";

export async function getLogin() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    const ctx = Object.assign(this.app.userData, localStorage);

    this.partial('../templates/user/login.hbs', ctx);
}

export async function postLogin() {

    const { email, password } = this.params;

    const isValidCredentials = _validateData(email, password);

    if (!isValidCredentials) { return; }

    const response = await login(email, password);

    if (response.code) {
        showError(response.message);
        return;
    }

    this.app.userData.isLoggedIn = true;


    showInfo(`Login successful.`);

    this.redirect('#/home');

}


function _validateData(email, password) {
    if (!email) {
        showError('Email input must be filled!')
        return false;
    }
    if (password.length < 6) {
        showError('Password should be at least 6 characters long!')
        return false;
    }
    return true;
}
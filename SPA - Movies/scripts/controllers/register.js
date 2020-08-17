import { register, login } from "../data.js";
import { showInfo, showError } from "../notifications.js";

export async function getRegister() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
    }
    showInfo('Hope you enjoy :)');

    this.partial('../templates/user/register.hbs', this.app.userData);
}
export async function postRegister() {

    const { email, password, repeatPassword } = this.params

    const isValidCredentials = _validateData(email, password, repeatPassword);

    if (!isValidCredentials) { return; }

    try {
        const response = await register(email, password);
        if (response.code) {
            showError(response.message);
            return;
        }

        showInfo('Successful registration!');

        const responseLogin = await login(email, password);

        localStorage.setItem('userToken', responseLogin['user-token']);
        localStorage.setItem('email', responseLogin.email);
        localStorage.setItem('userId', responseLogin.objectId);
        localStorage.setItem('isLoggedIn', true);

        this.redirect('#/home');

    } catch (error) {
        console.log(error.message)
    }


}

function _validateData(email, password, repeatPassword) {
    if (!email) {
        showError('Email input must be filled!')
        return false;
    }
    if (password.length < 6) {
        showError('Password should be at least 6 characters long!')
        return false;
    }
    if (password !== repeatPassword) {
        showError('The repeat password should be equal to the password!')
        return false;
    }
    return true;
}
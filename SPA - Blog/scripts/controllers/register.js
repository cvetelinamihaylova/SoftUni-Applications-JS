import { showError, showInfo } from "../notifications.js";
import { register } from "../data.js";

export async function getRegister() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
    }

    this.partial('../templates/user/registerPage.hbs', this.app.userData);
}
export async function postRegister() {
    const data = {
        email: this.params.email,
        password: this.params.password,
        repeatPassword: this.params.repeatPassword
    }

    for (const key in data) {
        if (!data[key]) {
            showError(`Field ${key} is required!`);
            return;
        }

    }

    if (data.password !== data.repeatPassword) {
        showError("Passwords doesn't match!")
        return;
    }

    const response = await register(data.email, data.password);

    if (response.code) {
        showError(response.message);
        return;
    }

    showInfo('Successfully registered!');

    this.redirect('#/login');

}
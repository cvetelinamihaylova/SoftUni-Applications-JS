import { login } from "../data.js";
import { showInfo, showError } from "../notifications.js";

export async function getLogin() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        loginForm: await this.load('../templates/login/loginForm.hbs'),
    }
    this.partial('../templates/login/loginPage.hbs', localStorage)
}
export async function postLogin() {
    const username = this.params.username;
    const password = this.params.password;
    try {
        const response = await login(username, password);
        if (response.code) {
            alert(response.message);
            return;
        }
        showInfo('Successfully logged-in!');
        this.redirect('#/home');

    } catch (error) {
        console.log(error);
        showError(error.message);
    }

}
import { login } from "../data.js";

export async function getLogin() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }

    this.partial('../templates/user/login.hbs', this.app.userData);
}

export async function postLogin() {

    const data = {
        email: this.params.email,
        password: this.params.password,
    }

    for (const key in data) {
        if (!data[key]) {
            alert(`Field ${key} is required!`);
            return;
        }

    }

    const response = await login(data.email, data.password);

    if (response.code) {
        alert(response.message);
        console.log(response)
        return;
    }

    this.app.userData.isLoggedIn = true;
    // const ctx = Object.assign(this.app.userData.isLoggedIn, localStorage);

    alert(`Successfully logged-in ${response.email.split('@')[0]}`);

    this.redirect('#/home');

}
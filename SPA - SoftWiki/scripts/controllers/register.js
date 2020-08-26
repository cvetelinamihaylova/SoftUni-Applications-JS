import { register } from "../data.js";

export async function getRegister() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
    }

    this.partial('../templates/user/register.hbs', this.app.userData);
}
export async function postRegister() {
    const data = {
        email: this.params.email,
        password: this.params.password,
        repeatPassword: this.params.repeatPassword
    }

    for (const key in data) {
        if (!data[key]) {
            alert(`Field ${key} is required!`);
            return;
        }

    }

    if (data.password !== data.repeatPassword) {
        alert("Passwords doesn't match!")
        return;
    }

    const response = await register(data.email, data.password);

    if (response.code) {
        alert(response.message);
        return;
    }

    alert('Successfully registered!');

    this.redirect('#/login');

}
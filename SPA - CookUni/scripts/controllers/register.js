import { register, checkResponseFromDB } from "../data.js";

export async function getRegister() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }

    this.partial('../templates/user/register.hbs');
}
export async function postRegister() {
    const { firstName, lastName, username, password, repeatPassword } = this.params;
    try {
        const response = await register({ firstName, lastName, username, password, repeatPassword });
        checkResponseFromDB(response);
        localStorage.setItem('names', `${response.firstName} ${response.lastName}`)
        this.redirect('#/login');
    } catch (error) {
        console.log(error.message);
    }
}
import { register, checkResponseFromDB, login } from "../data.js";
import { showInfo } from "../notifications.js";

export async function getLogin() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        
    }


    this.partial('../templates/user/login.hbs');
}
export async function postLogin() {
 const {username, password} = this.params;
 try {
    const response = await login(username, password);
    checkResponseFromDB(response);
    this.app.userData.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', true);
    showInfo('Successfully logged in')
    this.redirect('#/home');
 } catch (error) {
     console.log(error.message);
 }
}
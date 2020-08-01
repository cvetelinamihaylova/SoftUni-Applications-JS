import { login, logout } from '../data.js';

export async function loginController() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        loginForm: await this.load('../templates/login/loginForm.hbs'),
    };
    this.partial('../templates/login/loginPage.hbs', this.app.userData);
}
export async function loginPost() {

    const username = this.params.username;
    const password = this.params.password;

    try {
        const response = await login(username, password);
        if (response.code) { alert(response.message); return; }
        this.app.userData.loggedIn = true;
        this.app.userData.username = username;
        this.app.userData.userId = response.objectId;
        
        if(response.teamId){
            this.app.userData.hasTeam = true;
            this.app.userData.teamId = response.teamId;
        }

        localStorage.setItem('userToken', response['user-token']);
        localStorage.setItem('username', response.username);
        localStorage.setItem('userId', response.objectId);
        this.redirect('#/home');
    } catch (error) {
        console.log(error)
    }
}
export async function logoutController(){
    await logout();

    this.app.userData.username = undefined;
    this.app.userData.loggedIn = false;
    this.app.userData.hasTeam = false;
    this.app.userData.userId = undefined;
    this.app.userData.teamId = undefined;

    localStorage.removeItem('username');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');

    this.redirect('#/home')
}
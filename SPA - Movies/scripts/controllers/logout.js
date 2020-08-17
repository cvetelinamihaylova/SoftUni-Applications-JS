import { logout } from '../data.js';
import { showInfo, showError } from '../notifications.js';

export async function getLogout() {
    try {
        const response = await logout();
        if (response.code) {
            showError(response.message);
            return;
        }
        this.app.userData = {};
        this.app.userData.isLoggedIn = false;


        showInfo('Successful logout');
        this.redirect('#/login')
    } catch (error) {
        console.log(error.message);
    }
}
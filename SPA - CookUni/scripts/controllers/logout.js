import { logout } from '../data.js';
import { showInfo } from '../notifications.js';

export async function getLogout() {
    try {
        const response = await logout();
        if (response.code) {
            alert(response.message);
            return;
        }
        this.app.userData = {};
        this.app.userData.isLoggedIn = false;
        localStorage.removeItem('names');

        showInfo('Successfully logged-out!');
        this.redirect('#/login')
    } catch (error) {
        console.log(error.message);
    }
}
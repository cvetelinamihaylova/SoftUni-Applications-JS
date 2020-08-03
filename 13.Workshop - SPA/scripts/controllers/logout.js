import { logout } from '../data.js';
import { showInfo, showError } from '../notifications.js';

export async function getLogout() {
    try {
        const response = await logout();
        if (response.code) {
            alert(response.message);
            return;
        }
        showInfo('Successfully logged-out!')
        this.redirect('#/home');

    } catch (error) {
        console.log(error);
        showError(error.message);
    }

}
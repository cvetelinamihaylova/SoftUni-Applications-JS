import { showInfo, showError } from "../notifications.js";
import { logout } from "../data.js";

export async function getLogout() {
    try {
        const response = await logout();
        if (response.code) {
            showError(response.message);
            return;
        }

        showInfo('Successfully logged-out!');
        this.app.userData.isLoggedIn = false;
        this.redirect('#/home');


    } catch (error) {
        console.log(error);
        showError(error.message);
    }

}
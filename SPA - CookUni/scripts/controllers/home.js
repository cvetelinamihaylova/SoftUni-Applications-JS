export async function getHome() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        recipePartial: await this.load('../templates/recipes/recipePartial.hbs')
    }

    if (localStorage.getItem('isLoggedIn')) {
        const ctx = Object.assign(this.app.userData, localStorage)
        this.partial('../templates/home/homeAuthorized.hbs', ctx);
    } else {
        this.partial('../templates/home/homeUnauthorized.hbs');
    }
}
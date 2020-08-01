export async function homeController() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    };
    this.partial('../templates/home/home.hbs', this.app.userData);
}
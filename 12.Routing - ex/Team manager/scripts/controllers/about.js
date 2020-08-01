export async function aboutController() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    };
    this.partial('../templates/about/about.hbs', this.app.userData);
}
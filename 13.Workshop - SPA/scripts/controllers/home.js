export async function getHome(){
this.partials = {
    header: await this.load('../templates/common/header.hbs'),
    footer: await this.load('../templates/common/footer.hbs'),
}
this.partial('../templates/home/home.hbs', localStorage)
}
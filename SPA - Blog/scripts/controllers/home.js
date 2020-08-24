import { getAllData } from "../data.js";

export async function getHome() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        posts: await this.load('../templates/posts/postPartial.hbs'),
    }
    if (this.app.userData.isLoggedIn) {
        const data = await getAllData()
        
        this.app.userData.posts = data.filter(d => d.ownerId === localStorage.getItem('userId'));
        console.log(data)
        console.log(this.app.userData.posts)

        const ctx = Object.assign(this.app.userData, localStorage);

        this.partial('../templates/home/homePageAuthorized.hbs', ctx);
    } else {
        this.partial('../templates/home/homePageUnauthorized.hbs', this.app.userData);
    }

}
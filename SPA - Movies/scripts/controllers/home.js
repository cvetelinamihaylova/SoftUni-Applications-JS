import { getAllData } from "../data.js"

export async function getHome() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        moviePartial: await this.load('../templates/movies/moviePartial.hbs'),
    }
    if (localStorage.getItem('isLoggedIn')) {

        const search = this.params.search || '';
        const movies = await getAllData(search);
        this.app.userData.movies = movies;
        this.app.userData.search = search;

    }
    const ctx = Object.assign(this.app.userData, localStorage)

    this.partial('../templates/home/home.hbs', ctx)
}


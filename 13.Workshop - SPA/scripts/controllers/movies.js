import { showError, showInfo } from "../notifications.js";
import { createMovie, getAllMovies, buyTicket, getMovieById, getMovieByOwner, editMovie, deleteMovie } from "../data.js";

export async function getMovies() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        movie: await this.load('../templates/movie/movie.hbs'),
    }
    const search = this.params.search || '';
    const movies = await getAllMovies(search);
    localStorage.removeItem('myMovies');
    const ctx = Object.assign({ movies, search }, localStorage);
    this.partial('../templates/movie/catalog.hbs', ctx)
}
export async function getOwnerMovies() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        movie: await this.load('../templates/movie/movie.hbs'),
    }
    const ownerId = localStorage.getItem('userId');
    localStorage.setItem('myMovies', true);
    const movies = await getMovieByOwner(ownerId);
    movies.map(m => m.isAuthor = true)
    const ctx = Object.assign({ movies }, localStorage);
    this.partial('../templates/movie/catalog.hbs', ctx)
}
export async function getCreate() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    this.partial('../templates/movie/createForm.hbs', localStorage)
}
export async function postCreate() {
    const title = this.params.title;
    const image = this.params.image;
    const availableTickets = +this.params.availableTickets;
    const description = this.params.description;
    const genres = this.params.genres;
    try {
        const isValidData = _validateData(title, image, description);
        if (!isValidData) { return; }

        const response = await createMovie({ title, image, availableTickets, description, genres });

        if (response.code) {
            showError(response.message);
            return;
        }
        showInfo('Successfully created movie!');
        this.redirect('#/details/' + response.objectId);

    } catch (error) {
        console.log(error);
        showError(error.message);
    }

}
export async function getDetails() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    const movie = await getMovieById(this.params.id);
    const ctx = Object.assign({ movie }, localStorage);
    this.partial('../templates/movie/detailsMovie.hbs', ctx)
}
export async function getEdit() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    const id = this.params.id;
    const movie = await getMovieById(id);
    const ctx = Object.assign({ movie }, localStorage);
    this.partial('../templates/movie/editForm.hbs', ctx)
}
export async function postEdit() {
    const title = this.params.title;
    const image = this.params.image;
    const availableTickets = +this.params.availableTickets;
    const description = this.params.description;
    const genres = this.params.genres;
    const objectId = this.params.id;

    try {
        const isValidData = _validateData(title, image, description);
        if (!isValidData) { return; }

        const response = await editMovie(objectId, { title, image, description, availableTickets, genres });

        if (response.code) {
            showError(response.message);
            return;
        }
        showInfo('Successfully edited movie!');
        this.redirect('#/details/' + response.objectId);

    } catch (error) {
        console.log(error);
        showError(error.message);
    }

}
export async function getBuyTickets() {
    const movie = await getMovieById(this.params.id);
    const currentTicket = movie.availableTickets;
    if (currentTicket == 0) {
        showError('Tickets out of stock!');
        this.redirect('#/movies')
        return;
    }
    try {
        const response = await buyTicket(movie);
        if (response.code) {
            showError(response.message);
            return;
        }
        showInfo('Ticket bought!');
        this.redirect('#/movies');

    } catch (error) {
        console.log(error);
        showError(error.message);
    }
}

export async function getDelete() {
    if (confirm('Do you want to DELETE the movie?') == false) {
        return this.redirect('#/my-movies');
    }
    const objectId = this.params.id;
    try {
        const response = await deleteMovie(objectId);
        if (response.code) {
            showError(response.message);
            return;
        }
        showInfo('Movie deleted!');
        this.redirect('#/my-movies');

    } catch (error) {
        console.log(error);
        showError(error.message);
    }
}

function _validateData(title, image, description) {
    if (title.length < 6) { showError('The title should be at least 6 characters long'); return false; }
    if (description.length < 10) { showError('The description should be at least 10 characters long'); return false; }
    // //if (!image.startsWith('http://') || !image.includes('https://')) {
    //     showError('The image should start with "http://" or "https://".'); return false;
    // }
    return true;
}
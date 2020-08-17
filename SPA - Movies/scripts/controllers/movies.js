import { createData, getDataById, editData, deleteData, likeMovie } from "../data.js";
import { showError, showInfo } from "../notifications.js";

export async function getCreate() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    const ctx = Object.assign(this.app.userData, localStorage);

    this.partial('../templates/movies/create.hbs', ctx)

}
export async function postCreate() {
    const movie = {
        title: this.params.title,
        description: this.params.description,
        imageUrl: this.params.imageUrl,
        creator: this.app.userData.userId,
        peopleLiked: []
    }
    if (!movie.title || !movie.description || !movie.imageUrl) {
        showError('Invalid inputs!');
        return;
    }
    try {
        const response = await createData(movie);
        if (response.code) {
            showError(response.message);
            return;
        }

        showInfo('Created successfully!');
        this.redirect('#/home');

    } catch (error) {
        console.log(error.message);
    }
}

export async function getDetails() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    try {
        const movie = await getDataById(this.params.id);
        const userId = localStorage.getItem('userId')
        if (movie.creator === userId) {
            this.app.userData.isAuthor = true;
        } else {
            this.app.userData.isAuthor = false;
        }
        const isLiked = movie.peopleLiked == null ? false : movie.peopleLiked.includes(localStorage.getItem('email'));
        if (isLiked) {
            this.app.userData.isLiked = true;
        } else {
            this.app.userData.isLiked = false;
        }
        
        const ctx = Object.assign({ ...movie }, this.app.userData, localStorage)

        this.partial('../templates/movies/details.hbs', ctx)
    } catch (error) {
        console.log(error.message);
    }


}

export async function getEdit() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    try {
        const movie = await getDataById(this.params.id);

        const ctx = Object.assign({ ...movie }, this.app.userData, localStorage)

        this.partial('../templates/movies/edit.hbs', ctx)

    } catch (error) {
        console.log(error);
    }


}

export async function postEdit() {
    const id = this.params.id;
    const movie = {
        title: this.params.title,
        description: this.params.description,
        imageUrl: this.params.imageUrl
    }
    if (!movie.title || !movie.description || !movie.imageUrl) {
        showError('Invalid inputs!');
        return;
    }
    try {
        const response = await editData(id, movie);
        if (response.code) {
            showError(response.message);
            return;
        }
        this.redirect(`#/details/${id}`);

    } catch (error) {
        console.log(error.message);
    }
}

export async function getDelete() {

    try {
        const response = await deleteData(this.params.id);
        if (response.code) {
            showError(response.message);
            return;
        }
        showInfo('Deleted successfully')
        this.redirect('#/home');

    } catch (error) {
        console.log(error.message);

    }

}

export async function getLikes() {
    const id = this.params.id;
    const movie = await getDataById(this.params.id);
    const newPersonLiked = localStorage.getItem('email');
    try {
        const response = await likeMovie(movie, newPersonLiked);
        if (response.code) {
            showError(response.message);
            return;
        }
        showInfo('Liked successfully');
        this.redirect(`#/details/${id}`);

    } catch (error) {
        console.log(error);
    }
}
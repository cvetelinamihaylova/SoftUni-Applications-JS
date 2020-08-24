import { showError, showInfo } from '../notifications.js'
import { createData, getAllData, getDataById, editData, deleteData } from '../data.js';

export async function postCreate() {
    const data = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content
    };

    for (const key in data) {
        if (!data[key]) {
            showError(`Field ${key} is required!`);
            return;
        }
    }

    const response = await createData(data);

    if (response.code) {
        showError(response.message);
        return;
    }
    const blogs = await getAllData()
    this.app.userData.posts = blogs.filter(d => d.ownerId === localStorage.getItem('userId'));
        

console.log(this.app.userData.posts)
    this.redirect('#/home')
}


export async function getDetails() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs')
    }
    const id = this.params.id;
    try {
        const response = await getDataById(id);
        if (response.code) {
            showError(response.message);
            return;
        }
        const ctx = Object.assign({ ...response }, this.app.userData, localStorage)
        this.partial('../templates/posts/detailsPage.hbs', ctx)

    } catch (error) {
        console.log(error)
    }

}
export async function getEdit() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        posts: await this.load('../templates/posts/postPartial.hbs'),
    }
    const post = await getDataById(this.params.id);
    this.app.userData.posts = await getAllData();
    const ctx = Object.assign({ ...post }, this.app.userData, localStorage);

    this.partial('../templates/posts/editPage.hbs', ctx);

}
export async function postEdit() {
    const data = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content
    };

    for (const key in data) {
        if (!data[key]) {
            showError(`Field ${key} is required!`);
            return;
        }
    }

    const response = await editData(this.params.id, data);

    if (response.code) {
        showError(response.message);
        return;
    }

    this.redirect('#/home')
}

export async function getDelete() {
    const id = this.params.id;
    try {

        const response = await deleteData(id);
        if (response.code) {
            showError(response.message);
        }
        showInfo('Successfully deleted movie!');
        this.redirect('#/home');
    } catch (error) {
        console.log(error.message);
    }
}
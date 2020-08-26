import { createData, getDataById, editData, deleteData } from "../data.js";

export async function getCreate() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }
    this.partial('../templates/articles/create.hbs', this.app.userData)

}
export async function postCreate() {
    const data = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content
    }
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key].length == 0) {
                alert(`Field ${key} is required!`);
                return;
            }
        }
    }
    try {
        const response = await createData(data);
        if (response.code) {
            alert(response.message);
            return;
        }
        console.log(response)
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

    const article = await getDataById(this.params.id);
    const userId = localStorage.getItem('userId')
    console
    if (article.ownerId === userId) {
        this.app.userData.isAuthor = true;
    }else{
        this.app.userData.isAuthor = false;
    }
    const ctx = Object.assign({ ...article }, this.app.userData, localStorage)

    this.partial('../templates/articles/details.hbs', ctx)
}

export async function getEdit() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs')
    }

    const article = await getDataById(this.params.id);
  
    const ctx = Object.assign({ ...article }, this.app.userData, localStorage)

    this.partial('../templates/articles/edit.hbs', ctx)
}

export async function postEdit() {
    const data = {
        title: this.params.title,
        category: this.params.category,
        content: this.params.content
    }
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key].length == 0) {
                alert(`Field ${key} is required!`)  ;
                return;
            }
        }
    }
    try {
        const response = await editData(this.params.id, data);
        if (response.code) {
            alert(response.message);
            return;
        }
        this.redirect('#/home');

    } catch (error) {
        console.log(error.message);
    }
}

export async function getDelete() {
 
    try {
        const response = await deleteData(this.params.id);
        if (response.code) {
            alert(response.message);
            return;
        }
        this.redirect('#/home');

    } catch (error) {
        console.log(error.message);
        
    }

}
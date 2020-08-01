import { create } from '../data.js';

export async function createController() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        createForm: await this.load('../templates/create/createForm.hbs'),
    };

    this.partial('../templates/create/createPage.hbs', this.app.userData);
}

export async function createPost() {

    const token = localStorage.getItem('userToken');
    if (token === null) { throw new Error('User is not logged in'); }
    const newTeam = {
        name: this.params.name,
        comment: this.params.comment
    }
    if (Object.values(newTeam).some(v => v.length == 0)) { alert('All fields are required!'); return; }
    try {
        const response = await create(newTeam, token);
        if (response.code) { alert(response.message); return; }

        this.app.userData.hasTeam = true;
        this.app.userData.teamId = response.objectId;
        
        this.redirect(`#/catalog/${response.objectId}`);
    } catch (error) {
        console.log(error)
    }

}
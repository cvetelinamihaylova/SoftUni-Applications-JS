import { getAllTeams } from "../data.js";

export async function catalogController() {
    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        team: await this.load('../templates/catalog/team.hbs'),
    };
    const teams = await getAllTeams();
    const data = Object.assign({teams}, this.app.userData);
    console.log(data)
    // data.teams = [
    //     {
    //         teamId: 4555,
    //         name: 'MC',
    //         comment: 'super team'
    //     }
    // ]
    this.partial('../templates/catalog/teamCatalog.hbs', data);
}
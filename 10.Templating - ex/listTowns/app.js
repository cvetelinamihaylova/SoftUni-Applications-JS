window.addEventListener('load', async () => {

    const inputEl = document.getElementById('towns');
    const townsContainer = document.getElementById('root');
    const templateString = await fetch('./main-template.hbs').then(res => res.text());
    const template = Handlebars.compile(templateString);

    document.getElementById('btnLoadTowns').addEventListener('click', function (e) {
        e.preventDefault();
        const townsArr = inputEl.value.split(', ');
        const context = { towns: townsArr };
        const html = template(context);
        townsContainer.innerHTML = html;
    })

});
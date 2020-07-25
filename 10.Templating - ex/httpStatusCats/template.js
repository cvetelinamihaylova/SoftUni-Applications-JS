window.addEventListener('load', async () => {

    const containerEl = document.getElementById('allCats');
    const catsTemplateString = await fetch('./templates/cats-template.hbs').then(res => res.text());
    const mainTemplateString = await fetch('./templates/main-template.hbs').then(res => res.text());

    Handlebars.registerPartial("cat", catsTemplateString);
    const mainTemplate = Handlebars.compile(mainTemplateString);


    const html = mainTemplate({ cats });
    containerEl.innerHTML = html;

    containerEl.addEventListener('click', function (e) {
        const target = e.target;
        if (!target.classList.contains('showBtn')) { return; }
        toggleDisplay(target, target.nextElementSibling);
    });

    function toggleDisplay(target, element){
        if(element.style.display === 'none'){
            element.style.display = 'block';
            target.textContent = 'Hide status code';
        }else{
            element.style.display = 'none';
            target.textContent = 'Show status code';
        }
    }
});

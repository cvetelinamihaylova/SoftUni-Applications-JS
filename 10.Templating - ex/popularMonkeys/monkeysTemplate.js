import monkeys from './monkeys.js';

window.addEventListener('load', async () => {
    const container = document.getElementsByTagName('section')[0];

    const templateString = await fetch('./templates/main.hbs').then(res => res.text());
    const templatePartialString = await fetch('./templates/monkey.hbs').then(res => res.text());

    Handlebars.registerPartial('monkey', templatePartialString)
    const template = Handlebars.compile(templateString);
    const html = template({ monkeys });
    container.innerHTML = html;
    container.addEventListener('click', function (e) {
        const target = e.target;
        if (target.tagName !== 'BUTTON') { return; }
        toggleDisplay(target.nextElementSibling);
    })

    function toggleDisplay(element) {
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
});
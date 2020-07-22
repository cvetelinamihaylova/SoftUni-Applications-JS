(function () {
    const appEl = document.getElementById('app');

    function init() {
        Promise.all([
            fetch('./templates/contact.hbs').then(res => res.text()),
            fetch('./templates/contact-card.hbs').then(res => res.text()),
            fetch('./contacts.json').then(res => res.json()),
        ]).then(([contactTemplate, contactCardTemplate, contacts]) => {
            Handlebars.registerPartial('contact', contactCardTemplate);
            const template = Handlebars.compile(contactTemplate);
            appEl.innerHTML = template({ contacts });
            const contactsEl = appEl.querySelector('#contacts');
            contactsEl.addEventListener('click', function(e){
                if(!e.target.classList.contains('detailsBtn')){return;}
                const detailsEl = e.target.parentElement.querySelector('.details');
                if(detailsEl.classList.contains('hidden')){
                    detailsEl.classList.remove('hidden');
                }else{
                    detailsEl.classList.add('hidden');
                }
            })
        })
    };

    init();
})();
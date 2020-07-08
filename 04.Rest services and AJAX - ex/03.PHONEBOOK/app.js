function attachEvents() {
    const baseUrl = 'http://localhost:3000/phonebook'
    const html = {
        btnLoad: () => document.querySelector('#btnLoad'),
        btnCreate: () => document.querySelector('#btnCreate'),
        personInput: () => document.querySelector('#person'),
        phoneInput: () => document.querySelector('#phone'),
        phonebookUl: () => document.querySelector('#phonebook'),
    };

    html.btnCreate().addEventListener('click', createFn);
    html.btnLoad().addEventListener('click', loadFn);


    function createFn() {

        const person = html.personInput().value;
        const phone = html.phoneInput().value;

        const data = { person, phone };


        fetch(baseUrl + '.json', {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
        html.personInput().value = '';
        html.phoneInput().value = '';
        loadFn();

    };
    function loadFn() {
        html.phonebookUl().textContent = '';
        fetch(baseUrl)
            .then((res) => res.json())
            .then((data) => {
                Object.keys(data).forEach((key) => {
                    const liEl = document.createElement('li');
                    const btnDelete = document.createElement('button');
                    btnDelete.textContent = 'Delete';
                    btnDelete.id = key;
                    btnDelete.addEventListener('click', deleteFn);
                    liEl.textContent = `${data[key].person}:${data[key].phone}`;
                    html.phonebookUl().appendChild(liEl);
                    liEl.appendChild(btnDelete);

                })
            })
    }
    function deleteFn(e) {
        const url = `${baseUrl}/${e.target.id}.json`;
        fetch(url, {
            method: "DELETE"
        })
            .then((res) => console.log(res))
            .catch((err) => {
                const message = err.message;
                console.log(message)
                console.log(err)
            })

        e.target.parentElement.remove();
        //loadFn();
    }

}

attachEvents();
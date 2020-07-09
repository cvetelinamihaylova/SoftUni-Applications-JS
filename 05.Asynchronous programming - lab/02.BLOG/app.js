const html = {
    btnLoadPosts() { return document.querySelector('#btnLoadPosts') },
    btnViewPost() { return document.querySelector('#btnViewPost') },
    selectEl() { return document.querySelector('#posts') },
    optionsEl() { return document.querySelectorAll('option') },
    postTitleEl() { return document.querySelector('#post-title') },
    postBodyEl() { return document.querySelector('#post-body') },
    postCommentsEl() { return document.querySelector('#post-comments') },

}
const rootUrl = 'https://blog-apps-c12bf.firebaseio.com/posts'
function attachEvents() {
    html.btnLoadPosts().addEventListener('click', function () {
        fetch(rootUrl + '.json')
            .then(res => res.json())
            .then(data => {
                Object.keys(data).forEach(key => {
                    const optionEl = document.createElement('option');
                    optionEl.value = key;
                    optionEl.textContent = data[key].title;
                    html.selectEl().appendChild(optionEl);
                });
            })
    });
    html.btnViewPost().addEventListener('click', function () {
        html.postCommentsEl().textContent = '';

        const id = Array.from(html.optionsEl()).filter(x => x.selected)[0].value;
        fetch(`${rootUrl}/${id}.json`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                html.postTitleEl().textContent = data.title;
                html.postBodyEl().textContent = data.body;
                if (!data.comments) { return; }
                Object.keys(data.comments).forEach(key => {
                    const liEl = document.createElement('li');
                    liEl.textContent = data.comments[key].text;
                    html.postCommentsEl().appendChild(liEl);
                })
            })
    })
}

attachEvents();
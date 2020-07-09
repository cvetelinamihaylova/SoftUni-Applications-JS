const html = {
    inputName() { return document.querySelector('#username') },
    inputRepo() { return document.querySelector('#repo') },
    ulCommits() { return document.querySelector('#commits') },
};

function loadCommits() {
    html.ulCommits().textContent = '';
    const username = html.inputName().value;
    const repo = html.inputRepo().value;

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
        .then((res) => {
            if (res.status !== 200) {
                const liEl = document.createElement('li');
                liEl.textContent = `Error: ${res.status} (${res.statusText})`;
                html.ulCommits().appendChild(liEl);
            } else {
                return res.json()
            }
        })
        .then((data) => {
            data.forEach((obj) => {
                const liEl = document.createElement('li');
                liEl.textContent = `${obj.commit.author.name}: ${obj.commit.message}`;
                html.ulCommits().appendChild(liEl);
            });
        });
}
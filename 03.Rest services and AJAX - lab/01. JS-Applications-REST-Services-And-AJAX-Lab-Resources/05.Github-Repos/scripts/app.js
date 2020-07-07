const ulContainer = document.querySelector('#repos');
const usernameEl = document.querySelector('#username');

function loadRepos() {
	ulContainer.textContent = '';

	const username = usernameEl.value;
	const url = `https://api.github.com/users/${username}/repos`;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			if (data) {
				data.forEach(({ full_name, html_url }) => {
					const liEl = document.createElement('li');
					const aEl = document.createElement('a');
					aEl.setAttribute('href', html_url);
					aEl.textContent = full_name;
					liEl.appendChild(aEl);

					ulContainer.appendChild(liEl);
				})
			}
		})
		.catch(console.error)
}
import { showLoading, hideLoading } from './notifications.js'

function getUrl(endpoint) {
    const apiKey = 'FF55686F-18D3-4A40-86EB-20399E32AFD1';
    const appId = 'C5C4A96B-FB85-BB4E-FF10-26E13F93B200';
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
};

const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies'
}
function getToken() {
    const token = localStorage.getItem('userToken');
    if (!token) { throw new Error('User is not logged-in!') }
    return token;
}
async function get(endpoint) {
    showLoading();
    const url = getUrl(endpoint);
    const token = getToken();
    const options = {};
    options.headers = {
        'Content-Type': 'application/json',
        'user-token': token
    }
    const response = await fetch(url, options);
    hideLoading();
    return response.json();
}
async function post(endpoint, body, method) {
    showLoading();
    const url = getUrl(endpoint);
    const token = getToken();
    const options = {};
    options.headers = {
        'user-token': token
    }
    const response = await fetch(url, options);
    hideLoading();
    return response.json();
}
export async function register(username, password) {
    showLoading();
    const url = getUrl(endpoints.REGISTER);
    const response = (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })).json();
    hideLoading();
    return response;
};
export async function login(username, password) {
    showLoading();
    const url = getUrl(endpoints.LOGIN);
    const result = await (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username, password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);
    localStorage.setItem('isLoggedIn', true);

    hideLoading();

    return result;
};
export async function logout() {
    showLoading();
    const url = getUrl(endpoints.LOGOUT);
    const token = localStorage.getItem('userToken');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    });
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');

    hideLoading();
    console.log(response)
    return response;
};
export async function getAllMovies(search) {
    showLoading();
    const token = getToken();
    let url = getUrl(endpoints.MOVIES);
    let response;
    if (!search) {
        response = (await fetch(url, {
            headers: {
                'user-token': token
            }
        })).json();
    } else {
        url = getUrl(endpoints.MOVIES + `?where=genres%20LIKE%20%27%25${search}%25%27`)
        response = (await fetch(url, {
            headers: {
                'user-token': token
            }
        })).json();
    }

    hideLoading();
    return response;
};
export async function getMovieById(objectId) {
    showLoading();
    const token = getToken();
    const url = getUrl(`${endpoints.MOVIES}/${objectId}`);
    const response = (await fetch(url, {
        headers: {
            'user-token': token
        }
    })).json();
    hideLoading();
    return response;
};
export async function getMovieByOwner(ownerId) {
    showLoading();

    const token = getToken();
    const url = getUrl(`${endpoints.MOVIES}?where=ownerId%3D%27${ownerId}%27`);
    const response = (await fetch(url, {
        headers: {
            'user-token': token
        }
    })).json();

    hideLoading();
    return response;
};
export async function createMovie(movie) {
    showLoading();

    const token = getToken();
    const url = getUrl(endpoints.MOVIES);

    const response = (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();

    hideLoading();
    return response;
};
export async function editMovie(objectId, updatedMovie) {
    showLoading();

    const token = getToken();
    const url = getUrl(`${endpoints.MOVIES}/${objectId}`);

    const response = (await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedMovie)
    })).json();

    hideLoading();
    return response;
};
export async function deleteMovie(objectId) {
    showLoading();

    const token = getToken();
    const url = getUrl(`${endpoints.MOVIES}/${objectId}`);

    const response = (await fetch(url, {
        method: 'DELETE',
        headers: {
            'user-token': token
        }
    })).json();
    hideLoading();
    return response;
};
export async function buyTicket(movie) {
    const newTickets = movie.availableTickets - 1;
    const objectId = movie.objectId;

    return editMovie(objectId, { availableTickets: newTickets });
};


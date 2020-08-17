import { get, post, del, put } from './api.js'


const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    DATA: 'data/movies'
}

export async function register(email, password) {
    //check equality of the passwords
    return await post(endpoints.REGISTER, { email, password });
};

export async function login(email, password) {

    const response = await post(endpoints.LOGIN, { login: email, password });

    localStorage.setItem('userToken', response['user-token']);
    localStorage.setItem('email', response.email);
    localStorage.setItem('userId', response.objectId);
    localStorage.setItem('isLoggedIn', true);

    return response;
};


export async function logout() {
    const response = await get(endpoints.LOGOUT, true)
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');

    return response;
};

export async function getAllData(search) {
    let response;
    if (!search) {
        response = await get(endpoints.DATA, false);
    } else {
        response = await get(endpoints.DATA + `?where=title%20LIKE%20%27%25${search}%25%27`, false);
    }

    return response;
};
export async function getDataById(objectId) {

    return await get(`${endpoints.DATA}/${objectId}`, false);
};
export async function getDataByOwner(ownerId) {
    const response = await get(`${endpoints.DATA}?where=ownerId%3D%27${ownerId}%27`)
    return response;
};
export async function createData(data) {
    const response = await post(endpoints.DATA, data);

    return response;
};
export async function editData(objectId, updatedData) {
    const response = await put(`${endpoints.DATA}/${objectId}`, updatedData)
    return response;
};
export async function deleteData(objectId) {
    const response = await del(`${endpoints.DATA}/${objectId}`)
    return response;
};
export async function likeMovie(movie, newPersonLiked) {
    const peopleLiked = movie.peopleLiked;
    const objectId = movie.objectId;

    return editData(objectId, { peopleLiked: [...peopleLiked, newPersonLiked] });
};

// export function checkResponseFromDB(response) {
//     //should be processed in try catch;
//     if (response.code) {
//         showError(response.message);
//         throw new Error(response.message)
//     }
//     return response;
// }
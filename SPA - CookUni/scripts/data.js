// import { showLoading, hideLoading, showError } from './notifications.js'
// import {API} from './api.js'
import { get, post, del, put } from './api.js'

// const api = new API(
//     '7CC8E473-67C0-4B72-B4A7-4DC21739AA55', 
//     '0D7EBD95-2B7F-C32F-FF30-3AA436C9B500',
//     showLoading,
//     hideLoading
//     );
const endpoints = {
    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    DATA: 'data/books' //can be different
}

export async function register(data) {
    //check equality of the passwords
    //showLoading();
    //hideLoading();
    return await post(endpoints.REGISTER, data);
};

export async function login(username, password) {
    //showLoading();

    const response = await post(endpoints.LOGIN, { login: username, password });

    localStorage.setItem('userToken', response['user-token']);
    localStorage.setItem('username', response.username);
    localStorage.setItem('userId', response.objectId);
    //localStorage.setItem('isLoggedIn', true);

    //hideLoading();

    return response;
};


export async function logout() {
    //showLoading();
    const response = await get(endpoints.LOGOUT, true)
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    //localStorage.removeItem('isLoggedIn');

    // hideLoading();
    return response;
};

export async function getAllData(search) {
    //showLoading();
    let response;
    if (!search) {
        response = await get(endpoints.DATA, false);
    } else {
        response = await get(endpoints.DATA + `?where=${criteria}%20LIKE%20%27%25${search}%25%27`, false);
    }

    return response;
};
export async function getDataById(objectId) {

    return await get(`${endpoints.DATA}/${objectId}`, false);
};
export async function getDataByOwner(ownerId) {
    //showLoading();
    const response = await get(`${endpoints.DATA}?where=ownerId%3D%27${ownerId}%27`)
    // hideLoading();
    return response;
};
export async function createData(data) {
    // showLoading();
    const response = await post(endpoints.DATA, data);

    //hideLoading();
    return response;
};
export async function editData(objectId, updatedData) {
    //showLoading();
    const response = await put(`${endpoints.DATA}/${objectId}`, updatedData)
    //hideLoading();
    return response;
};
export async function deleteData(objectId) {
    //showLoading();
    const response = await del(`${endpoints.DATA}/${objectId}`)
    // hideLoading();
    return response;
};
// export async function buyTicket(movie) {
//     const newTickets = movie.availableTickets - 1;
//     const objectId = movie.objectId;

//     return editMovie(objectId, { availableTickets: newTickets });
// };

export function checkResponseFromDB(response) {
    //should be processed in try catch;
    if (response.code) {
        showError(response.message);
        throw new Error(response.message)
    }
    return response;
}
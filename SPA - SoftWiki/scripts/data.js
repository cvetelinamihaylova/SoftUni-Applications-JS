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
    DATA: 'data/articles' //can be different
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
    //localStorage.setItem('isLoggedIn', true);

    return response;
};


export async function logout() {
    const response = await get(endpoints.LOGOUT, true)
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    //localStorage.removeItem('isLoggedIn');

    return response;
};

export async function getAllData(search) {
    let response;
    if (!search) {
        response = await get(endpoints.DATA, false);
    } else {
        response = await get(endpoints.DATA +`?where=ownerId%20LIKE%20%27%25${search}%25%27`, false);
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
// export async function buyTicket(movie) {
//     const newTickets = movie.availableTickets - 1;
//     const objectId = movie.objectId;

//     return editMovie(objectId, { availableTickets: newTickets });
// };


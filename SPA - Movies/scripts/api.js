//implement with notifications
 //import { showInfo } from './notifications.js'

//functions implementation

function getUrl(endpoint) {
    const apiKey = '542B45FE-699F-4899-A765-B64475FAECCF';
    const appId = 'D730272C-5902-AFA1-FFBA-F3F5616A5700';
    return `https://api.backendless.com/${appId}/${apiKey}/${endpoint}`;
};
//make headers
function constructHeaders(method, body, headers) {
    const options = { headers: headers || {} };
    const token = localStorage.getItem('userToken');
    if (token !== null) {
        options.headers['user-token'] = token;
    }
    if (body !== null) {
        options.body = JSON.stringify(body)
    }
    options.method = method;

    return options;
}
export async function post(endpoint, body) {
    //showLoading();
    const options = constructHeaders('POST', body, { 'Content-Type': 'application/json' });
    const response = await fetch(getUrl(endpoint), options);
    //hideLoading();
    return response.json();
}
export async function put(endpoint, body) {
    //showLoading();
    const options = constructHeaders('PUT', body, { 'Content-Type': 'application/json' });
    const response = await fetch(getUrl(endpoint), options);
    //hideLoading();
    return response.json();
}
export async function del(endpoint) {
    //showLoading();
    const options = constructHeaders('DELETE', null);
    const response = await fetch(getUrl(endpoint), options);
    //hideLoading();
    return response.json();
}
export async function get(endpoint, isLogout) {
    //showLoading();
    let options;
    if (isLogout) {
        options = constructHeaders('GET', null);

    } else {
        options = constructHeaders('GET', null, { 'Content-Type': 'application/json' });
    }
    const response = await fetch(getUrl(endpoint), options);
   // hideLoading();
    return isLogout ? response : response.json();
}

//implement with notifications
 //import { showInfo } from './notifications.js'

 //class implementation
// export class API {
//     constructor(apiKey, appId, showLoading, hideLoading) {
//         this.apiKey = apiKey;
//         this.appId = appId;
//         this.showLoading = () => {
//             if (showLoading) {
//                 showLoading();
//             }
//         }
//         this.hideLoading = () => {
//             if (hideLoading) {
//                 hideLoading();
//             }
//         }
//     }

//     getUrl(endpoint) {
//         return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
//     };
//     constructHeaders(method, body, headers) {
//         const options = { headers: headers || {} };
//         const token = localStorage.getItem('userToken');
//         if (token !== null) {
//             options.headers['user-token'] = token;
//         }
//         if (body !== null) {
//             options.body = JSON.stringify(body)
//         }
//         options.method = method;

//         return options;
//     }
//     async post(endpoint, body) {
//         this.showLoading();
//         const options = constructHeaders('POST', body, { 'Content-Type': 'application/json' });
//         const response = await fetch(getUrl(endpoint), options);
//         this.hideLoading();
//         return response.json();
//     }
//     async put(endpoint, body) {
//         this.showLoading();
//         const options = constructHeaders('PUT', body, { 'Content-Type': 'application/json' });
//         const response = await fetch(getUrl(endpoint), options);
//         this.hideLoading();
//         return response.json();
//     }
//     async del(endpoint) {
//         this.showLoading();
//         const options = constructHeaders('DELETE', null);
//         const response = await fetch(getUrl(endpoint), options);
//         this.hideLoading();
//         return response.json();
//     }
//     async get(endpoint, isLogout) {
//         this.showLoading();
//         let options;
//         if (isLogout) {
//             options = constructHeaders('GET', null);

//         } else {
//             options = constructHeaders('GET', null, { 'Content-Type': 'application/json' });
//         }
//         const response = await fetch(getUrl(endpoint), options);
//         this.hideLoading();
//         return isLogout ? response : response.json();
//     }
// }


//functions implementation

function getUrl(endpoint) {
    const apiKey = '3CF3587D-ED05-482B-AA01-12951194683C';
    const appId = 'D6C49D88-95D5-DDF0-FF5B-C12B6423F300';
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

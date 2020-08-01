function getUrl(endpoint) {
    const appId = '82CF315F-1804-262B-FF61-C1C8DCEBF700';
    const apiRestKey = '5C71CCFE-C699-4DED-8BB6-CD0C211797BF';
    return `https://api.backendless.com/${appId}/${apiRestKey}/${endpoint}`
};

export async function login(username, password) {
    const url = getUrl('users/login');
    return (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();
}
export async function register(username, password) {
    const url = getUrl('users/register');
    return (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
}
export async function logout() {
    const token = localStorage.getItem('userToken');
    if (!token) {
        throw new Error('User is not logged in');
    }
    const url = getUrl('users/logout');
    return await fetch(url, {
        method: 'GET',
        headers: {
            'user-token': token
        }
    });
}

async function setTeamId(userId, teamId, token) {
    const url = getUrl(`data/Users/${userId}`);
    return (await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify({ teamId })
    })).json();
}
export async function create(team, token) {
    const url = getUrl('data/Teams');
    const response = await (await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(team)
    })).json();

    if (response.code) { alert(response.message); return; }
     const updatedData = await setTeamId(response.ownerId, response.objectId, token);
       if (updatedData.code) { alert(updatedData.message); return; }

        console.log(updatedData)
    return response;
}

export async function getOneTeam(id) {
    const url = getUrl(`data/Teams/${id}`);
    return (await fetch(url)).json()
}
export async function getAllTeams() {
    const url = getUrl('data/Teams');
    return (await fetch(url)).json()
}
function getUrl(endpoint) {
    return `https://fisher-game.firebaseio.com/${endpoint}.json`;
}

export async function postData(data) {
    try {
        return await fetch(getUrl('catches'), {
            "method": "POST",
            "Content-Type": "application/json",
            "body": JSON.stringify(data)
        }).then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
}

export async function getData() {
    try {
        return await fetch(getUrl('catches')).then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
}

export async function deleteData(id) {
    try {
        return await fetch(getUrl(`catches/${id}`), {
            method: "DELETE"
        })
            .then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
}

export async function putData(id, data) {
    try {
        return await fetch(getUrl(`catches/${id}`), {
            method: "PUT",
            "Content-Type": "application/json",
            body: JSON.stringify(data)
        })
            .then(res => res.json())
    } catch (error) {
        alert(error.message);
    }
}
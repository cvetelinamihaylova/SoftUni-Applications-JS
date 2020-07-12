const appId = '0D7EBD95-2B7F-C32F-FF30-3AA436C9B500';
const apiKey = '7CC8E473-67C0-4B72-B4A7-4DC21739AA55';

function getUrl(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;
}

export async function getBooks() {
    const response = await fetch(getUrl('books'));
    const data = await response.json();
    return data;
}

export async function createBook(book) {
    const response = await fetch(getUrl('books'), {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(book)
    });
    const data = await response.json();
    return data;
}

export async function updateBook(book) {
    const id = book.objectId;
    const response = await fetch(getUrl(`books/${id}`), {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(book)
    });
    const data = await response.json();
    return data;
}

export async function deleteBook(id) {
    const response = await fetch(getUrl(`books/${id}`), {
        method: "DELETE"
    });
    const data = await response.json();
    return data;
}
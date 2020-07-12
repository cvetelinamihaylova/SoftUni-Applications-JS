const appId = '0D7EBD95-2B7F-C32F-FF30-3AA436C9B500';
const apiKey = '7CC8E473-67C0-4B72-B4A7-4DC21739AA55';

function getUrl(endpoint) {
    return `https://api.backendless.com/${appId}/${apiKey}/data/${endpoint}`;
}

export async function getData(){
    const response = await fetch(getUrl("students"));
    return await response.json();
}


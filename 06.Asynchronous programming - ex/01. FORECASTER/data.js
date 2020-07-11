
export async function getInfoLocation(name) {

    const data = await fetch('https://judgetests.firebaseio.com/locations.json').then(res => res.json());

    return data.find(o => o.name.toLowerCase() == name.toLowerCase());

}
export async function getTodayData(code) {
    return await fetch(`https://judgetests.firebaseio.com/forecast/today/${code}.json`).then(res => res.json());
}
export async function getUpcomingData(code) {
    return await fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`).then(res => res.json());
}
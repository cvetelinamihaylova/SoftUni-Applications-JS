const stopIdInput = document.querySelector('#stopId');
const stopNameDiv = document.querySelector('#stopName');
const busesUl = document.querySelector('#buses');

function getInfo() {
    stopNameDiv.textContent = '';
    busesUl.textContent = '';
    const stopId = stopIdInput.value;
    const url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`
    console.log(url)
    fetch(url)
        .then((data) => data.json())
        .then((data) => {
            if(data.error){
                stopNameDiv.textContent = 'ERROR'
                return;
            }
            stopNameDiv.textContent = data.name;
            for (const key in data.buses) {
                    const liEl = document.createElement('li');
                    liEl.textContent = `Bus ${key} arrives in ${data.buses[key]}`
                    busesUl.appendChild(liEl)
                }
            console.log(data)
        })
       
}
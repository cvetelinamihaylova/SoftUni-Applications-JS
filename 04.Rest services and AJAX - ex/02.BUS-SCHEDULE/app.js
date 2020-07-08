
function solve() {
    const infoSpan = document.getElementsByClassName('info')[0];
    const btnArrive = document.querySelector('#arrive');
    const btnDepart = document.querySelector('#depart');
    const rootUrl = 'https://judgetests.firebaseio.com/schedule/'
    let currentStopId = 'depot';
    let currentStopName = '';
    function depart() {
        const url = `${rootUrl}${currentStopId}.json`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (!data) {
                    infoSpan.textContent = 'Error';
                    btnDepart.disabled = true;
                    btnArrive.disabled = true;
                    return;
                }
                currentStopName = data.name;
                currentStopId = data.next;
                infoSpan.textContent = `Next stop ${currentStopName}`
                btnDepart.disabled = true;
                btnArrive.disabled = false;
            })
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${currentStopName}`
        btnDepart.disabled = false;
        btnArrive.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
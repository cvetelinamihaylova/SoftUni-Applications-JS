
const infoBoxEl = document.querySelector('#infoBox');
const errorBoxEl = document.querySelector('#errorBox');

let counter = 0;

export function showInfo(message) {
    counter++;
    infoBoxEl.style.display = 'block';
    infoBoxEl.children[0].textContent = message;
    setTimeout(hideInfo, 3000);
}

export function showError(message) {
    counter++;
    errorBoxEl.style.display = 'block';
    errorBoxEl.children[0].textContent = message;
    setTimeout(hideError, 3000);
}

function hideInfo(element) {
    counter--;
    if (counter === 0) {
        infoBoxEl.style.display = 'none';
    }

}
function hideError(element) {
    counter--;
    if (counter === 0) {
        errorBoxEl.style.display = 'none';
    }
}



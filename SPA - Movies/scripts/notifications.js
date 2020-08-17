const elements = {
    info: document.getElementById('successBox'),
    error: document.getElementById('errorBox'),
}

export function showInfo(message) {
    elements.info.textContent = message;
    elements.info.parentNode.style.display = 'block';
    setTimeout(hideInfo, 2000);
}
export function showError(message) {
    elements.error.textContent = message;
    elements.error.parentNode.style.display = 'block';
    setTimeout(hideError, 2000);
}

function hideInfo() {
    elements.info.parentNode.style.display = 'none';
}
function hideError() {
    elements.error.parentNode.style.display = 'none';
}



const elements = {
    info: document.getElementById('infoBox'),
    error: document.getElementById('errorBox'),
    loading: document.getElementById('loadingBox')
}
document.addEventListener('click', hideInfo);
document.addEventListener('click', hideError);

export function showInfo(message) {
    elements.info.children[0].textContent = message;
    elements.info.style.display = 'block';
    setTimeout(hideInfo, 3000);
}
export function showError(message) {
    elements.error.children[0].textContent = message;
    elements.error.style.display = 'block';
}
let request = 0;
export function showLoading() {
    request++;
    elements.loading.style.display = 'block';
}
export function hideLoading() {
    request--;
    if (request == 0) {
        elements.loading.style.display = 'none';
    }
}
function hideInfo() {
    elements.info.style.display = 'none';
}
function hideError() {
    elements.error.style.display = 'none';
}

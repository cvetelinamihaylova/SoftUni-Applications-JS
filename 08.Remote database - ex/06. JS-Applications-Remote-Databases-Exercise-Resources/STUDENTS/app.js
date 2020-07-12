import { getData } from './data.js';
import el from './dom.js';

window.addEventListener('load', async () => {
    const tbodyEl = document.querySelector('#results > tbody');
    tbodyEl.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';
    const data = await getData();
    tbodyEl.innerHTML = '';
    data.sort((a, b) => a.ID - b.ID).forEach(obj => {
        const trEl = renderTr(obj);
        tbodyEl.appendChild(trEl);
    });
    const doneEl =el('tr','');
    const tdEl = el('td', 'DONE!');
    tdEl.setAttribute('colspan', '5');
    doneEl.appendChild(tdEl);
    tbodyEl.appendChild(doneEl);
    
    function renderTr(obj){
        return el('tr',[
            el('td', obj.ID),
            el('td', obj.firstName),
            el('td', obj.lastName),
            el('td', obj.facultyNumber),
            el('td', obj.grade)
        ])
    }
})

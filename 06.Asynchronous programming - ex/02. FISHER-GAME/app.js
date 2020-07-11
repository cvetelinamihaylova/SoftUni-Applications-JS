import { postData, getData, deleteData, putData } from './data.js';
import el from './dom.js';

window.addEventListener('load', () => {
    const anglerInput = document.querySelector('#addForm>input.angler');
    const weightInput = document.querySelector('#addForm>input.weight');
    const speciesInput = document.querySelector('#addForm>input.species');
    const locationInput = document.querySelector('#addForm>input.location');
    const baitInput = document.querySelector('#addForm>input.bait');
    const captureTimeInput = document.querySelector('#addForm>input.captureTime');
    const divCatches = document.querySelector('#catches');

    document.querySelector('#addForm>button.add').addEventListener('click', addData);
    document.querySelector('.load').addEventListener('click', loadData);

    function addData() {
        const angler = anglerInput.value;
        const weight = weightInput.value;
        const species = speciesInput.value;
        const location = locationInput.value;
        const bait = baitInput.value;
        const captureTime = captureTimeInput.value;

        const data = { angler, weight, species, location, bait, captureTime };
        postData(data);
        anglerInput.value = '';
        weightInput.value = '';
        speciesInput.value = '';
        locationInput.value = '';
        baitInput.value = '';
        captureTimeInput.value = '';
    };

    async function loadData() {
        const data = await getData();
        if (!data) { alert('No catches...'); return; }
        Object.keys(data).forEach(key => {
            const fishObj = data[key];
            const divEl = createDiv(key, fishObj);
            const btnUpdate = el('button', 'UPDATE', { className: 'update' });
            const btnDelete = el('button', 'DELETE', { className: 'delete' });
            btnUpdate.addEventListener('click', updateData);
            btnDelete.addEventListener('click', removeData);
            divEl.appendChild(btnUpdate);
            divEl.appendChild(btnDelete);
            divCatches.appendChild(divEl);
            function updateData() {
                const angler = anglerInput.value;
                const weight = weightInput.value;
                const species = speciesInput.value;
                const location = locationInput.value;
                const bait = baitInput.value;
                const captureTime = captureTimeInput.value;

                const updatedData = { angler, weight, species, location, bait, captureTime };
                putData(key, updatedData)
                btnUpdate.textContent = "CHANGES SAVED!";
                btnUpdate.className = 'updated';
                setTimeout(()=>{
                    btnUpdate.textContent = "UPDATE";
                    btnUpdate.classList.remove('updated');
                }, 3000)
               
            }
            function removeData() {
                deleteData(key);
                divEl.remove();
            }

        });

    }

    function createDiv(id, dataObj) {
        return el('div', [
            el('label', 'Angler'),
            el('input', '', { type: 'text', className: 'angler', value: dataObj.angler }),
            el('hr', ''),
            el('label', 'Weight'),
            el('input', '', { type: 'text', className: 'weight', value: dataObj.weight }),
            el('hr', ''),
            el('label', 'Species'),
            el('input', '', { type: 'text', className: 'species', value: dataObj.species }),
            el('hr', ''),
            el('label', 'Location'),
            el('input', '', { type: 'text', className: 'location', value: dataObj.location }),
            el('hr', ''),
            el('label', 'Bait'),
            el('input', '', { type: 'text', className: 'bait', value: dataObj.bait }),
            el('hr', ''),
            el('label', 'Capture Time'),
            el('input', '', { type: 'text', className: 'captureTime', value: dataObj.captureTime }),
            el('hr', ''),
        ], { className: 'catch', "data-id": id })
    }
})
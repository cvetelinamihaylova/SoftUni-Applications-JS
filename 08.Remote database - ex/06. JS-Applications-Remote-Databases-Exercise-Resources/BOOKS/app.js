import { getBooks, updateBook, deleteBook, createBook } from './data.js'
import el from './dom.js'

window.addEventListener('load', () => {

    const booksContainer = document.querySelector('tbody');
    const input = {
        author: document.querySelector('#author'),
        isbn: document.querySelector('#isbn'),
        title: document.querySelector('#title'),
    }
    const submitBtn = document.querySelector('form>button');
    const createdLabel = document.querySelector('#createdMessage');
    async function loadBooksHandler() {
        booksContainer.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
        const data = await getBooks();
        booksContainer.innerHTML = '';
        data
            .sort((a, b) => a.title.localeCompare(b.title))
            .forEach(bookObj => booksContainer.appendChild(renderTr(bookObj)));

    }
    async function createBookHandler(e) {
        e.preventDefault();
       
        if (validateInput(input)) {
            alert('All fields are required!')
            return;
        }
        const author = input.author.value;
        const title = input.title.value;
        const isbn = input.isbn.value;

        const data = { author, title, isbn };

        try {
            toggleInput(false, ...Object.values(input), submitBtn)
            const createdBook = await createBook(data);
            booksContainer.appendChild(renderTr(createdBook))
            createdLabel.classList.remove('hidden');
            Object.entries(input).forEach(([k, v]) => v.value = '');
            setTimeout(() => {
                createdLabel.classList.add('hidden');
            }, 1000);
        } catch (error) {
            console.error(error)
        } finally {
            toggleInput(true, ...Object.values(input), submitBtn)
        }

    }
    function toggleInput(active, ...list){
        list.forEach(l=>l.disabled = !active)
    }
    function renderTr(bookObj) {
        const btnDelete = el('button', 'Delete');
        const btnEdit = el('button', 'Edit');
        btnDelete.addEventListener('click', deleteHandler);
        btnEdit.addEventListener('click', editHandler);
        let elTr = el('tr', [
            el('td', bookObj.title),
            el('td', bookObj.author),
            el('td', bookObj.isbn),
            el('td', [
                btnEdit,
                btnDelete
            ])
        ]);
        async function deleteHandler() {
            try {
                btnDelete.disabled = true;
                btnDelete.textContent = 'Please wait...';
                await deleteBook(bookObj.objectId);
                elTr.remove();

            } catch (error) {
                btnDelete.disabled = false;
                btnDelete.textContent = 'Delete';
                console.error(error)
            }
        }
        async function editHandler() {
            const btnCancel = el('button', 'Cancel');
            const btnConfirm = el('button', 'Confirm');

            const edit = {
                title: el('input', '', { type: 'text', value: bookObj.title }),
                author: el('input', '', { type: 'text', value: bookObj.author }),
                isbn: el('input', '', { type: 'text', value: bookObj.isbn }),
            }
            const editor = el('tr', [
                el('td', edit.title),
                el('td', edit.author),
                el('td', edit.isbn),
                el('td', [
                    btnCancel,
                    btnConfirm
                ])
            ]);
            btnConfirm.addEventListener('click', async ()=>{
              
                if (validateInput(edit)) {
                    alert('All fields are required!')
                    return;
                }
                const author = edit.author.value;
                const title = edit.title.value;
                const isbn = edit.isbn.value;
        
                const data = { author, title, isbn, objectId: bookObj.objectId };
        
                try {
                    toggleInput(false, ...Object.values(edit), btnConfirm, btnCancel)
                    const updatedBook = await updateBook(data);
                    booksContainer.replaceChild(renderTr(updatedBook), editor)
                } catch (error) {
                    console.error(error)
                    toggleInput(true, ...Object.values(edit), btnConfirm, btnCancel)
                } 
        
            })
            btnCancel.addEventListener('click', () => {
                booksContainer.replaceChild(elTr, editor);
            })
            booksContainer.replaceChild(editor, elTr);
        }
        return elTr
    }
    function validateInput(input){
        let isEmpty = false;
        Object.values(input).forEach(el => {
            if (el.value.length === 0) {
                el.classList.add('inputError');
                isEmpty = true;
            } else {
                el.classList.remove('inputError');
            }
        });
        return isEmpty;
    }
    document.querySelector('#loadBooks').addEventListener('click', loadBooksHandler);
    submitBtn.addEventListener('click', createBookHandler);

})
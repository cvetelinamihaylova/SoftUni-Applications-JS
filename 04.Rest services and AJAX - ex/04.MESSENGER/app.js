function attachEvents() {
    const baseUrl = 'http://localhost:3000/messenger';
    const html = {
        nameInput: () => document.querySelector('#author'),
        messageInput: () => document.querySelector('#content'),
        submitInput: () => document.querySelector('#submit'),
        refreshInput: () => document.querySelector('#refresh'),
        messagesTextArea: () => document.querySelector('#messages'),
    }

    function submitFn() {
        const author = html.nameInput().value;
        const content = html.messageInput().value;

        const data = { author, content };
        fetch(baseUrl, {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            })
        html.nameInput().value = '';
        html.messageInput().value = '';
    };
    function refreshFn(){
        fetch(baseUrl)
        .then((res)=>res.json())
        .then((data)=>{
            let res = '';
           Object.keys(data).forEach(key=>{
                res += `${data[key].author}: ${data[key].content}\n`;
           });
           html.messagesTextArea().textContent = res;
        })
    }
    html.submitInput().addEventListener('click', submitFn);
    html.refreshInput().addEventListener('click', refreshFn);
}

attachEvents();
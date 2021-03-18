let typingTimer;
let doneTypingInterval = 100;
let resultElement = document.getElementById('result');

const onKeyup = (element) => {
    resultElement.innerHTML = '';
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => doneTyping(element), doneTypingInterval);
}
const onKeyDown = (element) => {
    clearTimeout(typingTimer);
}

const doneTyping = (element) => {
    let html = '';
    if(element.value.trim() !== ''){
        renderElement();
        fetch(`/api/v1/search?q=${element.value}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    html = '';
                    html += '<ul>';
                    if (data.records !== null && data.records.length > 0) {
                        data.records.map((item) => {
                            if (typeof item.id !== 'undefined' && item.id !== '') {
                                html += `<li>${item.id}</li>`
                            }
                        })
                        html += '</ul>'
                    }else if(data.records === null){
                        html += `<li>No record found</li>`;
                    }
                    resultElement.innerHTML = html;
                    resultElement.style.display = 'block';
                }
            }).catch((error) => {
                console.log(error)
                renderElement(error.name);
        })
    }
    else if(element.value.trim() === ''){
        resultElement.style.display = 'none';
    }
}

const renderElement = (value) => {
    let html = '<ul>';
    html += `<li>${typeof value ==='undefined'? 'Searching ....' : value }</li>`;
    html += '</ul>'
    resultElement.innerHTML = html;
    resultElement.style.display = 'block';
}
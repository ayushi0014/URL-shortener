const form = document.querySelector('.form');
                    form.addEventListener('submit', event => {
                        event.preventDefault(); 
                        const input = document.querySelector('.url-input');
                        // console.log(input.value);
                        fetch('/url', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                url: input.value
                            })
                        }).then(response => {
                            if(!response.ok){
                                throw Error(response.statusText);
                            }
                            return response.text();
                        }).then(text => {
                            const response = document.querySelector('.response');
                            var pTag = document.createElement('p');
                            pTag.innerHTML = `<a href='${text}'>${text}</a>`
                            response.appendChild(pTag);
                        })
                    })
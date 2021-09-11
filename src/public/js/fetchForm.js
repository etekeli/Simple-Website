var form = document.getElementById('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(fetchPage,
        {
            body: formData,
            data: JSON.stringify(formData),
            contentType: 'application/json',
            method: 'post',
        }).then(function (response) {
        return response.text();
    }).then(function (text) {


        var obj = JSON.parse(text);
        if (Object.entries(obj).length === 0) {
            window.location = "/dashboard";
        }
        var list = document.createElement('ul');
        for (const element of obj) {
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(element.msg));
            list.appendChild(item);
        }
        document.getElementById("list").innerText = '';
        document.getElementById("list").appendChild(list);

    });
}, false);
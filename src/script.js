const PORT = process.env.PORT || 3000
const URL = process.env.URL || 'http://localhost'

function deleteTodo(id) {
    fetch(`${URL}:${PORT}/todos/${id}`, {
        method: 'DELETE'
    }).then((resp) => {
        // console.log(resp);
        loadTodos();
    })
    let element = document.getElementById(id);
    element.parentNode.removeChild(element);
}


const loadTodos = () => {
    fetch('${URL}:${PORT}:3000/todos', {
        method: 'GET'
    }).then((resp) => {
        resp.json().then((data) => {
            var parentElement = document.getElementById('mainArea');
            parentElement.innerHTML = '';
            for (let i = 0; i < data.length; i++) {
                var childElement = document.createElement('tr');
                childElement.setAttribute('id', `${data[i]['_id']}`);

                const grandChildElement1 = document.createElement('td');
                grandChildElement1.innerHTML = data[i]['title'];

                const grandChildElement2 = document.createElement('td');
                grandChildElement2.innerHTML = data[i]['description'];

                const grandChildElement3 = document.createElement('td');

                const greatgrandChildElement = document.createElement('button');
                greatgrandChildElement.setAttribute("onclick", "deleteTodo(" + `\"${data[i]['_id']}\"` + ")");
                greatgrandChildElement.innerHTML = 'Delete';

                grandChildElement3.appendChild(greatgrandChildElement);


                childElement.appendChild(grandChildElement1);
                childElement.appendChild(grandChildElement2);
                childElement.appendChild(grandChildElement3);

                parentElement.appendChild(childElement);
            }
        });
    })
}
document.addEventListener('DOMContentLoaded', function () {
    loadTodos();
});

function appendtodo(data) {
    // console.log(data['_id']);
    var parentElement = document.getElementById('mainArea');
    var childElement = document.createElement('tr');
    childElement.setAttribute('id', `${data['_id']}`);

    const grandChildElement1 = document.createElement('td');
    grandChildElement1.innerHTML = data.title;

    const grandChildElement2 = document.createElement('td');
    grandChildElement2.innerHTML = data.description;

    const grandChildElement3 = document.createElement('td');
    const greatgrandChildElement = document.createElement('button');
    greatgrandChildElement.setAttribute("onclick", "deleteTodo(" + `\"${data['_id']}\"` + ")");
    greatgrandChildElement.innerHTML = 'Delete';
    grandChildElement3.appendChild(greatgrandChildElement);


    childElement.appendChild(grandChildElement1);
    childElement.appendChild(grandChildElement2);
    childElement.appendChild(grandChildElement3);

    parentElement.appendChild(childElement);

}

const addTodo = () => {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

    fetch('${URL}:${PORT}/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resp) => {
        resp.json().then(appendtodo);
    })
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';

}

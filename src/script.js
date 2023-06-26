const loadTodos = () => {
    fetch('http://localhost:3000/todos', {
        method: 'GET'
    }).then((resp) => {
        resp.json().then((data) => {
            var parentElement = document.getElementById('mainArea');
            for (let i = 1; i <= Object.keys(data).length; i++) {
                var childElement = document.createElement('tr');

                const grandChildElement1 = document.createElement('td');
                grandChildElement1.innerHTML = data[i]['title'];

                const grandChildElement2 = document.createElement('td');
                grandChildElement2.innerHTML = data[i]['description'];

                const grandChildElement3 = document.createElement('td');
                const greatgrandChildElement = document.createElement('button');
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

function appendtodo(data){
    console.log(data);
    var parentElement = document.getElementById('mainArea');
    var childElement = document.createElement('tr');

    const grandChildElement1 = document.createElement('td');
    grandChildElement1.innerHTML = data.title;

    const grandChildElement2 = document.createElement('td');
    grandChildElement2.innerHTML = data.description;

    const grandChildElement3 = document.createElement('td');
    const greatgrandChildElement = document.createElement('button');
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

    fetch('http://localhost:3000/todos', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then((resp)=>{
        resp.json().then(appendtodo);
    })


}

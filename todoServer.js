const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path')

const app = express();
app.use(bodyParser.json());


let counter = 0; 
let readCounter = ()=>{
  let data = fs.readFileSync("dataObj.json",{encoding: 'utf-8', flag: 'r'});
  let dataObj = JSON.parse(data);
  counter = dataObj.counter;
}

readCounter();

const readWritefn = (file,key,value) => {
  fs.readFile(file,'utf-8',(err,data)=>{
    if (err) console.log(err);
    let obj = JSON.parse(data);
    obj[key]=(value);
    let json = JSON.stringify(obj);
    fs.writeFile(file, json, 'utf8',()=>{console.log("Values updated")});
  })
}

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post('/todos', (req,res)=>{
  const newTodo = req.body;
  readWritefn('todoList.json',counter,newTodo);
  readWritefn('dataObj.json',"counter",counter);
  counter += 1;
  res.sendStatus(201);
})

app.get('/todos',(req,res)=>{
  fs.readFile('todoList.json','utf-8',(err,data)=>{
    if (err) console.log(err);
    let obj = JSON.parse(data);
    let allObj = Object.values(obj);
    let json = JSON.stringify(allObj);
    res.send(json);
  })
})

app.get('/todos/:id',(req,res)=>{
  fs.readFile('todoList.json','utf-8',(err,data)=>{
    if (err) console.log(err);
    let obj = JSON.parse(data)
    if (!obj.hasOwnProperty(req.params.id)){
      res.sendStatus(404);
    }
    res.send(obj[req.params.id]);
  })
})

app.put('/todos/:id',(req,res)=>{
  const newTodo = req.body;
  fs.readFile('todoList.json','utf-8',(err,data)=>{
    if (err) console.log(err);
    let obj = JSON.parse(data);
    if (!obj.hasOwnProperty(req.params.id)){
      res.sendStatus(404);
    }
    obj[req.params.id] = newTodo;
    let json = JSON.stringify(obj);
    fs.writeFile('todoList.json', json, 'utf8',()=>{console.log("Values updated")});
    res.sendStatus(200);
  })
})

app.delete('/todos/:id',(req,res)=>{
  fs.readFile('todoList.json','utf-8',(err,data)=>{
    if (err) console.log(err);
    let obj = JSON.parse(data);
    if (!obj.hasOwnProperty(req.params.id)){
      res.sendStatus(404);
    }
    delete obj[req.params.id];
    let json = JSON.stringify(obj);
    fs.writeFile('todoList.json', json, 'utf8',()=>{console.log("Values updated")});
    res.sendStatus(200)
  })
})



app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000,()=>{
  console.log(`App Listening to Port 3000`)
})

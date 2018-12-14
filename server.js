var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
];

// GET /api/todos
app.get('/api/todos',function (req,res,nextFn){
    console.log(todoList)
    res.send(todoList)
})

// GET /api/todos/:id
app.get('/api/todos/:id',function (req,res,nextFn){
    var todoID = req.params.id
    let todoObj = todoList.find(obj => obj.id == todoID); // function (obj) {obj.id == todoID}
    console.log(todoObj)
    res.send(todoObj)
})

// POST /api/todos
app.post('/api/todos',function (req,res,nextFn){
    // Rule: Body should not include an id
    var maxID = 0
    for (var i = 0; i<todoList.length; i++){
        if (todoList[i].id >= maxID){
            maxID = todoList[i].id
        }
    }
    var todoObj = {
        id: maxID + 1,
        ...req.body
    }
    todoList.push(todoObj)
    console.log(todoList)
    res.send(todoObj)
})

// PUT /api/todos/:id
app.put('/api/todos/:id',function (req,res,nextFn){
    var todoID = req.params.id
    let todoObj = todoList.find(obj => obj.id == todoID);
    Object.assign(todoObj,req.body)
    console.log(todoList)
    res.send(todoObj)
})

// DELETE /api/todos/:id
app.delete('/api/todos/:id',function (req,res,nextFn){
    var todoID = req.params.id
    let todoObj = todoList.find(obj => obj.id == todoID); // not necessary, but this allows a response with the deleted item
    let todoIndex = todoList.findIndex(obj => obj.id == todoID); // index of object in the list array
    console.log(todoIndex)
    todoList.splice(todoIndex,1)
    console.log(todoList)
    res.send(todoObj)
})


app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})
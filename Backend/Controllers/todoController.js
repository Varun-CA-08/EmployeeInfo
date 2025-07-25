let todos=[];
let initialId = 0;

//getTodos
export const getTodos=(req,res)=>{
    console.log("hii");
    res.status(200).json({"todos":todos,"message":"Todos fetched successfully"});
};

//addTodo
export const addTodo = (req,res) => {
    const {title}=req.body;
    if(!title){
        res.status(400).json({"message":"Title is required"})
        return;
    }
    const newTodo = {
        id : initialId++,
        title : title,
        completed : false,
    }
    todos.push(newTodo);
    res.status(201).json({"message": "Todo added successfully!", "totdo": newTodo});
};

//deleteTodo
export const deleteTodo = (req,res) => {
    const {id} = req.params;
    const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
    if(todoIndex === -1) {
        res.status(404).json({"message": "todo not found"});
        return;
    }else{
        delete todos[todoIndex];
        res.status(200).json(todos);
    }
};

//updateTodo
export const updateTodo = (req,res) => {
    const {id} = req.params;
    const {title, completed} = req.body;

    const todoIndex = todos.findIndex((todo)=>todo.id === parseInt(id));
    if(todoIndex === -1) {
        res.status(404).json({"message": "Todo not found!"});
        return;
    }
    if(title) {
        todos[todoIndex].title = title; 
    }
    res.status(200).json(todos[todoIndex]);
};



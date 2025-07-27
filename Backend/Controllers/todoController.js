let todos=[];
let initialId = 0;

//getTodos
export const getTodos=(req,res)=>{
    console.log("hii");
    res.status(200).json(todos);
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
export const deleteTodo = (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ message: 'Todo not found' });
    return;
  }

  // ❌ Avoid using delete — instead use splice to remove from array
  todos.splice(todoIndex, 1);
  res.status(200).json({ message: 'Todo deleted successfully!' });
};


//updateTodo
export const updateTodo = (req, res) => {
  const { id, title, completed } = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ message: 'Todo not found!' });
    return;
  }

  if (title) todos[todoIndex].title = title;
  if (typeof completed === 'boolean') todos[todoIndex].completed = completed;

  res.status(200).json(todos[todoIndex]);
};

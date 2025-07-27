import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/todos';

export const getTodos=()=>axios.get(BASE_URL)
export const addTodo=(todo)=>axios.post(BASE_URL+"/addTodo", todo)
export const updateTodo=(todo)=>axios.put(BASE_URL+"/updateTodo", todo)
export const deleteTodo=(id)=>axios.delete(`${BASE_URL}/deleteTodo/${id}`)

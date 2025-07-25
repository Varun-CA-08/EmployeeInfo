import {Router} from 'express';
export const router = Router();
import {getTodos,addTodo,updateTodo,deleteTodo} from '../Controllers/todoController.js';

//get Todo
router.get('/', getTodos);

//add Todo
router.post('/addTodo', addTodo);

//delete todo
router.delete('/deleteTodo/:id', deleteTodo);

//update todo
router.put('/updateTodo/:id', updateTodo);

export const todoRoute = router;
// export default router;
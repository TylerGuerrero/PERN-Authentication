import express from 'express'

// Todo Controller
import { postTodo, getTodos, getSingleTodo, putTodo, deleteTodo } from '../../controller/todo/TodoController.js'

const { Router } = express
const router = Router({ caseSensitive: true, strict: true })

// create a todo 
router.post("/", postTodo)

// get all todos
router.get("/", getTodos)

// get a single todo
router.get("/:id", getSingleTodo)

// update a todo
router.put("/:id", putTodo)

// delete single todo
router.delete("/:id", deleteTodo)

export default router
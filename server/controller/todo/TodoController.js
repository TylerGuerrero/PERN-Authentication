// Client
import client from '../../config/DB.js'

// Todo Validation
import { todoValidation } from '../../validation/todo/TodoValidation.js'

export const postTodo = async (req, res) => {
    const { description } = req.body
    const { error } = todoValidation(description)

    if (error) return res.status(401).json({ error: error.details[0].message })

    try {
        const todo = await client.query("INSERT INTO todos (id, description) VALUES (DEFAULT, $1) RETURNING *", [description])
        return res.status(201).json(todo.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

export const getSingleTodo = async (req, res) => {
    const { id } = req.params

    try {
        const todo = await client.query("SELECT * FROM todos WHERE id = $1", [id])
        
        if (todo.rows.length === 0) return res.status(401).json({ error: "Todo does not exist" })

        return res.status(200).json(todo.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

export const getTodos = async (req, res) => {
    try {
        const todos = await client.query("SELECT * FROM todos")
        
        if (todos.rows.length === 0) return res.status(401).json({ error: "Todos does not exist" })
        
        return res.status(200).json({ todos: todos.rows })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

export const putTodo = async (req, res) => {
    const { id } = req.params
    const { description } = req.body
    const { error } = todoValidation(description) 

    if (error) return res.status(401).json({ error: error.details[0].message })

    try {
        const todo = await client.query("UPDATE todos SET description = $1 WHERE id = $2 RETURNING *", [description, id])
        return res.status(200).json(todo.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

export const deleteTodo = async (req, res) => {
    const { id } = req.params

    try {
        const todo = await client.query("DELETE FROM todos WHERE id = $1", [id])
        return res.status(200).json(todo.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}
import express from 'express'
import bcryptjs from 'bcryptjs'

// pg client
import client from '../config/DB.js'

// Validation
import { registerValidation } from '../validation/AuthValidation.js'

const { Router } = express
const router = Router({ caseSensitive: true, strict: true }) 

const { genSalt, hash, compare } = bcryptjs

// register a user route
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const { error } = registerValidation(req.body)

    if (error) return res.status(401).json({ error: error.details[0].message })

    try {
        let user = await client.query("SELECT * FROM users WHERE email = $1", [email])

        if (user.rows.length !== 0) return res.status(401).json({ error: "User already exist" })

        const salt = await genSalt(12)
        const hashedPasssword = await hash(password, salt)
        user = await client.query("INSERT INTO users (id, name, email, password) VALUES(DEFAULT, $1, $2, $3) RETURNING *",
            [name, email, hashedPasssword])

        return res.status(201).json(user.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.post("/login", async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.get("/logout", (req, res) => {

})


export default router
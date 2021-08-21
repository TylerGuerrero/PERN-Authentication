import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Router } = await import('express')

const { sign } = jwt
const { compare, genSalt, hash } = bcryptjs

// pg client
import client from '../config/DB.js'

// Validation
import { registerValidation, loginValidation } from '../validation/AuthValidation.js'

// Middleware
import { authValidation } from '../middleware/Authorization.js'

const router = Router({ caseSensitive: true, strict: true }) 

// create jwt token 
function createToken (email, id) {
    return sign({ email, id }, process.env.JWT_SECRET, { expiresIn: 3*24*60*60 })
}

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
        
        const token = createToken(user.rows[0].email, user.rows[0].id)
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60 })
        return res.status(201).json({user: user.rows[0], token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    const { error } = loginValidation(req.body)

    if (error) return res.status(401).json({ error: error.details[0].message })
    
    try {
        const user = await client.query("SELECT * FROM users WHERE email = $1", [email])

        if (user.rows.length === 0) return res.status(401).json({ error: "User does not exist" })
    
        const isMatch = await compare(password, user.rows[0].password)

        if (isMatch) {
            const token = createToken(user.rows[0].email, user.rows[0].id)
            res.cookie("jwt", token, { httpOnly: true, maxAge: 3*24*60*60 })
            return res.status(201).json({user: user.rows[0], token})
        } else {
            return res.status(401).json({ error: "Password does not match" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

router.get("/logout", authValidation, (req, res) => {
    console.log(req.user)
    res.cookie("jwt", " ", 3)
    return res.status(201).json({ msg: "User logged out" })
})


export default router
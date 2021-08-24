import jwt from 'jsonwebtoken'

const { verify } = jwt

// pg client
import client from '../config/DB.js'

export const authValidation = async (req, res, next) => {
    // const token = req.cookies.jwt
    const headerToken = req.headers.token 
    
    console.log(req.headers.token)
    if (req.headers.token === null) return res.status(401).json({ error: "Token does not exist" })

    try {
        const payload = verify(headerToken, process.env.JWT_SECRET)
        const user = await client.query("SELECT id, name, email FROM users WHERE id = $1", [payload.id])
        
        if (user.rows.length === 0) return res.status(401).json({ error: "User not found" })

        const { id, email, name } = user.rows[0]
        req.user = { id, email, name }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}
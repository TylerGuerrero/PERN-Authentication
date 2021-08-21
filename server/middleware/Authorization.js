import jwt from 'jsonwebtoken'

const { verify } = jwt

// pg client
import client from '../config/DB.js'

export const authValidation = async (req, res, next) => {
    const token = req.cookies.jwt
    const headerToken = req.headers.jwt
    
    // console.log(req.header("jwt"))
    if (!token || !headerToken) return res.status(401).json({ error: "Token does not exist" })

    try {
        const payload = verify(token, process.env.JWT_SECRET)
        const user = await client.query("SELECT name, email FROM users WHERE id = $1", [payload.id])
        
        if (user.rows.length === 0) return res.status(401).json({ error: "User not found" })

        req.user = user.rows[0]
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}
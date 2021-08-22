const { Router } = await import('express')

const router = Router()

// Middleware
import { authValidation } from '../../middleware/Authorization.js'

router.get("/", authValidation, async (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
})

export default router
const { Router } = await import('express')

// Controllers
import { loginController, registerController, logout, isVerify } from '../../controller/auth/AuthController.js'

// Middleware
import { authValidation } from '../../middleware/Authorization.js'

const router = Router({ caseSensitive: true, strict: true }) 

// register a user route
router.post("/register", registerController)

// route to login a user
router.post("/login", loginController)

router.get("/is-verify", authValidation, isVerify)

// route to signout a user
router.get("/logout", authValidation, logout)


export default router
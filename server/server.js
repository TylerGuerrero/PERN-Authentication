import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Router Modules
import AuthRoutes from './routes/AuthRoutes.js'
import DashBoardRoutes from './routes/DashboardRoutes.js'

// init server
const app = express()
dotenv.config({ path: "./config/config.env" })

// middleware
app.use(express.json({ limit: "30mb", type: "application/json", strict: true }))
app.use(express.urlencoded({ extended: true, limit: "30mb", type: "application/x-www-form-urlencoded" }))
app.use(morgan('dev'))
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(cookieParser())

// Routes 
app.use("/api/auth", AuthRoutes)
app.use("/api/dashboard", DashBoardRoutes)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})

process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`)
    server.close(process.exit(1))
})
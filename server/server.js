import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Routes
import AuthRoutes from './routes/AuthRoutes.js'

// init server
const app = express()
dotenv.config({ path: "./config/config.env" })

// middleware
app.use(express.json({ limit: "30mb", type: "application/json", strict: true }))
app.use(express.urlencoded({ extended: true, limit: "30mb", type: "application/x-www-form-urlencoded" }))
app.use(morgan('dev'))
app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(cookieParser())

app.use("/api/auth", AuthRoutes)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})

process.on('unhandledRejection', (error, promise) => {
    console.log(`Logged Error: ${error}`)
    server.close(process.exit(1))
})
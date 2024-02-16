import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.js"
import { connectDB } from "./database/connect.js";
import cors from "cors";

dotenv.config()

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} `)
})

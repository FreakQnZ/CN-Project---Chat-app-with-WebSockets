import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.js"
import { connectDB } from "./database/connect.js";
import cors from "cors";
import { Server } from "socket.io"; 
import { createServer } from "http";
import configureSocket from "./utils/socketSetup.js";

dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(cors())

const server = createServer(app)

const io = configureSocket(server)

app.use('/user', userRouter)

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} `)
})

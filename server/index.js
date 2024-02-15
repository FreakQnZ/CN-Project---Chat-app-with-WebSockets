import express from "express";
import http from "http"; // Import the http module
import cors from "cors"; // Import the cors module
import { Server } from "socket.io"

const app = express();
app.use(cors)

const server = http.createServer(app)

// Your routes and other middleware go here

server.listen(3001, () => {
    console.log("Server listening on port 3001");
});

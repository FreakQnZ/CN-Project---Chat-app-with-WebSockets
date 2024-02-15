import express from "express";

const app = express()
console.log(process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT} `)
})




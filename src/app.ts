import bodyParser from "body-parser";
import express from "express";
import userRouter from "./controllers/user.controllers";

const PORT = 3000

const app = express()

app.use(bodyParser.json())

app.use("/", userRouter)

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`)
})
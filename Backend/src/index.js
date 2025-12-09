import express from 'express'
import dotenv from "dotenv"
import app from "./app.js"
import { dbConnection } from "./db/db.js"

dotenv.config({ path: "../.env" })



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})



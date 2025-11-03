import express from 'express'
import dotenv from "dotenv"
import { app } from "./app.js"
import { dbConnection } from "./db/db.js"

dotenv.config({ path: "../.env" })

app.use(express.json())

// error handling middleware for custum json response
app.use((err, _, res, _) => {
    res.status(err.code || 500).json({
        success: false,
        message: err.message || "Internal server error",
        errors: err.errors || []
    })
})



const port = process.env.PORT || 3000
dbConnection().then(
    app.listen(port, () => {
        console.log(`Server started at port ${port}`)
    })
)


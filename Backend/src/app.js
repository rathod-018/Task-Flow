import express from "express"
import cookieparser from "cookie-parser"

const app = express()



app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded())
app.use(cookieparser())


// error handling middleware for custum json response
app.use((err, req, res, next) => {
    res.status(err.code || 500).json({
        success: false,
        message: err.message || "Internal server error",
        errors: err.errors || []
    })
})










app.get("/", (req, res) => {
    res.send("Hello World")
})


export { app }
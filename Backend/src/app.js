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


// import routes
import userRoutes from "./routes/user.route.js"


app.use("/api/v1/user", userRoutes)







app.get("/", (req, res) => {
    res.send("Hello World")
})


export { app }
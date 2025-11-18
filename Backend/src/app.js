import express from "express"
import cookieparser from "cookie-parser"
import cors from "cors"

const app = express()



app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded())
app.use(cookieparser())


// cors setup
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))



// import routes
import userRoutes from "./routes/user.route.js"
import boardRoutes from "./routes/board.route.js"


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/board", boardRoutes)







app.get("/api/v1", (req, res) => {
    res.send("Hello from Express Server")
})



// error handling middleware for custum json response
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        success: false,
        message: err.message || "Internal server error",
        errors: err.errors || []
    });
});




export { app }
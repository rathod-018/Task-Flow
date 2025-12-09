import express from "express"
import cookieparser from "cookie-parser"
import cors from "cors"

const app = express()

dbConnection()

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
import projectRoutes from "./routes/projects.route.js"
import boardMembershipRoutes from "./routes/boardMembership.route.js"
import taskRouter from "./routes/task.route.js"
import { dbConnection } from "./db/db.js"


app.use("/api/v1/user", userRoutes)
app.use("/api/v1/board", boardRoutes)
app.use("/api/v1/project", projectRoutes)
app.use("/api/v1/board-member", boardMembershipRoutes)
app.use("/api/v1/task", taskRouter)



// error handling middleware for custom json response
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        success: false,
        message: err.message || "Internal server error",
        errors: err.errors || []
    });
});




export default app 
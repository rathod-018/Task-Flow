import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";



const dbConnection = async () => {
    try {
        const connectDB = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connected Successfully !! Host:", connectDB.connection.host)

    } catch (error) {
        console.log("MongoDB connection Error !!", error.message)
    }
}

export { dbConnection }
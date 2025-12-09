import mongoose from "mongoose";
import { DB_NAME } from "../../constant.js";

let isConnected = false;

const dbConnection = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        isConnected = true;
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export { dbConnection };
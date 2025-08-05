
import {DB_NAME} from "../constants.js"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB = async()=>{
    console.log("Connecting to MongoDB with URI:", `${process.env.MONGODB_URL}/${DB_NAME}`);
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        console.log("MongoDB connected successfully");
        return connectionInstance.connection.host;
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);

    }
}

export default connectDB

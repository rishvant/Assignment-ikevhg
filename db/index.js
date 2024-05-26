import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/upload");
        console.log("MongoDB connected successfully");
    }
    catch (err) {
        console.log("Error:", err);
    }
}

export default connectDB;
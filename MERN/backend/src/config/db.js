import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://kirthiknitt_db_user:4mDaKwzfgbWc23Mq@cluster0.7h7j3rx.mongodb.net/?appName=Cluster0")
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("MongoDB connection failed:", error);
    }

}
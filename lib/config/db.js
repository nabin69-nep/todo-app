import mongoose from "mongoose"

export const connectDB=async()=>{
    
    await mongoose.connect('mongodb+srv://khadkanabin090:9847512547@cluster0.8qhkp.mongodb.net/todo-app');
    console.log("MongoDB Connected");
}
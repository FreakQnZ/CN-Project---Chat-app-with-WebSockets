import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "chatDB"
        })
        console.log("MongoDB Connected: ", conn.connection.host)
    } catch (error) {
        console.log(error)
    }
}
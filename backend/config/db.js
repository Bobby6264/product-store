import mongoose from "mongoose";

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Database connected successfully");
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log("Error: ", error.message);
        process.exit(1);//exit 1 means exit with failure 0 means exit with success
    }
};

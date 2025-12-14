import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Successfully connected to DB");
    } catch (error) {
        console.error("Fail connect to DB", error.message);
        throw error;
    }
};
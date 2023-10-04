import mongoose from "mongoose";

const mongoURL = 'mongodb://127.0.0.1:27017/books'

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
};
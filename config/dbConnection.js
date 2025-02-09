import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose
            .connect(process.env.MONGODB_URI)
            .then(console.log('DB connected.'));
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

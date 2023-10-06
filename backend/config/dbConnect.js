import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    mongoose.set("strictQuery", false);

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default dbConnect;
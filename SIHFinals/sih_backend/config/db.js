import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB Error:", error);
    // In development, don't exit the process so the server can still start
    // This avoids `ERR_CONNECTION_REFUSED` on the frontend while DB is unreachable.
    // The rest of the app should handle DB unavailability gracefully.
    return;
  }
};

export default connectDB;

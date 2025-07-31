import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing MongoDB connection");
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI
    );

    connection.isConnected = db.connections[0].readyState;
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    throw new Error(error.message);
  }
};

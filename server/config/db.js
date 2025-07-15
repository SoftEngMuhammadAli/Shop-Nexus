import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connectionURI =
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_DATABASE_URI
        : process.env.DEVELOPMENT_DATABASE_URI;

    if (!connectionURI) {
      throw new Error(
        "MongoDB connection URI not defined in environment variables"
      );
    }

    const conn = await mongoose.connect(connectionURI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });

    console.log(`✅ MongoDB is Connected on: ${conn.connection.host}`);

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected");
    });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

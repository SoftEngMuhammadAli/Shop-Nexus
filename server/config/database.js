import mongoose from "mongoose";

export async function connectToDatabase(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl);
    console.log("✅ Connected to MongoDB (Production/Remote Cluster)");
  } catch (e) {
    console.error("❌ Error while connecting to MongoDB:", e.message);
    process.exit(1);
  }
}

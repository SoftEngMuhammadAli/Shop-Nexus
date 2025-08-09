import mongoose from "mongoose";

export async function connectToDatabase(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl);
    console.log("✅ ShopNexus is connected to the database successfully!");
  } catch (e) {
    console.error("❌ Error while connecting to database:", e.message);
    process.exit(1);
  }
}

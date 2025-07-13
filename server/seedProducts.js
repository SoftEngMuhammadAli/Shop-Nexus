import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

// Configure environment variables
dotenv.config();

// Debug: Check if MONGO_URI is loaded
console.log("MongoDB URI:", process.env.MONGO_URI);

const seedProducts = [
  {
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    seller: "AudioTech",
    stock: 50,
    images: [
      {
        public_id: "sample_id_1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      },
    ],
  },
  {
    name: "Smart Watch",
    price: 199.99,
    description: "Latest smart watch with health monitoring",
    category: "Electronics",
    seller: "TechGadgets",
    stock: 30,
    images: [
      {
        public_id: "sample_id_2",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      },
    ],
  },
];

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");

    // Clear existing data
    await Product.deleteMany();
    console.log("Cleared existing products");

    // Insert new data
    await Product.insertMany(seedProducts);
    console.log("Database seeded successfully!");

    // Exit process
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();

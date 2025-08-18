import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/database.js";
import setupSwagger from "./swagger.js";

// Routers
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import blogRouter from "./routers/blogRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app = express();

// View Engine Setup
app.set("json spaces", 2);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template"));

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local frontend
      "https://shopnexus-web.vercel.app", // Production frontend
      `http://localhost:${port}`, // Local Swagger
      "https://shop-nexus-snmp.onrender.com", // Production Swagger
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (_req, res) => {
  let documentationUrl =
    process.env.NODE_ENV === "production"
      ? "https://shop-nexus-snmp.onrender.com/api/api-docs"
      : "http://localhost:5000/api/api-docs";

  res.render("documentation", {
    data: {
      greeting: "Hello World!",
      environment: process.env.NODE_ENV || "development",
      serverTime: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
    },
    documentation: documentationUrl,
    uptime: process.uptime(),
  });
});

// Swagger
setupSwagger(app);

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/orders", orderRouter);

// --- Connect to DB first, then start server ---
const dbUri = process.env.MONGODB_URI;

if (!dbUri) {
  console.error("❌ MONGODB_URI is not defined in environment variables.");
  process.exit(1);
}

connectToDatabase(dbUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`❌ Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  });

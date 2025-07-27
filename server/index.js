import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/database.js";
// API Routers
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

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
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files (like uploaded images or public assets)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", (_req, res) => {
  res.render("documentation", {
    data: {
      greeting: "Hello World!",
      environment: process.env.NODE_ENV || "development",
      serverTime: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
    },
    documentation: "https://www.website.com",
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

// Connect to DB
connectToDatabase(process.env.MONGODB_URI);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

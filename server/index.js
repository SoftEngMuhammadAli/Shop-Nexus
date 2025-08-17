import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/database.js";
import setupSwagger from "./swagger.js";
// API Routers
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import blogRouter from "./routers/blogRouter.js";

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
      // Local front-end (Vite React)
      "http://localhost:5173",

      // Production front-end (Vercel)
      "https://shopnexus-web.vercel.app",

      // If you host Swagger UI directly on backend domain, include it too:
      `http://localhost:${port}`, // local swagger UI
      "https://shop-nexus-snmp.onrender.com", // production swagger UI
    ],
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

setupSwagger(app);

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/blogs", blogRouter);

// Connect to DB
const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/shop-nexus";

connectToDatabase(dbUri)
  .then(() => {
    if (dbUri.includes("localhost") || dbUri.includes("127.0.0.1")) {
      console.log("✅ Connected to MongoDB (Local Database)");
    } else {
      console.log("✅ Connected to MongoDB (Production/Remote Cluster)");
    }
  })
  .catch((err) => {
    console.error("❌ Error while connecting to MongoDB:", err.message);
  });

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

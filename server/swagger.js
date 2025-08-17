import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShopNexus API",
      version: "1.0.0",
      description: `
🚀 **ShopNexus API Documentation**

This API provides authentication, user management, product management, and blog endpoints for the ShopNexus platform.

- 🔑 JWT-based authentication  
- 👥 User & role management  
- 🛒 Product CRUD operations  
- 📰 Blog posts management  
      `,
      termsOfService: "https://shop-nexus-snmp.onrender.com/terms",
      contact: {
        name: "ShopNexus Support",
        url: "https://shop-nexus-snmp.onrender.com/support",
        email: "support@shopnexus.com",
      },
      license: {
        name: "MIT License",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    externalDocs: {
      description: "Find more about OpenAPI 3.0",
      url: "https://swagger.io/docs/specification/about/",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local Development Server",
      },
      {
        url: "https://shop-nexus-snmp.onrender.com",
        description: "Production Server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication routes (Register, Login, Logout)",
      },
      {
        name: "Users",
        description: "Manage users (CRUD + roles)",
      },
      {
        name: "Products",
        description: "Product catalog CRUD operations",
      },
      {
        name: "Blogs",
        description: "Blog CRUD operations",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["user", "admin", "super-admin"] },
          },
        },
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            price: { type: "number" },
            description: { type: "string" },
            category: { type: "string" },
            inStock: { type: "boolean" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Use absolute path for router JSDoc comments
  apis: [path.join(__dirname, "routers/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default (app) => {
  app.use(
    "/api/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );
};

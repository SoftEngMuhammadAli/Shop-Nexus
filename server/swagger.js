import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShopNexus API",
      version: "1.0.0",
      description: `
        🚀 **ShopNexus API Documentation**

        This API provides authentication, user management, and product management 
        endpoints for the ShopNexus platform.

        - 🔑 JWT-based authentication
        - 👥 User & role management
        - 🛒 Product CRUD operations
      `,
      termsOfService: "http://localhost:5000/terms",
      contact: {
        name: "ShopNexus Support",
        url: "http://localhost:5000/support",
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
        url: "http://localhost:5000/",
        description: "Local Development Server",
      },
      {
        url: "https://api.shopnexus.com/",
        description: "Production Server",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Authentication related routes (Login, Register, Logout)",
      },
      {
        name: "Users",
        description: "Manage users (CRUD + roles)",
      },
      {
        name: "Products",
        description: "Product catalog CRUD operations",
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
  apis: ["./routers/*.js"], // JSDoc annotations inside your routers
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default (app) => {
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

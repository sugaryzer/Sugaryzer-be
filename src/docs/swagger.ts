import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Sugaryzer API",
            version: "1.0.0",
            description: "API documentation for the Sugaryzer app",
        },
        schemes: ["http", "https"],
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development server",
            },
        ],
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                description: 'Enter the access token'
              }
            }
          },
    },
    apis: [
        `${__dirname}/user-docs.ts`,//rewrite so user api appears on top in swagger
        `${__dirname}/user-docs.js`,
        `${__dirname}/*.js`,
        `${__dirname}/*.ts`,
    ], // Path to the route files
    
};

const swaggerSpec = swaggerJsDoc(options);

// This function sets up the Swagger UI on a given Express app
export const swagger = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};


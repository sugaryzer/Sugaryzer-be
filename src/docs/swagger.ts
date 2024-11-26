import swaggerJsDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Sugaryze API",
            version: "1.0.0",
            description: "API documentation for the Sugaryze app",
        },
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
        `${__dirname}/*.js`,
        `${__dirname}/*.ts`,
    ], // Path to the route files
    
};

export const swaggerSpec = swaggerJsDoc(options);
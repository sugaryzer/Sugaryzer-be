import swaggerJsDoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
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
    },
    apis: [
        `${__dirname}/*.js`,
        `${__dirname}/*.ts`,
    ], // Path to the route files
    
};

export const swaggerSpec = swaggerJsDoc(options);
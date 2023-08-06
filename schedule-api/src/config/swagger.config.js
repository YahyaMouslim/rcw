const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Authentication with JWT and Roles Documentation',
      version: '1.0.0',
      description: 'This documentation provides an overview of the API authentication process using JSON Web Tokens (JWT) and role-based access control in a Node.js Express application.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your API server URL
      },
    ],
  },
  apis: ['./api/routes/*.js'], // Path to your API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

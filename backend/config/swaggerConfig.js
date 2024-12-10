const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Resume Analyzer API',
        version: '1.0.0',
        description: 'API documentation for the Resume Analyzer project',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
  };
  
  const swaggerSpec = swaggerJsDoc(options);
  
  const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  };
  
  module.exports = swaggerDocs;
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BD API',
      version: '1.0.0',
    },
  },
  apis: ['./*.js'], // Substitua pelo caminho correto
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Documentation for mohir dev test project',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger for MohirDev',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Umar Akbarov',
        url: 'https://umarakbarov.uz',
        email: 'creativeboy1999@gmail.com',
      },
    },
    servers: [
      {
        url: 'https://mohirdev.umarakbarov.uz/api',
      },
      {
        url: 'http://localhost:3000',
      },
    ],
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  },
  apis: ['./routes.js', './**/routes.js'],
};

const specs = swaggerJsdoc(options);

export default Router({ caseSensitive: true, strict: true }).use(
  swaggerUi.serve,
  swaggerUi.setup(specs, {}),
);

require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../config/database.config');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger.config');
const jwt = require('src/api/validators/jwt');
const errorHandler = require('src/api/middlewares/error-handler');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api/v1', require('./routes/schedule.route'));

// global error handler
app.use(errorHandler);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 3004;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

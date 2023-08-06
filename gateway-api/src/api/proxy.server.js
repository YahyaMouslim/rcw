require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
//const jwt = require('src/api/validators/jwt');
//const errorHandler = require('src/api/middlewares/error-handler');
const proxyModule = require('./proxy');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// use JWT auth to secure the api
//app.use(jwt());
// global error handler
//app.use(errorHandler);

// Use proxy middleware for '/api/v1/*' requests
app.use('/api/v1', proxyModule);
  
// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});









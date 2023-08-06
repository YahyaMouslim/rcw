const express = require('express');
const http = require('http');

const router = express.Router();

// Proxy middleware for '/api/v1/*' requests
router.all('*', (req, res) => {
  const targetUrl = 'http://localhost:3000'; // Replace with actual microservice URL
  
  // Create a new request to the target microservice
  console.log(targetUrl + req.originalUrl,);
  const proxyReq = http.request(targetUrl + req.originalUrl, (proxyRes) => {
    // Forward the response headers and status code to the client
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    // Pipe the response body from the target microservice to the client
    proxyRes.pipe(res);
  });

  // Handle errors with the proxy request
  proxyReq.on('error', (err) => {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  });

  // Pipe the client request body to the proxy request
  req.pipe(proxyReq);
});

module.exports = router;

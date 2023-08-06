const { expressjwt } = require('express-jwt');
const config = require('src/config/config.json');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            '/api/v1/login',
            '/api/v1/register',
            '/api/v1/activate'
        ]
    });
}
'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config'); // Assuming there's a config file for secret and other settings

// Middleware to check if the user is authenticated
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, config.secret, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = authenticateToken;

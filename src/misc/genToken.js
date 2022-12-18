const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
    var hex = require('crypto').randomBytes(64).toString('hex');
    return jwt.sign(username, hex);
}

module.exports = {
    generateAccessToken
}
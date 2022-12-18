const User = require("../models/user")

// Authenticate token
async function authenticateToken (req, res, next) {

    // Getting token from headers or cookies
    token = req.headers['x-auth'] || req.cookies['x-auth'];

    // Finding user with such token
    const result = await User.find({
        authToken: token,
    })

    // If no user with such token - responsing
    if (result.length == 0) {
        return res.status(403).json({err: "Forbidden"})
    }

    next()
};

module.exports = {
    authenticateToken
}
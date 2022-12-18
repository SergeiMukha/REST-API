const authRouter = require("express").Router();
const { generateAccessToken } = require("../misc/genToken");
const User = require("../models/user");

const { hashPassword, validateHash } = require("../misc/hashing");

// Register
authRouter.post("/register", async (req, res) => {
    // Getting necessary data from query
    username = req.body.username;
    password = req.body.password;

    // Checking if all necessary data provided
    if (!username || !password) {
        return res.json({message: "Missing require data. Make sure you provided username and password"})
    }

    // Checking the validity of the data
    if (username.length < 4 || username.length > 30 || password.length < 8 || password.length > 30) {
        return res.json({message: "Username must have at least 4 characters. " +
            "Username mustn't have more than 30 characters. " +
            "Password must have at least 8 characters. " +
            "Password mustn't have more than 30 characters. "
        })
    }

    // Generating access token
    token = generateAccessToken(username);

    // Checking if the user is already exist
    const isRegistered = await User.findOne({
        username: username,
    })
    .then((result) => {
        if (result) {
            return true;
        } else {
            return false;
        }
    })
    .catch(err => {
        const result = {}
        result.err = err

        return result
    })

    if (isRegistered.err) {
        return res.status(500).json({err: isRegistered.err.message})
    }

    if (isRegistered) {
        return res.json({
        message:
            "This user is already exist. If it's your account use login instead of register.",
        });
    }

    // Creating new user
    const user = new User({
        username: username,
        passwordHash: await hashPassword(password), // Hashing password
        authToken: token,
    });

    // Saving new user
    user
        .save()
        .then((result) => {
            // Setting token to user's cookies
            res.cookie("x-auth", result['authToken'])

            // Sending data
            res.json({
                message:
                    "You've successfully registered. Check out your token. Use it in headers to get access to other functions",
                token: result["authToken"],
            })
        })
        .catch(err => {
            return res.status(500).json({err: err.message})
        })
});

// Login
authRouter.post("/login", async (req, res, next) => {
    // Getting necessary data from the query
    username = req.body.username;
    password = req.body.password;

    // Checking if all necessary data provided
    if (!username || !password) {
        return res.json({message: "Missing require data. Make sure you provided username and password"})
    }

    // Finding user
    const user = await User.findOne({
        username: username,
    })
    .then((result) => {
        if (result) {
            result.status = true

            return result;
        } else {
            // If there is no user with this username creating result by itself
            const result = {}

            result.status = false

            result.message = "This username isn't registered."

            return result
        }
    })
    .catch(err => {
        err.status = false

        return err
    })

    // If there is a problem with user messaging about it
    if (!user.status) {
        return res.json({message: user.message})
    }

    // Validating password with user's password hash
    const result = await validateHash(user["passwordHash"], password);

    // Responsing the result of operation
    if (!result) {
        return res.json({ message: "Password isn't correct." });
    } else if (result == true) {
        // Setting token to user's cookies
        res.cookie("x-auth", user['authToken'])

        return res.json({
            message:
                "You've successfully logged in. Use it in headers to get access to other functions",
            token: user["authToken"],
        });
        
    } else {
        // If there is an error in validating - responsing
        return res.json({ err: result });
    }
});

module.exports = authRouter;

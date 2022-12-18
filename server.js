require("dotenv").config();

const mongoose = require("./dbConfig");
const express = require("express");
const cookieParser = require("cookie-parser")

const clothesRouter = require("./routers/clothes");
const authRouter = require("./routers/auth")

const { authenticateToken } = require("./misc/authToken")

const { PORT } = process.env || 3000;

// Creating a server
const app = express();

app.use(express.json())

// Providing cookies using
app.use(cookieParser("santaclaus"));

app.use(express.urlencoded({extended: true}));
app.use(express.json())

// Defining all routes
app.use("/api/clothes", authenticateToken, clothesRouter);
app.use("/api/auth", authRouter)

app.get("/api", (req, res, next) => {

  return res.json({message: "This is RESTful API for my Portfolio"});

});

// Starting the server
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

module.exports = app;

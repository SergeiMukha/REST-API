require('dotenv').config()

const mongoose = require("mongoose");

const db = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

// Connecting to db
mongoose
  .connect(db)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.error(err));

module.exports = mongoose;

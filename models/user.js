const { Schema, model } = require("mongoose");

// Defining the User model properties
const userSchema = new Schema(
  {
    username: {
      type: String,
      min: 4,
      max: 30,
      required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    authToken: String
  },
);

// Creating a User model
const User = model("User", userSchema);

module.exports = User;
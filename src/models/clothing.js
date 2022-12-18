const { Schema, model } = require("mongoose");

const clothingSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Clothing = model("Clothing", clothingSchema);

module.exports = Clothing;

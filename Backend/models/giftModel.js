const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const giftSchema = new Schema(
  {
    gender: String,
    age: Number,
    relation: String,
    occasion: String,
    interests: [String],
    budget: Number,
  },
  { timestamps: true }
);
// const Gift = mongoose.model("Gift", giftSchema);

module.exports = mongoose.model("Gift", giftSchema);

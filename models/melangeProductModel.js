const mongoose = require("mongoose");
const melangeProductSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MelangeUser",
      default: []
    }
  ],
  product: {
    name: String,
      price: Number,
      shop: String
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MelangeUser"
  }
});

melangeProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product users PaidBy",
    select: "-__v -email"
  })
  next();
})

const melangeProduct = mongoose.model("melangeProduct", melangeProductSchema);

module.exports = melangeProduct; 
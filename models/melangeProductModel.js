const mongoose = require("mongoose");
const melangeProductSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: []
    }
  ],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
});

melangeProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product users users",
    select: "-__v -email"
  })
  next();
})

const melangeProduct = mongoose.model("melangeProduct", melangeProductSchema);

module.exports = melangeProduct; 
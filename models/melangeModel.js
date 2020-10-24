const mongoose = require("mongoose");
const crypto = require('crypto');

const melangeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Melange must have a name"],
    minlength: 3,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MelangeUser",
      default: [],
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "melangeProduct",
      default: [],
    },
  ],
  createdAt: Date,
  expiresIn: Date,
  inviteToken: {
      type: String,
      uppercase: true
  }
  
});


melangeSchema.pre(/^find/, function (next) {
  this.select("-__v");
  // this.populate({
  //     path: 'users',
  //     select: '_id name'
  // })
  this.populate({
    path: "products users",
    select: "-__v -email",
  });
  next();
});
melangeSchema.pre("save", function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
    this.inviteToken = crypto.randomBytes(3).toString('hex');
  }
  next();
});

const Melange = mongoose.model("Melange", melangeSchema);

module.exports = Melange;

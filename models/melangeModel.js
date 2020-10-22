const mongoose = require("mongoose");


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

const Melange = mongoose.model("Melange", melangeSchema);

module.exports = Melange;

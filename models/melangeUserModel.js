const mongoose = require("mongoose");

const melangeUserSchema = new mongoose.Schema({
  user: {
    name: String,
    _id: String
  },
  melange: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Melange"
  },
  incomes: {
    type: Number,
    default: 0,
  },
  expenses: {
    type: Number,
    default: 0,
  },
});

// melangeUserSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "-__v -email",
//   });
//   next();
// });

const MelangeUser = mongoose.model("MelangeUser", melangeUserSchema);

module.exports = MelangeUser;

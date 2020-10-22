const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "User must have a name."],
    minlength: 3,
    maxlength: 12
  },
  email: {
    type: String,
    required: [true, "User must provide an email."],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, "User must provide a password."],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "User must confirm password"],
  },
  PasswordChangedAt: Date,
  active: {
    type: Boolean,
    default: false
  },
  activationToken: String,
});


const User = mongoose.model("User", userSchema);

module.exports = User;

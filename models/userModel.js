const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

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
    validate: [validator.isEmail, "Provide a valid email."],
  },
  //   photo: {
  //     type: String,
  //     default: 'default.jpg'
  //   },
  password: {
    type: String,
    required: [true, "User must provide a password."],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "User must confirm password"],
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
      message: "Passwords must be the same",
    },
  },
  PasswordChangedAt: Date,
  active: {
    type: Boolean,
    default: false
  },
  activationToken: String,
});

userSchema.pre(/^find/, function (next) {
  this.select("-__v -activationToken");
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createActivationToken = function() {
  let activationToken = crypto.randomBytes(32).toString('hex');

  this.activationToken = crypto
    .createHash('sha256')
    .update(activationToken)
    .digest('hex');

  return this.activationToken;
};


userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

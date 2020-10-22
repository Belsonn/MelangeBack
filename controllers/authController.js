const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const globalError = require("./../utils/globalError");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };
  
  const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const expiresIn = new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    );
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  
    res.cookie("jwt", token, cookieOptions);
  
    user.password = undefined;
  
    res.status(statusCode).json({
      status: "success",
      token,
      expiresIn,
      data: {
        user,
      },
    });
  };

exports.signup = async (req, res, next) => {
    const user = await User.findOne().or([
      { name: req.body.name },
      { email: req.body.email },
    ]);
    if (user) {
      return next(
        new globalError("User with this email or name already exists.", 400)
      );
    }
    const newUser = await User.create(req.body);
  
    const activateToken = newUser.createActivationToken();
    await newUser.save({ validateBeforeSave: false });
  
    createSendToken(user, 200, res);
  };
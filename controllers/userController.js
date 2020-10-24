const Melange = require("./../models/melangeModel");
const globalError = require("./../utils/globalError");
const User = require("./../models/userModel");

exports.getMe = async (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new globalError("There are no users with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};

exports.getAllUsers = async (req, res, next) => {
    const users = await User.find();
    if (!users) {
        return next(new globalError("No users in db", 404));
      }
    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users
        }
    })
}
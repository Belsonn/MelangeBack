const Melange = require("./../models/melangeModel");
const globalError = require("./../utils/globalError");

exports.createMelange = async (req, res, next) => {
  const melange = await Melange.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      melange,
    },
  });
};

exports.getMelange = async (req, res, next) => {
  const melange = await Melange.findById(req.params.id);
  if (!melange) {
    return next(new globalError("No melange found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      melange,
    },
  });
};

exports.getAllMelanges = async (req, res, next) => {
  const melanges = await Melange.find();

  if (!melanges) {
    return next(new globalError("No melange found", 404));
  }

  res.status(200).json({
    status: "success",
    results: melanges.length,
    data: {
      melanges,
    },
  });
};

exports.getMyMelanges = async (req, res, next) => {
  const melangeUser = await MelangeUser.find({ "user._id": req.user.id });

  let ids = [];

  melangeUser.forEach((el) => {
    ids.push(el.melange);
  });

  const melanges = await Melange.find().where("_id").in(ids).exec();

  if (!melanges) {
    return next(new globalError("You have no melanges yet.", 404));
  }

  res.status(200).json({
    status: "success",
    results: melanges.length,
    data: {
      melanges,
    },
  });
};

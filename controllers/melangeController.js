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

exports.createTemporaryUser = async (req, res, next) => {
  const user = await User.findOne({ name: req.body.name });

  let melange = await Melange.findById(req.body.melange);

  let alreadyExists = false;
  
  melange.users.forEach(user => {
    if(user.user.name == req.body.name){
      alreadyExists = true;
      return;
    }
  })

  if (user || alreadyExists) {
    return next(new globalError("User with this name already exists", 400));
  }

  const tempUser = await MelangeUser.create({
    user: {
      name: req.body.name, 
      _id: 'temp'+mongoose.Types.ObjectId()
    },
    melange: req.body.melange,
  });

  if (!tempUser) {
    return next(new globalError("Something went wrong", 500));
  }

  melange = await Melange.findByIdAndUpdate(
    req.body.melange,
    { $push: { users: tempUser._id } },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      melange,
    },
  });
};

exports.deleteMelange = async (req, res, next) => {
  const melange = await Melange.findByIdAndDelete(req.params.id);
  melange.users.forEach(async user =>{
    await MelangeUser.findByIdAndDelete(user._id);
  })
  
  melange.products.forEach(async product =>{
    await MelangeProduct.findByIdAndDelete(product._id);
  })

  res.status(204).json({
    status: "success",
    data: null
  })
}
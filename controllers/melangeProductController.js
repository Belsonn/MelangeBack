const melangeProduct = require("./../models/melangeProductModel");
const globalError = require("./../utils/globalError");
const Melange = require("./../models/melangeModel");
const MelangeUser = require("./../models/melangeUserModel");

exports.createMelangeProduct = async (req, res, next) => {
  let ids = [];
  req.body.users.forEach((user) => {
    ids.push(user._id);
  });
  const product = await melangeProduct.create({
    users: ids,
    product: req.body.product._id,
    paidBy: req.body.paidBy._id,
  });
  const fullPrice = req.body.product.price;
  const priceforOne = req.body.product.price / req.body.users.length;

  if (!ids.includes(req.body.paidBy._id)) {
    const paidBy = await MelangeUser.findByIdAndUpdate(
      req.body.paidBy._id,
      { incomes: req.body.paidBy.incomes + fullPrice },
      { new: true }
    );
  }
  req.body.users.forEach(async (el) => {
    let user;
    user = await MelangeUser.findById(el._id);
    if (el._id == req.body.paidBy._id) {
      user = await MelangeUser.findByIdAndUpdate(
        el._id,
        {
          expenses: user.expenses + priceforOne,
          incomes: user.incomes + fullPrice,
        },
        { new: true }
      );
    } else {
      user = await MelangeUser.findByIdAndUpdate(
        el._id,
        { expenses: user.expenses + priceforOne },
        { new: true }
      );
    }
  });
  let melange = await Melange.findByIdAndUpdate(
    req.body.melangeId,
    { $push: { products: product } },
    {
      new: true,
    }
  );
  res.status(201).json({
    status: "success",
    data: {
      melange,
    },
  });
};
exports.getMelangeProduct = async (req, res, next) => {
  const product = await melangeProduct.findById(req.params.id);
  if (!product) {
    return next(new globalError("No product found with that id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};
exports.getAllMelangeProducts = async (req, res, next) => {
  const products = await melangeProduct.find();
  if (!products) {
    return next(
      new globalError("There are no products, try to create a new one", 404)
    );
  }
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};
exports.deleteMelangeProduct = async (req, res, next) => {
  const product = await melangeProduct.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new globalError("No product found with that id", 404));
  }
  const melange = await Melange.findOneAndUpdate(
    { products: { $gte: product } },
    { $pull: { products: { _id: product.id } } }
  );
  res.status(204).json({
    status: "success",
    data: null,
  });
};
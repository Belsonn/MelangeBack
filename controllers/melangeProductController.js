const melangeProduct = require("./../models/melangeProductModel");
const globalError = require("./../utils/globalError");

exports.createMelangeProduct = async (req, res, next) => {
  const product = await melangeProduct.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      product,
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

  res.status(204).json({
    status: "success",
    data: null,
  });
};
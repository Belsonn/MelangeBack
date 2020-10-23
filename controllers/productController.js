const Product = require("./../models/productsModel");
const globalError = require("./../utils/globalError");

exports.createProduct = async (req, res, next) => {
  let product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new GlobalError("No product found with that id."));
  }
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new GlobalError("No product found with that id."));
  }
  res.status(204).json({
      status: "success",
      data: null
  })
};
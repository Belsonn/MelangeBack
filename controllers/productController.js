const Product = require("./../models/productsModel");
const GlobalError = require("./../utils/globalError");
const filterObject = require("./../utils/filterObj");

exports.createProduct = async (req, res, next) => {

  let product = await Product.create({
    name: req.body.name,
    shop: req.body.shop,
    price: req.body.price,
    createdBy: req.user.id,
  });


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
    data: null,
  });
};

exports.getMyProducts = async (req, res, next) => {
  const products = await Product.find({ createdBy: req.user.id });

  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });

};

exports.updateProduct = async (req, res, next) => {
  const filteredBody = filterObject(req.body, "price");

  const product = await Product.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
};

exports.findOne = async (req, res, next) => {
  let product = await Product.findOne({
    name: req.body.name,
    shop: req.body.shop,
  });

  if (product && product.price == req.body.price) {
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });

  } else if (product) {

    req.params.id = product.id;
    return this.updateProduct(req, res, next);

  } else {
    return this.createProduct(req, res, next);
  }
};

exports.findPrice = async (req, res, next) => {
  const product = await Product.findOne({
    name: req.body.name,
    shop: req.body.shop,
  });

  if (product) {
    return res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  }
  
  res.status(200).json({
    status: "success",
    data: null,
  });
};
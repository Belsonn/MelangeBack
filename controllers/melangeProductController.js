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

  res.status(204).json({
    status: "success",
    data: null,
  });
};
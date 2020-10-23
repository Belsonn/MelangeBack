const Melange = require("./../models/melangeModel");
const globalError = require("./../utils/globalError");

exports.createMelange = async (req, res, next) => {
  const melange = await Melange.create(req.body);

  res.status(201).json({
      status: 'success',
      data: {
          melange
      }
  })
};

exports.getMelange = async (req, res, next) => {
    const melange = await Melange.findById(req.params.id);
    if(!melange){
        return next(new globalError("No melange found", 404))
    }
    res.status(200).json({
        status: "success",
        data: {
            melange
        }
    })
}
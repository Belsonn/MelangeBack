    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: []
    }
  ],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  factor: [Number]
});

melangeProductSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product users",
    select: "-__v -email"
  })
  next();
})

const melangeProduct = mongoose.model("melangeProduct", melangeProductSchema);

module.exports = melangeProduct; 
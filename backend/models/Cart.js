const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  cart: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "productModel",
      },
      qty: { type: Number }, 
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "userModel",
  },
});

const cartModel = mongoose.model("cartModel", cartSchema);

module.exports = cartModel;

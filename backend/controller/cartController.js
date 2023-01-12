const cartModel = require("../models/Cart");
const jwt = require("jsonwebtoken");
const { findById } = require("../models/Cart");
const { productModel } = require("../models/Products");

const createCart = async (req, res) => {
  try {
    const { token, cart } = req.body;
    const { UserID } = jwt.verify(token, process.env.SECRET_KEY);
    const cartItem = await cartModel.findOneAndUpdate(
      { user: UserID },
      { cart: cart },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: cartItem });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const { UserID } = await jwt.verify(token, process.env.SECRET_KEY);
    const { cart } = await cartModel
      .findOne({ user: UserID })
      .populate("cart.product");
    const newCart = await Promise.all(
      cart.map(async (item) => {
        product = await productModel
          .findById(item._id)
          .select("images name price");
        return { ...product._doc, qty: item.qty };
      })
    );

    res.status(200).json({ data: newCart });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error });
  }
};

module.exports = { createCart, getCart };

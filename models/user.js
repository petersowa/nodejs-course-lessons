const mongoose = require('mongoose');

const Order = require('./order');

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productRef: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function(product) {
  const index = this.cart.items.findIndex(
    i => i.productRef.toString() === product
  );

  if (index >= 0) {
    this.cart.items[index].quantity++;
  } else {
    this.cart.items.push({ productRef: product, quantity: 1 });
  }

  return this.save();
};

userSchema.methods.getCart = async function() {
  const user = await this.populate('cart.items.productRef').execPopulate();

  return user.cart.items;
};

userSchema.methods.clearCart = async function() {
  this.cart.items = [];
  return this.save();
};

userSchema.methods.submitOrder = async function() {
  new Order({
    userRef: this._id,
    items: [...this.cart.items],
  }).save();
  this.cart.items = [];
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

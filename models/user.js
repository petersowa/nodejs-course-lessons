const mongoose = require('mongoose');

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
        productId: {
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
    i => i.productId.toString() === product
  );

  if (index >= 0) {
    this.cart.items[index].quantity++;
  } else {
    this.cart.items.push({ productId: product, quantity: 1 });
  }

  return this.save();
};

userSchema.methods.getCart = async function() {
  const user = await this.populate('cart.items.productId').execPopulate();

  return user.cart.items;
};

module.exports = mongoose.model('User', userSchema);

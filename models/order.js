const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  userRef: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
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
});

module.exports = mongoose.model('Order', orderSchema);

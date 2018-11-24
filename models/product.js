const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Product', productSchema);

// const uuid = require('uuid/v1');
// const { getDb } = require('../database/connect');

// const getProductsFromDB = query => {
//   const products = getDb().collection('products');
//   return products.find(query).toArray();
// };

// module.exports = class Product {
//   constructor(
//     title = 'picture',
//     description = 'A cool picture.',
//     imageURL = 'https://picsum.photos/200',
//     price = 1.0
//   ) {
//     this.product = { id: uuid(), title, description, imageURL, price };
//   }

//   async save() {
//     const db = getDb();
//     try {
//       return await db.collection('products').insertOne(this.product);
//     } catch (err) {
//       throw err;
//     }
//   }

//   static fetchAll(query = {}) {
//     return getProductsFromDB(query);
//   }

//   static deleteItem(id) {
//     const products = getDb().collection('products');
//     return products.deleteOne({ id });
//   }

//   static update(updatedProduct) {
//     const products = getDb().collection('products');
//     console.log(updatedProduct.id);
//     return products.replaceOne({ id: updatedProduct.id }, updatedProduct);
//   }
// };

// exports.version = '0.1';

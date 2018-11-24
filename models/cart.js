// const fs = require('fs');
// const path = require('path');
// const uuid = require('uuid/v1');
// const rootDir = require('../util/path');

// const productFilePath = path.join(rootDir, 'data', 'cart.json');

// const getProductsFromFile = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(productFilePath, (err, fileContent) => {
//       let products = [];
//       if (!err) {
//         products = JSON.parse(fileContent);
//       } else {
//         console.log(err);
//       }
//       resolve(products);
//     });
//   });
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
//     const products = await getProductsFromFile();
//     products.push(this.product);
//     fs.writeFile(productFilePath, JSON.stringify(products), err =>
//       console.log(err ? `error: ${err}` : 'file saved')
//     );
//   }

//   static fetchAll() {
//     return getProductsFromFile();
//   }
// };

// exports.version = "0.1";

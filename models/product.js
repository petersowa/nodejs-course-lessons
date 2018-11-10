const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

//const products = [];
const getProductsFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(rootDir, 'data', 'products.json'),
      (err, fileContent) => {
        let products = [];
        if (!err) {
          products = JSON.parse(fileContent);
        } else {
          console.log(err);
        }
        resolve(products);
      }
    );
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  async save() {
    const products = await getProductsFromFile();
    products.push(this);
    fs.writeFile(
      path.join(rootDir, 'data', 'products.json'),
      JSON.stringify(products),
      err => console.log(err ? `error: ${err}` : 'file saved')
    );
  }

  static fetchAll() {
    return getProductsFromFile();
  }
};

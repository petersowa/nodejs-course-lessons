const express = require('express')

const router = express.Router()

const products = []

router.get('/add-product', (req, res, next) => {
  console.log('in another the middleware')
  res.render('add-product', { pageTitle: 'Add Product' })
})

router.post('/product', (req, res, next) => {
  console.log('product submitted.', req.body)
  products.push(req.body.title)
  console.log(products)

  res.redirect('/')
})

module.exports = { router, products }

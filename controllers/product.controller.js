const Products = require("../models/products.model")
const { getPostData } = require("../utils")
//@ gets All Products
const getProducts = async (req, res) => {
  try {
    const products = await Products.findAll()
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(products))
  } catch (error) {}
}

//@ gets single Product

const getSingleProduct = async (req, res, id) => {
  try {
    const product = await Products.findById(id)

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ msg: "product not found" }))
    } else {
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

// @create product
const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req)
    const { title, description, price } = JSON.parse(body)
    const product = {
      title,
      description,
      price,
    }
    const newProduct = await Products.create(product)
    res.writeHead(201, { "Content-Type": "application/json" })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

const updateSingleProduct = async (req, res, id) => {
  try {
    // const thisProduct = await Products.findById(id)
    // if (!thisProduct) {
    //   res.writeHead(400, { "Content-Type": "application/json" })
    //   res.end(JSON.stringify({ msg: "no such product exists" }))
    // }
    const body = await getPostData(req)
    const { title, description, price } = JSON.parse(body)
    const product = {
      title,
      description,
      price,
    }
    const newProduct = await Products.update(product, id)
    res.writeHead(201, { "Content-Type": "application/json" })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}
const deleteSingleProduct = async (req, res, id) => {
  try {
    const product = await Products.findById(id)

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ msg: "product not found" }))
    }
    const deletedProduct = await Products.deleteProduct(id)
    res.writeHead(201, { "Content-Type": "application/json" })
    return res.end(JSON.stringify(deletedProduct))
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  getProducts,
  getSingleProduct,
  createProduct,
  deleteSingleProduct,
  updateSingleProduct,
}

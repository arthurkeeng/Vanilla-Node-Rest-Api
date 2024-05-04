const products = require("../data/products.json")
const { v4: uuidv4 } = require("uuid")
const { writeDataToFile } = require("../utils")
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((product) => product.id == id)
    resolve(product)
  })
}
function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { ...product, id: uuidv4() }
    products.push(newProduct)
    writeDataToFile("./data/products.json", products)
    resolve(newProduct)
  })
}
const update = (product, id) => {
  return new Promise((resolve, reject) => {
    const newProducts = products.map((prod) => {
      if (prod.id == id) {
        console.log(prod)
        prod = { ...prod, ...product }
      }
      return prod
    })
    writeDataToFile("./data/products.json", newProducts)
    resolve(newProducts)
  })
}
function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    const newProducts = products.filter((product) => product.id !== id)
    writeDataToFile("./data/products.json", newProducts)
    resolve(newProducts)
  })
}
module.exports = { findAll, findById, create, deleteProduct, update }

const http = require("http")
const PORT = process.env.PORT || 5000
const {
  getProducts,
  getSingleProduct,
  createProduct,
  deleteSingleProduct,
  updateSingleProduct,
} = require("./controllers/product.controller")
const server = http.createServer((req, res) => {
  if (req.url == "/api/products" && req.method == "GET") {
    getProducts(req, res)
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method == "GET"
  ) {
    const id = req.url.split("/")[3]
    console.log(req.url.split("/"))
    getSingleProduct(req, res, id)
  } else if (req.url == "/api/products" && req.method == "POST") {
    createProduct(req, res)
  } else if (
    req.url.match(/\/api\/products\/([a-zA-Z0-9]+(-))/) &&
    req.method == "DELETE"
  ) {
    const id = req.url.split("/")[3]
    deleteSingleProduct(req, res, id)
  } else if (
    req.url.match(/\/api\/products\/([a-zA-Z0-9]+(-))/) &&
    req.method == "PUT"
  ) {
    const id = req.url.split("/")[3]

    updateSingleProduct(req, res, id)
  } else {
    res.writeHead(400, { "Content-Type": "application/json" })

    res.end(JSON.stringify({ msg: "Route not found" }))
  }
})

server.listen(PORT, () => console.log(`server listening on ${PORT}`))

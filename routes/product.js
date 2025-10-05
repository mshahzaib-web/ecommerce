const express = require("express");
const router = express.Router();
const Product = require("../moudles/product.js");


//Show Products
router.get("/", async(req, res) => {
    const products = await Product.find({});
    res.render("pages/allProduct.ejs", {products});
});

//Add Product Route
router.get("/add", (req, res) => {
  res.render("pages/addProduct.ejs");
});

router.post("/", async(req, res) => {
  let newProduct = new Product(req.body.product);
  await newProduct.save();
  res.redirect("/products");
    
});

//Show Product Details
router.get("/:id/details", async(req, res) => {
  let {id} = req.params;
  const product = await Product.findById(id);
  res.render("pages/productDetails.ejs", {product});
});

//Get Customer Information for order page route
router.post("/:id/order", async(req, res) => {
  let {id} = req.params;
  let customer = req.body.customer;
  res.render("pages/customerInfo.ejs", {customer});
});


//Order confirm popup route
router.post("/order/confirm", (req, res) => {
  res.render("pages/orderConfirm.ejs");
});








module.exports = router;
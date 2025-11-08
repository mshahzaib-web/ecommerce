const express = require("express");
const router = express.Router();
const Product = require("../moudles/product.js");
const Customer = require("../moudles/customer.js");
const wrapAsync = require("../utility/wrapAsync.js");
const {joiProductSchema} = require("../joiSchema.js");


const joiProductValidation = (req, res, next) => {
  let {error} = joiProductSchema.validate(req.body);
  if(error){
    throw new expressError(400, error)
  }else{
    next();
  }
};


//Show Products
router.get("/", async(req, res) => {
    const products = await Product.find({});
    res.render("pages/allProduct.ejs", {products});
});

//Add Product Route
router.get("/add",(req, res) => {
  res.render("pages/addProduct.ejs");
});

router.post("/",wrapAsync( async(req, res, next) => {
  let newProduct = new Product(req.body.product);
  // await newProduct.save();
  // res.redirect("/products");
  res.send(newProduct);
  
  
    
}));

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

router.post("/order/confirm", async(req, res) => {
  let customerOrder = new Customer(req.body.customer);
  await customerOrder.save();
  res.render("pages/orderConfirm.ejs");
  
});

//EDIT THE PRODUCTS
router.get("/:id/edit", async(req, res) => {
  let {id} = req.params;
  let product = await Product.findById(id);
  // console.log(product.subImages.length);
  res.render("pages/editProduct.ejs", {product});

});

// UPDATE THE PRODUCT ROUTE
router.put("/:id/update", async(req, res) => {
  let {id} = req.params;
  let updateProduct = req.body.product;
  let newProduct = await Product.findByIdAndUpdate(id, updateProduct);
  await newProduct.save();
  res.redirect(`/products/${id}/details`);  
  
});

//PRODUCT DELETE ROUTE
router.delete("/:id/delete", async(req, res) => {
  let {id} = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});


//Order confirm popup route  
// router.post("/order/confirm", (req, res) => {
//   res.render("pages/orderConfirm.ejs");
// });



//<<<<<<<<<<<<<<<<<<<<<<<<<<<< CUSTOMER ROUTE START>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>









module.exports = router;
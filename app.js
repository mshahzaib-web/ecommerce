const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
var methodOverride = require('method-override')
const path = require("path");
const Product = require("./moudles/product.js");
const expressError = require("./utility/expressError.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride('_method'))

main()
  .then((res) => {
    console.log("Database connect successfully");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
}

const product = require("./routes/product.js");

app.use("/products", product);

app.get("/", (req, res) => {
  res.send("this is home page");
});

// app.get("/add", (req, res) => {
//     res.render("pages/addProduct.ejs");
// })

// app.get("/add", async (req, res) => {
//   try {
//     let addProduct = new Product({
//       title: "product name",
//       description: "this is the product description",
//       image:{
//       url:"https://momblogsociety.com/wp-content/uploads/2020/03/dsasfew-1.jpg",
//        },
//         price: 1110,
//       category: "puma",
//     });
//     let result = await addProduct.save();
//     console.log(result);
//     res.send("product save");
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

app.use((req, res, next) => {
next(new expressError(404, "Page not found:"));
});

app.use((err, req, res, next) =>{
  let {status = 500, message = "Something went wrong"} = err;
  res.status(status).send(err.message);
});


app.listen(3000, () => {
  console.log("Port is running on 3000");
});

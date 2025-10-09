const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    image: {
        filename: String,
        url: String,
    },
    color: String,
    size: String,
    quantity: Number,
    price: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,

});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
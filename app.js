const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app =  express();

mongoose.connect("mongodb://127.0.0.1:27017/RESTdata").then(()=>{
    console.log('Connection successfully');
}).catch((e)=>{
    console.log('Lost connection');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
console.log("Start")
console.log("Fetching works");

const Product = mongoose.model("product", productSchema);

app.post("/app/v1/product/new", async (req, res) => {
    console.log("Object", req.body);
    try {
        const product = await Product.create(req.body);
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(4500, () => {
    console.log("Server is working");
});

// const fs = require('fs').writeFileSync;
// fs("db.js","");

const http = require("http");
const userdata = require("./userdata");

// Importing mongoose
const mongoose = require("mongoose");

// Connecting to mongoDB server
mongoose.connect("mongodb://localhost:27017/e-comm");

// Creating Schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
});

// Save data to mongoDB Database
const saveInDB = async () => {
  const Product = mongoose.model("products", ProductSchema);
  let data = new Product({ name: "Dell Tuf", price: 66000 });
  const result = await data.save();
  console.log(result);
};

// Update data to mongoDB Database
const updateInDB = async ()=>{
  const Product = mongoose.model("products", ProductSchema);
  let data = await Product.updateOne(
    {name:"Dell Tuf"},
    {$set:{price:60000, name:'Dell Inspiron'}}
    );
  console.log(data);
}

// Delete data from mongoDB Database
const deleteInDB = async ()=>{
  const Product = mongoose.model("products", ProductSchema);
  let data = await Product.deleteOne({name:'Dell Laptop'});
  console.log(data);
}

// Read data from mongoDB Database
const findInDB = async ()=>{
  const Product = mongoose.model("products", ProductSchema);
  let data = await Product.find({name:'Asus Tuf A15'});
  console.log(data);
}

// Calling All Methods
// saveInDB()
// updateInDB()
// deleteInDB()
// findInDB();

http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "applicationjson" });
    res.write(JSON.stringify(userdata));
    res.end();
  }).listen(5000);

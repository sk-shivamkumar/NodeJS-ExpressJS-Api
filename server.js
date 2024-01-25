const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const userdata = require("./pure_node_code/userdata");

app.get("/user", (req, res) => {
  res.send(userdata);
});

app.get("/", (req, res) => {
  res.send("Welcome to Hotel...");
});

const personRoutes = require("./routes/personRoutes");
const menuItemRouters = require("./routes/menuRoutes");

app.use("/person", personRoutes);
app.use("/menuitem", menuItemRouters);


app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

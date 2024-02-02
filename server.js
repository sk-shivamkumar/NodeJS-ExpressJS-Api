const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

const userdata = require("./pure_node_code/userdata");

const logRequest = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session: false})

app.get("/", localAuthMiddleware, (req, res) => {
  res.send("Welcome to Hotel...");
});

app.get("/user", (req, res) => {
  res.send(userdata);
});

const personRoutes = require("./routes/personRoutes");
const menuItemRouters = require("./routes/menuRoutes");

app.use("/person",localAuthMiddleware, personRoutes);
app.use("/menu", menuItemRouters);


app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

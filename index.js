const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cfg  = require("./config.js");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const cors = require("cors");
const productsController = require('./controllers/products');

const uri = `mongodb+srv://${cfg.dbUser}:${cfg.dbUserPassword}@greenpenguin.db9aw.mongodb.net/${cfg.dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.route('/products')
.get(productsController.getProducts)
.post(productsController.addProduct)
.delete(productsController.deleteProduct)

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`)
})
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cfg  = require("./config.js");
const morgan = require("morgan");
const cors = require("cors");
const productsController = require('./controllers/products');
const categoriesController = require('./controllers/categories');

const uri = `mongodb+srv://${cfg.dbUser}:${cfg.dbUserPassword}@greenpenguin.db9aw.mongodb.net/${cfg.dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));

app.use(bodyParser.json({limit: "3mb"}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.route('/products')
.get(productsController.getProducts)
.post(productsController.addProduct)
.delete(productsController.deleteProduct)
.put(productsController.changeProduct)

app.route("/categories")
.get(categoriesController.getCategories)

app.listen(cfg.port, () => {
  console.log(`Example app listening at http://localhost:${cfg.port}`)
})
const Product = require("../models/product.js");
const categoriesController = require("../controllers/categories");
const cfg = require("../config.js");

module.exports = {
  addProduct: (req, res) => {
    const {
      name,
      volume,
      weight,
      price,
      category,
      subCategory,
      brand,
      description,
      image,
    } = req.body;
    const img = req.file ? req.file.path : image;

    categoriesController.changeCategories(category, subCategory, brand);

    Product.create(
      {
        name,
        volume,
        weight,
        price,
        category,
        subCategory,
        brand,
        description,
        image: img,
      },
      (err, product) => {
        if (err) {
          res.status(400).json({ errorMessage: err._message });
        } else {
          res.status(201).json({
            product,
          });
        }
      }
    );
  },
  getProducts: (req, res) => {
    const {
      category,
      subcategory,
      brands,
      sort,
      sortorder,
      filterword,
      limit,
      offset,
    } = req.query;

    let findObj = {};
    if (category) findObj.category = category;
    if (subcategory) findObj.subCategory = subcategory;
    if (brands) findObj.brand = { $in: brands.split(",") };
    if (filterword) findObj.name = { $regex: filterword, $options: "i" };

    let sortObj = {};
    if (!sort) sortObj = { _id: -1 };
    if (sort === "price") sortObj = { price: sortorder === "down" ? -1 : 1 };
    if (sort === "alphabet") sortObj = { name: sortorder === "down" ? -1 : 1 };

    Product.count(findObj).then((count) =>
      Product.find(findObj)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort(sortObj)
        .lean()
        .exec((err, products) => {
          if (err) {
            res.status(400).json({ succes: false });
          } else {
            const newProducts = products.map((product) => ({
              ...product,
              image: product.image
                ? `http://localhost:${cfg.port}/` + product.image
                : "",
            }));
            res.json({
              products: newProducts,
              count,
            });
          }
        })
    );
  },
  deleteProduct: (req, res) => {
    const { id } = req.body;

    Product.deleteOne(
      {
        _id: id,
      },
      (err) => {
        if (err) {
          res.status(400).json({ succes: false });
        } else {
          res.status(201).json({
            succes: true,
          });
        }
      }
    );
  },
  changeProduct: (req, res) => {
    const {
      name,
      volume,
      weight,
      price,
      category,
      subCategory,
      brand,
      description,
      _id,
    } = req.body;
    categoriesController.changeCategories(category, subCategory, brand);

    let productUpdateObj = {
      name,
      volume,
      weight,
      price,
      category,
      subCategory,
      brand,
      description,
    };

    if (req.file) {
      productUpdateObj.image = req.file.path;
    }

    Product.updateOne({ _id }, { $set: productUpdateObj }, (err, product) => {
      if (err) {
        console.log(err);
        res.status(400).json({ succes: false });
      } else {
        res.json({ product });
      }
    });
  },
};

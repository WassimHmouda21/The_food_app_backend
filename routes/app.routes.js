const productsController = require("../controllers/products.controller");
const categoriesController = require("../controllers/categories.controller");
const express  = require('express');
const Router = express.Router();

Router.post("/category", categoriesController.create);
Router.get("/category", categoriesController.findAll);
Router.get("/category/:id", categoriesController.findOne);
Router.put("/category/:id", categoriesController.update);
Router.delete("/category/:id", categoriesController.delete);


Router.post("/product", productsController.create);
Router.get("/product", productsController.findAll);
Router.get("/product/:id", productsController.findOne);
Router.get("/product/category/:categoryName", productsController.findByCategory);
Router.put("/product/:id", productsController.update);
Router.delete("/product/:id", productsController.delete);

module.exports = Router;
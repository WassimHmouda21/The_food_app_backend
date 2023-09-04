const productServices = require("../services/products.service");
const upload = require("../middlewares/product.upload");

exports.create = (req, res, next) => {
    upload(req, res, function (err)  {
        if(err) {
            next(err);
        }
        else {
            const path =
            req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                productname: req.body.productname,
                category: req.body.category,
                description: req.body.description,
                price: req.body.price, 
                productimage: path != "" ? "/" + path : "" ,
                productType: req.body.productType,
            }

            productServices.createProduct(model, (error,results) => {            
               if(error) {
                return next(error);
               } 
               else {

                results.productId = results._id.toString(); // Convert _id to productId
                delete results._id; // Remove _id
                return res.status(200).send({
                    message: "Success",
                    data: results,

                });
               }
            });
        }
    }
)}

exports.findAll = (req, res, next) => {
    var model = {
         productname : req.query.productname,
         categoryId : req.query.categoryId,
        //  pageSize : req.query.pageSize,
        //  page : req.query.page,
    };

    productServices.getProducts(model, (error, results) => {
        if (error) {
            return next(error);
        }
           else {
            const transformedResults = results.map(result => {
                result.productId = result._id.toString(); // Convert _id to productId
                delete result._id; // Remove _id
                delete result.__v; // Remove __v
                return result;
            });

            return res.status(200).send({
                message: "Success",
                data: transformedResults,
            });
           }
        });
   
}

exports.findOne = (req, res, next) => {
    var model = {
         productId : req.params.id,
 
    };

    productServices.getProductById(model, (error, results) => {
        if (error) {
            return next(error);
        }
           else {
            return res.status(200).send({
                message: "Success",
                data: results,

            });
           }
        });
   
}


exports.findByCategory = (req, res, next) => {
    const categoryName = req.params.categoryName; // Assuming you get the categoryName from the request

    productServices.getProductsByCategory(categoryName, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};





exports.update = (req, res, next) => {
    upload(req, res, function (err)  {
        if(err) {
            next(err);
        }
        else {
            const path =
            req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                productId: req.params.id,
                productname: req.body.productname,
                category: req.body.category,
                description: req.body.description,
                price: req.body.price, 
                productType: req.body.productType,
                productimage: path != "" ? "/" + path : "" 
            }

            productServices.updateProduct(model, (error,results) => {            
               if(error) {
                return next(error);
               } 
               else {
                return res.status(200).send({
                    message: "Success",
                    data: results,

                });
               }
            });
        }
    }
)}

exports.delete = (req, res, next) => {
    var model = {
         productId : req.params.id,
 
    };

    productServices.deleteProduct(model, (error, results) => {
        if (error) {
            return next(error);
        }
           else {
            return res.status(200).send({
                message: "Success",
                data: results,

            });
           }
        });
   
}


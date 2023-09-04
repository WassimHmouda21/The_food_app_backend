const categoriesServices = require("../services/categories.service");
const upload = require("../middlewares/category.upload");

exports.create = (req, res, next) => {
    upload(req, res, function (err)  {
        if(err) {
            next(err);
        }
        else {
            const path =
            req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                categoryname: req.body.categoryname,
                categorydescription: req.body.categorydescription,
                categoryimage: path != "" ? "/" + path : "" ,
               
            };

            categoriesServices.createCategory(model, (error,results) => {            
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
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        categoryname : req.query.categoryname,
         
    };

    categoriesServices.getCategory(model, (error, results) => {
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

exports.findOne = (req, res, next) => {
    var model = {
        categoryId: req.params.id, // Use 'categoryId' here
    };

    categoriesServices.getCategoryById(model, (error, results) => {
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

            productServices.updateCategory(model, (error,results) => {            
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
         categoryId : req.params.id,
 
    };

    categoriesServices.deleteCategory(model, (error, results) => {
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
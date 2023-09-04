const { category } = require("../models/category.model");
const { product} = require("../models/product.model");
// const { Mongo_DB_CONFIG } = require("../config/app.config.js");



async function createProduct(params, callback) {
    if(!params.productname) {
        return callback(
            {
                message: "Product name required",
            },


        );
    }
    if(!params.category) {
        return callback(
            {
                message: "Category required",
            },


        );
    }

    const productModel = new product(params);
    productModel.save()
    .then((response) => {
        response.productId = response._id.toString(); // Convert _id to productId
        delete response._id; // Remove _id
        delete response.__v; // Remove __v

        return callback(null, response)
    })
    .catch((error) => {
        return callback(error);
    });


}

async function getProducts(params, callback) {
    const productname = params.productname;
    const categoryId = params.categoryId;
    var condition = {};

    if(productname) {
        condition["productname"] = {
            $regex: new RegExp(productname), $options: "i", };

        }
        if (categoryId) {
            condition["category"] = categoryId;
        }
    
        try {
            const results = await product
                .find(condition, "productname description price productimage productType category")
                .populate("category", "categoryname categorydescription categoryimage")
                .lean();
            
            return callback(null, results);
        } catch (error) {
            return callback(error);
        }
    }



async function getProductById(params, callback) {
    const productId = params.productId;
   

    product
        .findById(productId ) // Assuming you have a 'category' field in your product schema
        .populate("category", "categoryname categorydescription categoryimage")
        .then((response) => {
            return callback(null, response)
        })
        .catch((error) => {
            return callback(error);
        });
        
}

async function getProductsByCategory (categoryName, callback)  {
    product.find({ category: categoryName }, callback);
};



async function updateProduct(params, callback) {
    const productId = params.productId;
   
    product
    .findByIdAndUpdate(productId, params, {useFindAndModify: false})
 
    .then((response) => {
        if(!response) {
            callback(`Cannot update Product with id ${productId}`)
        }
        else callback(null, response)
        
        
    })
    .catch((error) => {
        return callback(error);
    });
    
}

async function deleteProduct(params, callback) {
    const productId = params.productId;
   
    product
    .findByIdAndRemove(productId)
 
    .then((response) => {
        if(!response) {
            callback(`Cannot update Product with id ${productId}`)
        }
        else callback(null, response)
        
        
    })
    .catch((error) => {
        return callback(error);
    });
    
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    getProductsByCategory,
    updateProduct,
    deleteProduct
};
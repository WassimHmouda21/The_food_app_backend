const { category} = require("../models/category.model");

async function createCategory(params, callback) {
    if(!params.categoryname) {
        return callback(
            {
                message: "Category name required",
            },


        );
    }
   

    const model = new category(params);
    model.save()
    .then((response) => {
        return callback(null, response)
    })
    .catch((error) => {
        return callback(error);
    });


}


async function getCategory(params, callback) {
    const categoryname = params.categoryname;
     var condition = categoryname ? {

 
        categoryName:  { $regex: new RegExp(categoryname), $options: "i" }}
         : {};
        
   

    category
    .find(condition, " categoryname categorydescription categoryimage")
    .then((response) => {
        return callback(null, response)
    })
    .catch((error) => {
        return callback(error);
    });
    
}



async function getCategoryById(params, callback) {
    const categoryId = params.categoryId;

    category
    .findById(categoryId)
    .then((response) => {
        if (!response) callback("Not found category with Id" + categoryId);
        else callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}


async function updateCategory(params, callback) {
    const categoryId = params.categoryId;
   
    category
    .findByIdAndUpdate(categoryId, params, {useFindAndModify: false})
 
    .then((response) => {
        if(!response) {
            callback(`Cannot update category with id ${productId}`)
        }
        else callback(null, response)
        
        
    })
    .catch((error) => {
        return callback(error);
    });
    
}

async function deleteCategory(params, callback) {
    const categoryId = params.productId;
   
    category
    .findByIdAndDelete(categoryId)
 
    .then((response) => {
        if(!response) {
            callback(`Cannot update category with id ${categoryId}`)
        }
        else callback(null, response)
        
        
    })
    .catch((error) => {
        return callback(error);
    });
}

module.exports = {
    createCategory,
    getCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};
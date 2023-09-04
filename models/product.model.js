const mongoose = require("mongoose");

const product = mongoose.model(
    "Product",
    mongoose.Schema(
        {
            productname: {
                type: String,
                required: true,
                unique: true,
            },
            
                category: {
                    type: String,
                    ref:"Category",
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                productimage: {
                    type: String,
                    required: true,
                },
                productType: {
                    type: String,
                    required: false,
                    default: "fast_food"
                }
                }, {
                    toJSON: {
                        transform: function (doc, ret) {
                            ret.productId = ret._id.toString();
                            delete ret._id;
                            delete ret._v;
                        }
                  }
            

        }
        )
    
);

module.exports = {product}
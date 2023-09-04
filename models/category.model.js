const mongoose = require("mongoose");

const category = mongoose.model(
    "Category",
    mongoose.Schema({
        categoryname: {
            type: String,
            required: true,
            unique: true,
        },
      
            categorydescription: {
                type: String,
                required: true,
            },
          
            categoryimage: {
                type: String,
            },

    }, {
        toJSON: {
            transform: function (doc, ret) {
                // Do not modify the _id field
                delete ret._v;
            },
        },
    }
)
);

module.exports = {
    category,
};

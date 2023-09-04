const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        required: true,
        type: String,
        trim: true,

    },
    email: {
        required: true,
        type: String,
        trim: true,
     
    },
    password: {
        required: true,
        type: String,
     
    }, 
    birth: {
        required: true,
        type: Date,
     
    },
    adress: {
        
        type: String,
        default: '',     
    },
});

const User = mongoose.model('User' , userSchema);
module.exports = User;

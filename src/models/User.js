const mongoose = require('mongoose');

const validator = require('validator');


const User = mongoose.model('User', {
    name : {
        type :String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        validate(value) {
           
            if(!validator.isEmail(value)) {
                throw new Error("invalid Email");
            }
        }
    }
})

module.exports = User;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');


const userSchema = mongoose.Schema({
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
    },
    password : {
        type : String,
        required : true,
        minlenght : 7,
        trim : true,
        validator(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age : {
        type : Number,
        default : 0,
        validator(value) {
            if(value < 0) {
                throw new Error('Age mustttt be a postive number')
            }
        }
    }
})

userSchema.pre('save' ,async function(next) {
    const user  = this;
    if(user.isModified('password')) {
    //console.log("this moongoos midleware =>",user,user.isModified('password'))
        user.password = await bcrypt.hash(user.password,8)
        console.log(user.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;
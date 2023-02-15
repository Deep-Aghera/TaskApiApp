const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name : {
        type :String,
        required : true,
    },
    email : {
        type : String,
        unique : true,
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
    },
    tokens : [{
        token : {
            type:String,
            required : true
        }
    }]
})


userSchema.virtual('tasks', {
   ref : 'Task',
   localField : '_id',
   foreignField : 'owner'
   
    
})

userSchema.methods.toJSON=  function() {
    const user = this
    const userObject = user.toObject();
     
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id : user._id.toString()},'thisismynewcourse')
    user.tokens = await user.tokens.concat({ token })
    await user.save()
    return token;
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error("Unable to login")
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        throw new Error('Unable to login');
    }

    return user
}


userSchema.pre('save' ,async function(next) {
    const user  = this;
    if(user.isModified('password')) {
    //console.log("this moongoos midleware =>",user,user.isModified('password'))
        user.password = await bcrypt.hash(user.password,8)
        //console.log(user.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User;
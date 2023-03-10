const mongoose = require('mongoose');
const validate = require('validator');

const taskSchema = mongoose.Schema({
    description : {
        type : String,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner: {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }

})

    taskSchema.pre('save',async function(next) {
        const task = this
        console.log(task);
       
        next();
        
    })


const Task = mongoose.model('Task',taskSchema)

module.exports = Task;
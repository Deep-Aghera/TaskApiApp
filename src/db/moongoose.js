const mongoose = require('mongoose');
const validator = require('validator')

let temp = mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')

// const user = new User({name : "Deep",email : "deepagheragmail.com"})
// user.save().then((data) => {
//     console.log("data stored successfully",data);
// }).catch((error) => console.log("hmm something wrong",error))
// const cat = mongoose.model('cat',{name : {
//     type : Number,
//     required: true
// }});
// const kity = new cat({});
// kity.save().then((data) => console.log('mewwwoo',data)).catch((error) => {console.log("hellow err",error)})

console.log(temp);
const express = require('express');
const app = express();
require('./db/moongoose')

const port = process.env.PORT || 3000;


// >>>>>>>>>>>>>>>>   router <<<<<<<<<<<<<<<<<<<
const userRouter = require('./router/user');
const taskRouter = require('./router/task');


const multer = require('multer');
const upload = multer({
    dest : 'images',
    limits :  {
        fileSize : 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.endsWith('.pdf')) {
            return cb(new Error('Please upload a pdf'))
        }
        cb(undefined,true)
    }
})

app.post('/upload',upload.single('upload'),(req,res) => {
    
    res.send()
})






//console.log(User)
app.use(express.json())
// app.use((req,res,next) => {
//     console.log(req.method,req.url);
//    res.status(505).send("currently services not available");
// })
app.use(userRouter);
app.use(taskRouter)






app.listen(3000,() => {
    console.log(`server started at ${port}`)
})

// const jwt = require('jsonwebtoken');
// const { rawListeners } = require('./models/User');

// const myFunction = async () => {
//     const token = jwt.sign({_id : 'abc123'},'thisismynewcourse',{expiresIn : "7 days"});
//     console.log("token value =",token);
// }

// myFunction();
const express = require('express');
const app = express();
require('./db/moongoose')

const port = process.env.PORT || 3000;


// >>>>>>>>>>>>>>>>   router <<<<<<<<<<<<<<<<<<<
const userRouter = require('./router/user');
const taskRouter = require('./router/task');

//console.log(User)
app.use(express.json())

app.use(userRouter);
app.use(taskRouter)





app.listen(3000,() => {
    console.log(`server started at ${port}`)
})

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    const token = jwt.sign({_id : 'abc123'},'thisismynewcourse',{expiresIn : "7 days"});
    console.log("token value =",token);
}

myFunction();
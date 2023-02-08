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
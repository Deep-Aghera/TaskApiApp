const express = require('express');
const app = express();
require('./db/moongoose')

const port = process.env.PORT || 3000;

//  >>>>>>>>>>>>>>   models   <<<<<<<<<<<<<<<
const User = require('./models/User');
const Task = require('./models/Task');


console.log(User)
app.use(express.json())
app.post('/user',async (req,res) => {
    //console.log(req.body);
    const user = new User(req.body);
    try {
        await user.save();
        return res.send(user);
    } catch (error) {
        res.status(400).send(error)
        
    }

    
    // user.save().then((data) => { 
    //     console.log("added",user) 
    //    return res.send(user);
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
   // return res.send("thank you")
})

app.post('/tasks',async (req,res) => {
   
    const task = new Task(req.body);

    try {
        await task.save()
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then((data) => {
        
    // }).catch((e) => {
        
    // })
    //res.send("task is recored")
})

app.get('/users',async (req,res) => {
    try {
        let data = await User.find({});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(e);
    }
    //  User.find({}).then((data) => {
    //     res.status(200).send(data); 
    // }).catch((e) => {
    //     res.status(500).send(e);
    // });
    //console.log(user)
    //res.send("gotchaa")
})

app.get('/users/:id',async (req,res) => {
   // console.log(req.params);
    const _id = req.params.id;

    try {
        let user = await User.findById(_id);  
        if(!user) {
            return res.status(404).send("data is not available");
        }
        //console.log(data);
        res.status(302).send(user)
    } catch (error) {
        res.status(400).send(error);
    }

   

    // User.findById(_id).then((data) => {
       
    // }).catch((e) => {
    //     //console.log(e)
        
    // })
    // //res.send()
})

app.patch('/user/:id',async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error : "Invalid updates!"});
    }


    try {
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new : true, runValidators: true });
        if(!user) {
            return res.status(404).send();
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks',async (req,res) => {
    try {
        let data = await Task.find({});
        res.send(data)
    } catch (error) {
        res.send(error);
    }
    // Task.find({}).then((data) => {
    //     return res.send(data)
    // }).catch((e) => {
    //     return res.send(e);
   // })
   // res.send('hello')
})

app.get('/task/:id',async (req,res) => {
    console.log(req.params);
    const _id = req.params.id;
    try {
        let task = await Task.findById(_id);
        if(!task){
            return res.status(404).send("User not found")
        }
        res.send(task);
        
    } catch (error) {
        res.status(404).send(error);
    }
    // Task.findById(_id).then((data) => {
    //     if(!data){
    //         return res.status(404).send("User not found")
    //     }
    //     res.send(data);
    // }).catch((error) => {
        
    // })
    //res.send("got id");
})

app.patch('/task/:id',async (req,res) => {
   
   const update = Object.keys(req.body);
   const allowedUpdates = ['description','completed'];
   const isValidOperation = update.every((update) => allowedUpdates.includes(update));
   if(!isValidOperation) {
    res.send({error : "invalid updates"});
   }
   
   try {
    let task = await Task.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators : true })
    console.log(task);
    if(!task) {

        return res.send({error : "recored not found"})
    }
    res.send(task);
} catch (error) {
    res.status(400).send(error)
   }
   // res.send(task);
})

app.listen(3000,() => {
    console.log(`server started at ${port}`)
})
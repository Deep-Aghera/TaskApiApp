const express = require('express');
const router = new express.Router();

//  >>>>>>>>>>>>>>   models   <<<<<<<<<<<<<<<

const Task = require('../models/Task');


router.post('/tasks',async (req,res) => {
   
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


router.get('/tasks',async (req,res) => {
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

router.get('/task/:id',async (req,res) => {
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

router.patch('/task/:id',async (req,res) => {
   
   const updates = Object.keys(req.body);
   const allowedUpdates = ['description','completed'];
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
   if(!isValidOperation) {
     return res.status(400).send({error : "invalid updates"});
   }
   
   try {
    //let task = await Task.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators : true })
    let task = await Task.findById(req.params.id);
    if(!task) {

        return res.send({error : "recored not found"})
    }
    updates.forEach((update) => {
        task[update] = req.body[update]
    })
    await task.save();
    res.send(task);
} catch (error) {
     return res.status(400).send(error)
   }
   // res.send(task);
})



router.delete("/task/:id",async (req,res) => {
    
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
       // console.log(task)
        if(!task) {
            return res.status(402).send();
        }
       res.send(task)
    } catch (error) {
        return res.status(400).send(error);
    }

})


module.exports = router;
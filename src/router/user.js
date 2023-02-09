const express = require('express');
const router = new express.Router();


//  >>>>>>>>>>>>>>   models   <<<<<<<<<<<<<<<
const User = require('../models/User');


router.get('/test',(req,res) => {
    res.send('form a new file')
})


router.post('/user',async (req,res) => {
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


router.get('/users',async (req,res) => {
    try {
        let data = await User.find({});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
    //  User.find({}).then((data) => {
    //     res.status(200).send(data); 
    // }).catch((e) => {
    //     res.status(500).send(e);
    // });
    //console.log(user)
    //res.send("gotchaa")
})

router.get('/users/:id',async (req,res) => {
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

router.patch('/user/:id',async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error : "Invalid updates!"});
    }


    try {
       // const user = await User.findByIdAndUpdate(req.params.id,req.body,{ new : true, runValidators: true });
       const user = await User.findById(req.params.id);
        
        updates.forEach((update) =>  user[update] = req.body[update])

        await user.save()

        if(!user) {
            return res.status(404).send();
        }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete("/user/:id",async (req,res) => {
    console.log(req.params.id)
    try {
     const user = await User.findByIdAndDelete(req.params.id);    
     if(!user) {
        return res.status(404).send("Not found ");
     }
     res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
   

})


module.exports = router;
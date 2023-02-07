require('../src/db/moongoose');
const Task = require('../src/models/Task');


Task.find({}).then((task) => {
    console.log(task)
    
}).catch((e) => {
    console.log(e)
})





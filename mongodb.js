const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL,{useNewUrlParser : true},(error,client) => {
    if(error) {
        return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);
    db.collection('users').insertOne({
        name : 'deep',
        age : 23
    },(error,result) => {
        if(error) {
            return console.log("Unable to insert user");
        }
        else {
            return console.log("this is data",result)
        }
    })
    console.log("database connected successfully",db);
})
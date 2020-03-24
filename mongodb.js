//CRUD operation -> create read update and delete

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Client configuration failed!!!");
    }
    
    const db = client.db(databaseName);

    //inserts many documents into single collection of database

    db.collection('tasks').insertMany([
        {
            description: 'Create weather application',
            completed: true
        },
        {
            description: 'Learn mongodb',
            completed: false
        },
        {
            description: 'Learn promises and asynchronous function',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log("Unable to insert task");
        }
        console.log(result.ops);
    })
})
//CRUD operation -> create read update and delete

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';


MongoClient.connect(connectionURL, { useNewUrlParser: true }, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log("Client configuration failed!!!");
    }
    
    const db = client.db(databaseName);

    // //inserts many documents into single collection of database

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Create weather application',
    //         completed: true
    //     },
    //     {
    //         description: 'Learn mongodb',
    //         completed: false
    //     },
    //     {
    //         description: 'Learn promises and asynchronous function',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert task");
    //     }
    //     console.log(result.ops);
    // })

    // //reading a document of the database

    // db.collection('tasks').findOne({ _id: new ObjectID('5e799590a8bd6c31fc851c82') }, (error, task) => {
    //     if (error) {
    //         return console.log("Unable to fetch user");
    //     }
    //     console.log(task);
    // })

    // //reading the documents of the database

    // db.collection('tasks').find( { completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log("No users found of that age");
    //     }

    //     console.log(tasks);
    // });

    // // getting the count only of the matching documents
    // db.collection('tasks').find( { completed: false } ).count((error, count) => {
    //     if (error) {
    //         return console.log("No users found of that age");
    //     }
    //     console.log(count);
    // });

    // //updating single documents on the basis of id
    // db.collection('users').updateOne(
    //     {
    //         _id: new ObjectID('5e799394bc780a314cb4027c')
    //     },
    //     {
    //         $set : {
    //             name: 'Susan'
    //         },
    //         $inc: {
    //             age: 1
    //         }
    //     }
    // ).then((result) => console.log(result))
    // .catch((error) => console.log(error));

    // //upadating many documents of the databases
    // db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }
    // ).then((result) => console.log(result.modifiedCount))
    // .catch((error) => console.log(error));

    //deleting a document from the collection of the database and use deleteMany for deleting many documents from the collection
    db.collection('users').deleteOne(
        {
            name: 'Susan'
        }
    ).then((result) => console.log(result))
    .catch((error) => console.log(error));
})
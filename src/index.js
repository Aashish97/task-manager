const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save()
    .then(()=> res.status(201).send(user))
    .catch( e => res.status(400).send(e));
});

app.get('/users', (req, res) => {
    User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send());
});

// :id provides the dynamic content that the users will provide as user_id
app.get('/users/:id', (req, res) => {

    const _id = req.params.id;
    User.findById(_id)
    .then( user => res.send(user))
    .catch(() => res.status(404).send())
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save()
    .then(() => res.status(201).send(task))
    .catch( e => res.status(400).send(e))
})

app.listen(port, () => {
    console.log("server is listening at port " + port);
})
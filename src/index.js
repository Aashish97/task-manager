const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    }catch{
        res.status(400).send();
    }
});

app.get('/users', async (req, res) => {

    try{
        const users = await User.find({});
        res.send(users);
    }catch{
        res.status(500).send();
    }
});

// :id provides the dynamic content that the users will provide as user_id
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try{
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        
        res.send(user)
    }catch{
        res.status(500).send();
    }
})

// Updating the users with given id
app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if(!isValidUpdate){
        return res.send({ error: 'Invalid field for update' });
    }

    try{

        // The parameter new: true creates a new user before the updating and runValidators validates the updated contents
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }
        
        res.send(user)
    }catch(e) {
        res.status(400).send(e);
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try{
        await task.save();
        res.status(201).send(task);
        
    }catch{
        res.status(400).send();
    }
})

app.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch{
        res.status(500).send();
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try{
        const task = await Task.findById(_id);

        if(!task){
            return res.status(404).send();
        }
        res.send(task);

    }catch{
        res.status(500).send();
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if(!isValidUpdate){
        return res.send({ error: 'Invalid field for update' });
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task) {
            return res.status(404).send();
        }
        
        res.send(task);
    }catch(e) {
        res.status(400).send(e);
    }
})

app.listen(port, () => {
    console.log("server is listening at port " + port);
})
const express = require('express');
const User = require('./../models/user');

const router = new express.Router();


router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).send(user);
    }catch{
        res.status(400).send();
    }
});

router.get('/users', async (req, res) => {

    try{
        const users = await User.find({});
        res.send(users);
    }catch{
        res.status(500).send();
    }
});

// :id provides the dynamic content that the users will provide as user_id
router.get('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
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

//deleting the user by id
router.delete('/users/:id', async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send();
        }

        res.send(user);
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;

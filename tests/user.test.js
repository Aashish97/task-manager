const request = require('supertest');
const app = require('./../src/app');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./../src/models/user');

const userOneId = new mongoose.Types.ObjectId;

const userOne = {
    _id: userOneId,
    name: 'Bishal',
    email: 'bishal@gmail.com',
    password: 'Bishal123!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach( async () => {
    await User.deleteMany();
    await new User(userOne).save();
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Aashish',
        email: 'aashish@gmail.com',
        password: 'Aashish123!'
    }).expect(201)
})

test('Should login a existing user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('Shouldn"t login a unauthorized user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'dorna1234'
    }).expect(400)
})

test('Should get a profile for user', async () => {
    await request(app).get('/users/me')
    .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
    .send().expect(200);
})

test('Should not get a profile for unauthenticated user', async () => {
    await request(app).get('/users/me').send().expect(401);
})

test('Should delete a profile for user', async () => {
    await request(app).delete('/users/me')
    .set('Authorization', `Bearer ${ userOne.tokens[0].token }`)
    .send().expect(200);
})

test('Should not get a profile for unauthenticated', async () => {
    await request(app).delete('/users/me').send().expect(401);
})
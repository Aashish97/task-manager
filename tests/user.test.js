const request = require('supertest');
const app = require('./../src/app');
const User = require('./../src/models/user');

const userOne = {
    name: 'Bishal',
    email: 'bishal@gmail.com',
    password: 'Bishal123!'
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
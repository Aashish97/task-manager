const request = require('supertest');
const app = require('./../src/app');

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Aashish',
        email: 'aashish@gmail.com',
        password: 'Aashish123!'
    }).expect(201)
})

const request  = require('supertest')
const app = require('./app')

test('doit créer un nouvel utilisateur ', async() => {
    const userData = {
        email: 'test@example.com',
        name: 'John Doe',
        userId: '12345',
        wallet: 0,
        notification: true,
      };
    return request(app)
    .post('/createuser')
    .set('Authotization', 'Bearer TOKEN')
    .send(userData)
    .expect(201)
})
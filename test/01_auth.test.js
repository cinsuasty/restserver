const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const testAuthLogin = {
    "correo": "test2@test.com",
    "password": "1234562"
};

const testAuthLoginGoogle = {
    "id_token": "abc123"
};

describe('[AUTH] esta es la prueba de /api/auth', ()=>{
    test('esto deberia retornar un 404', async ()=>{

        await api
        .post('/api/auth/login')
        .send(testAuthLogin)
        .expect(404);
    });

    test('esto deberia retornar un 400', async ()=>{
        await api
        .post('/api/auth/google')
        .send(testAuthLoginGoogle)
        .expect(400);
    });
});

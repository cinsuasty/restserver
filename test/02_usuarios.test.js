const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Usuario = require('../models/usuario');


const testRegisterUser = {
    "nombre":"test",
    "correo": "test@test.com",
    "password": "123456",
    "rol": "ADMIN_ROLE"
};

const testUpdateUser = {
    "nombre":"test2",
    "correo": "test2@test.com",
    "password": "1234562",
    "rol": "USER_ROLE"
};

beforeAll( async () => {
 await Usuario.deleteMany();
})

describe('[AUTH] esta es la prueba de /api/usuarios', ()=>{

    test('Crear usuario: Esto deberia retornar un 200', async ()=>{
        await api
        .post('/api/usuarios')
        .send(testRegisterUser)
        .expect(200);
    });

    test('Actualizar usuario: Esto deberia retornar un 200', async ()=>{
        const usuario = await Usuario.findOne({nombre: 'test'});
        await api
        .put(`/api/usuarios/${usuario._id}`)
        .send(testUpdateUser)
        .expect(200);
    });
    
    test('Eliminar usuario: Esto deberia retornar un 401', async ()=>{
        const usuario = await Usuario.findOne({nombre: 'test2'});
        await api
        .delete(`/api/usuarios/${usuario._id}`)
        .expect(401);
    });

    test('Listar usuarios: Esto deberia retornar un 200', async ()=>{
        await api
        .get(`/api/usuarios`)
        .expect(200);
    });

});





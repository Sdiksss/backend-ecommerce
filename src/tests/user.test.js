const request = require('supertest');
const app = require('../app');



test('POST /users debe de crear un usuario', async () => {
    const body = {
        firstName: 'test',
        lastName: 'testLastName',
        email: 'test@gmail.com',
        password: 'test123',
        gender: 'MALE',
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.id).toBeDefined();
})
test('POST /users/login debe de retornar un token',  async() => {
    const body = {
        email: "test@gmail.com",
        password: "test123"
    }
    const res = await request(app).post(`/users/login`).send(body)
    token = res.body.token;
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()  
})
test('POST /users/login debe retornar 401 con credenciales incorrectas', async() => {
    const body = {
        email: "123@gmail.com",
        password: "err123"
    }
    const res = await request(app).post(`/users/login`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(401)
  
})


test('GET /users debe traer todos los usuario', async () => {
    const res = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array);
});


test('PUT /users/:id debe de actualizar un usuario ', async () => {
    const body = {
        firstName: 'testUpdate',
        lastName: 'testLastName',
        email: 'test@gmail.com',
        gender: 'MALE', 
    }
    const res = await request(app).put(`/users/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200); 
    expect(res.body.firstName).toBe(body.firstName)
})




test('DELETE /users/:id debe de eliminar un usuario ', async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
  
})




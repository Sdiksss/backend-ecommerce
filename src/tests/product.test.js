const request = require('supertest')
const app = require('../app')

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: 'test2@gmail.com',
        password: 'test123'
    })
    token = res.body.token;
})

test('GET  /products', async () => {
    const res = await request(app).get('/products')
    expect(res.body).toBeInstanceOf(Array)
    expect(res.status).toBe(200)
})

test('POST /products ', async () => {
    const body = {
        "title": "product.title",
        "price": "product.price",
        "stock": "5",
        "description": "product.description",
        "image": "product.image",
        "categoryId": null
    }
    const res = await request(app).post('/products')
        .send(body)
        .set('Authorization', `Bearer ${token}`)
    id = (await res).body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined()
})

test('DELETE /products/:id', async() => {
    const res = await request(app).delete(`/products/${id}`)
        .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
  
})


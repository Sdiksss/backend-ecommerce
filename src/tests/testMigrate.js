const sequelize = require('../utils/connection');
const request = require('supertest')
const app = require('../app')

const main = async () => {
    try {
        // Acciones a ejecutar antes de los tests
        sequelize.sync();

        const user = {
            firstName: 'testV2',
            lastName: 'testV2',
            email: "test2@gmail.com",
            password: "test123",
            gender: 'MALE'
        }
        await request(app).post('/users').send(user);

        process.exit();
    } catch (error) {
        console.log(error);
    }
}

main();
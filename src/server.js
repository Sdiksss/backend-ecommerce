const app = require('./app');
const sequelize = require('./utils/connection');

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        sequelize.sync();
        console.log("DB connected");
     app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

    } catch (error) {
        console.log(error)
    }
}

main();

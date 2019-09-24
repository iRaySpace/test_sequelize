const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const sequelize = new Sequelize('sequelize', 'root', '****', {
    host: 'localhost',
    dialect: 'mariadb',
});

const UserModel = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
    }
});

async function testNewUsers() {
    try {
        await UserModel.create({ firstName: 'Ivan', lastName: 'Altomera' });
        await UserModel.create({ firstName: 'Ray', lastName: 'Canete' });
    } catch(error) {
        console.log(error);
    }
}

async function testConnection() {
    try {
        await sequelize.authenticate();
        await UserModel.sync({ force: true });
        await testNewUsers();
    } catch(error) {
        console.log(error);
    }
}

testConnection();
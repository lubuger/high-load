const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
// const { initUser, User } = require('./models/User');

const db = '*';
const user = '*';
const pass = '*';

const sequelize = new Sequelize(db, user, pass, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    // logging: (...msg) => console.log(msg), // Displays all log function call parameters
});

const umzug = new Umzug({
    migrations: { glob: 'src/migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await umzug.down();
        await umzug.up();
        console.log('Migrations applied successfully.');

        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);

        return false;
    }
}

module.exports = {
    connect,
    sequelize,
};
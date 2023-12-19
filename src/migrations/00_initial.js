const { DataTypes } = require('sequelize');
const user = require('../dto/user');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('users', user);
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('users');
}

module.exports = { up, down };
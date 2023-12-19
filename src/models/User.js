const { Model } = require('sequelize');

const user = require('../dto/user');
const { sequelize } = require('../db');


class User extends Model {}

const initUser = () => {
    User.init(user, {
        sequelize,
        timestamps: false,
        tableName: 'users'
    });
};

module.exports = {
    initUser,
    User,
};
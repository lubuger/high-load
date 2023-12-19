const { User, initUser} = require('../models/User');


class UsersController {
    #sequelize = {};
    #users = [];

    constructor(sequelize) {
        this.#sequelize = sequelize;
        initUser();

        this.initDumpUser();
    }

    /**
     * Initializes dump user for testing
     * @return {Promise<void>}
     */
    async initDumpUser() {
        const user = await User.create({
            id: 1,
            name: 'User 1',
            balance: 10000,
        });

        this.#users.push(user);

        console.log('Dump user created successfully.');
    }

    /**
     * Gets User (sequelize) if it's available in-memory
     * @param userId {number}
     * @return {User|null}
     */
    getUser(userId = 1) {
        return this.#users.find(el => Number(el.dataValues.id) === userId);
    }

    /**
     * Updates user balance
     * @param id {number}
     * @param balance {number}
     * @return {boolean}
     */
    updateBalance(id = 1, balance = 0) {
        const user = this.getUser(id);

        if (Number(user.dataValues.balance) > 0) {
            user.dataValues.balance += Number(balance);
        } else {
            return false;
        }

        const query = `
            BEGIN WORK;
                LOCK TABLE users IN ACCESS EXCLUSIVE MODE;
                UPDATE users SET balance = ${user.dataValues.balance} WHERE id = ${user.dataValues.id};
            COMMIT WORK;
            `;

        this.#sequelize.query(query);

        // console.log('results', results);
        // console.log('query', query);
        // console.log('metadata', metadata);

        return true;
    }
}

module.exports = UsersController;
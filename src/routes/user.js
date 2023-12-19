const express = require('express');
const { User } = require('../models/User');
const UsersController = require('../controllers/user');


const router = express.Router();


const Router = (sequelize) => {
    const usersController = new UsersController(sequelize);

    router.use((req, res, next) => {
        next();
    });

    router.get('/', function(req, res) {
        res.send('User homepage');
    });

    router.get('/balance/:userId/:balance', async function (req, res) {
        const id = Number(req.params.userId);
        const user = usersController.getUser(id);

        if (!user) {
            res.status(400);
            res.send('No user found with passed id');

            return false;
        }

        if (!usersController.updateBalance(id, Number(req.params.balance))) {
            res.status(400);
            res.send('Balance is too low');

            return false;
        }

        res.send(user);

        return true;

        // const t = await sequelize.transaction();
        //
        // try {
        //     const userDb = await User.findOne({
        //         where: {
        //             id: req.params.userId,
        //         },
        //         lock: true,
        //         transaction: t
        //     });
        //     let balance = userDb.getDataValue('balance');
        //
        //     if (!userDb) {
        //         throw new Error('Invalid user ID');
        //     }
        //
        //     if (balance + Number(req.params.balance) < 0) {
        //         throw new Error('No balance');
        //     }
        //
        //     balance += Number(req.params.balance);
        //
        //     await User.update({ balance }, {
        //         where: {
        //             id: req.params.userId
        //         },
        //         lock: true,
        //         transaction: t
        //     });
        //
        //     await t.commit();
        //
        //     res.send(JSON.stringify({
        //         amount: balance,
        //     }));
        // } catch (e) {
        //     await t.rollback();
        //
        //     res.status(400);
        //     res.send(e.toString());
        // }
    });

    return router;
};

module.exports = Router;

// xargs -I % -P 10000 curl "http://localhost:3000/user/balance/1/-2"  \
// < <(printf '%s\n' {9999...10000})

// seq 1 10000 | xargs -I % -n1 -P10  curl "http://localhost:3000/user/balance/1/-2"
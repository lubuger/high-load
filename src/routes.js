const UserRouter = require('./routes/user');

const routes = (app, sequelize) => {
    app.get('/', (req, res) => {
        res.send('Hello World!');
    })

    const userRouter = UserRouter(sequelize);

    app.use('/user', userRouter);
};

module.exports = routes;
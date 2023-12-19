const express = require('express');
const { connect } = require('./db.js');
const routes = require('./routes.js');

const app = express();
const port = 3000;

const initExpress = async () => {
    const sequelize = await connect();

    routes(app, sequelize);

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
};

initExpress();


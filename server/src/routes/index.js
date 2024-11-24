const siteRouter = require('./sites');
const usersRouter = require('./users');

function route(app) {
    app.use('/users', usersRouter);

    app.use('/', siteRouter);
}

module.exports = route;

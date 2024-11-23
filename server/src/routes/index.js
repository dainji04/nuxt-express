const siteRouter = require("./sites");

function route(app) {
    app.get("/", siteRouter);
}

module.exports = route;

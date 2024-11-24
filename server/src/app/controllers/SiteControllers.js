const express = require("express");
const router = express.Router();

const { pool } = require("../models/configDb");

class SiteControllers {
    // [GET] /
    home(req, res) {
        res.send("This is Backend");
    }
}

module.exports = new SiteControllers();

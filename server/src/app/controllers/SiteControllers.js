// class SiteControllers {
//     // [GET] /
//     home(req, res) {
//         res.send("home");
//     }
// }

// module.exports = new SiteControllers();

const express = require("express");
const router = express.Router();

const { pool } = require("../models/configDb");

class SiteControllers {
    // [GET] /
    async home(req, res) {
        // pool.query("SELECT * FROM users")
        //     .then((result) => {
        //         res.json(result.recordset);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        try {
            await pool.connect();
            const result = await pool.request().query("SELECT * FROM users");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new SiteControllers();

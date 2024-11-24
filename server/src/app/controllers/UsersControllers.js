const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const { pool } = require("../models/configDb");

class SiteControllers {
    // [GET] /users
    async getUser(req, res) {
        try {
            await pool.connect();
            const result = await pool.request().query("SELECT * FROM users");
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [POST] /users/create
    async postUser(req, res) {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            await pool.connect();
            await pool
                .request()
                .input("email", req.body.email)
                .input("username", req.body.username)
                .input("password", encryptedPassword)
                .input("role", req.body.role)
                .input("createdAt", new Date())
                .input("updatedAt", new Date())
                .input("avatar", req.body.avatar)
                .query(`INSERT INTO users (email, username, password, role, createdAt, updatedAt, avatar)
                    VALUES (@email, @username, @password, @role, @createdAt, @updatedAt, @avatar)`);

            const user = req.body;
            const accessToken = jwt.sign(
                { user },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "2 days" }
            );
            res.json({
                user,
                accessToken,
            });
        } catch (err) {
            console.error("Error creating user: ", err);
            if (!res.headersSent) {
                res.status(500).json({ error: "Internal Server Error" });
            }
        } finally {
            pool.close();
        }
    }
}

module.exports = new SiteControllers();

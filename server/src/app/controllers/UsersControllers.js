const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const { pool } = require('../models/configDb');

class SiteControllers {
    // [GET] /users
    async getUser(req, res) {
        try {
            await pool.connect();
            const result = await pool.request().query('SELECT * FROM users');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    // [POST] /users/create
    async postUser(req, res) {
        let storage = multer.diskStorage({
            destination: function (req, res, cb) {
                cb(
                    null,
                    'D:\\workspace\\nuxtjs\\fullstack\\clients\\static\\avatars'
                );
            },
            filename: function (req, file, cb) {
                cb(null, Date.now + '-' + file.originalname);
            },
        });

        let upload = multer({ storage: storage }).single('avatar');

        let linkAvatar = '';
        let file = req.file;

        if (!file) {
            linkAvatar = req.body.avatar;
        } else {
            linkAvatar = `http://localhost:3000/static/avatars/${req.file.filename}`;
        }

        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        try {
            await pool.connect();
            await pool
                .request()
                .input('email', req.body.email)
                .input('username', req.body.username)
                .input('password', encryptedPassword)
                .input('role', req.body.role)
                .input('createdAt', new Date())
                .input('updatedAt', new Date())
                .input('avatar', req.body.avatar)
                .query(`INSERT INTO users (email, username, password, role, createdAt, updatedAt, avatar)
                    VALUES (@email, @username, @password, @role, @createdAt, @updatedAt, @avatar)`);

            const user = req.body;
            const accessToken = jwt.sign({ user }, process.env.SECRET_KEY, {
                expiresIn: '2 days',
            });
            res.json({
                user,
                accessToken,
            });
        } catch (err) {
            console.error('Error creating user: ', err);
            if (!res.headersSent) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        } finally {
            pool.close();
        }
    }

    // [GET] /users/auth
    async authUser(req, res) {
        const email = req.decoded.user.email;

        try {
            await pool.connect();
            const result = await pool
                .request()
                .input('email', email)
                .query('SELECT * FROM users WHERE email=@email');
            const user = result.recordset[0];

            if (!user) {
                res.status(404).json({ error: 'User not found' });
            } else {
                res.json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = new SiteControllers();

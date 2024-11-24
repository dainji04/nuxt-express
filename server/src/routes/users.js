const express = require('express');
const router = express.Router();

const usersControllers = require('../app/controllers/UsersControllers');
const verifyToken = require('../services/verifyToken');

router.get('/auth', verifyToken, usersControllers.authUser);
router.post('/create', usersControllers.postUser);
router.get('/', usersControllers.getUser);

module.exports = router;

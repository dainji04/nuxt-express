const express = require("express");
const router = express.Router();

const usersControllers = require("../app/controllers/UsersControllers");

router.post("/create", usersControllers.postUser);
router.get("/", usersControllers.getUser);

module.exports = router;

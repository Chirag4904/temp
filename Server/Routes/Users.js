const { Router } = require("express");
const verifyToken = require("../middlewares/Userauth");
const usersController = require("../controllers/UsersController");

const router = Router();

// READ
router.post("/:username", verifyToken, usersController.getUserImages);

module.exports = router;

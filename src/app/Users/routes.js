// Complete Routing of Users using REST principles (GET, POST, DELETE, PUT)

const router = require("express").Router();
const userController = require("./controller");

router.post("/signup",userController.createSignIn);
router.post("/login", userController.createLogin);

module.exports = router;
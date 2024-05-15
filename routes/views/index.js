const {Router} = require("express");
const { getRegisterPage, getLoginPage } = require("../../controller/views");

const router = Router();

router.get("/register", getRegisterPage)

router.get("/login", getLoginPage)

module.exports = router;
const{Router} = require("express");
const{check} = require("express-validator");
const{register} = require("../../controller/api/user");

const router = Router();

router.post("/register", [
    check('username', "Username is required").notEmpty(),
    check('email', "Email is required").notEmpty(),
    check('email', "Please enter a valid email").notEmpty(),
    check('password',"Password is required").notEmpty(),
    check('confirmPassword',"Please confirm your password").notEmpty(),
], register)

module.exports = router;
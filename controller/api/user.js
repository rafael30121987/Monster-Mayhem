const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const db = require("../../config/db");
const {validationResult} = require("express-validator");
const redisClient = require("../../config/redis");
const dotenv = require("dotenv");

dotenv.config();

const jwtSecret = process.env.JWTSECRET || "Secret";

exports.register = (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.redirect("/register?error=" + errors.array()[0].msg)
        }

        const {username, email, password, confirmPassword} = req.body;

        if(password !== confirmPassword){
            return res.redirect("/register?error=Passwords do not match!");
        }

        let query = `SELECT id FROM users WHERE username='${username}' OR email='${email}'`;

        db.query(query, async (err, result) => {
            if(err){
                throw err;
            }

            if(result.length > 0){
                return res.redirect("/register?error=Username or email is aleardy taken!");
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            query = `CALL createUser('${username}', '${email}', '${encryptedPassword}')`;

            db.query(query, (err) => {
                if(err){
                    throw err;
                }

                query = `SELECT id FROM users WHERE email='${email}'`;

                db.query(query, (err, result) => {
                    if(err){
                        throw err;
                    }

                    if(result.length === 0){
                        return res.redirect("/register?error=Something went wrong!");
                    }

                    let userId = result[0].id;

                    const payload = {
                        id: userId, username, email
                    };

                    jwt.sign(payload, jwtSecret, (err, token) => {
                        if(err){
                            throw err;
                        }

                        res.cookie("token", token, {maxAge: 100 * 60 * 60 * 24 * 30 * 6, http: true, secure: false, sameSite: "strict"});
                        res.cookie("user_winnings", 0, {maxAge: 100 * 60 * 60 * 24 * 30 * 6, http: true, secure: false, sameSite: "strict"});
                        res.cookie("user_points", 1000, {maxAge: 100 * 60 * 60 * 24 * 30 * 6, http: true, secure: false, sameSite: "strict"});
                        
                        res.redirect("/?success=You have register your user successfully");
                    })
                })
            })
        })

    } catch (err) {
        console.log(err)
        res.redirect("/register?error=Something went wrong!");
    }
}
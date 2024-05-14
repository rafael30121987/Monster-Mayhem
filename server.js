const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db");
const path = require("path");
const redisClient = require("./config/redis")

dotenv.config();

const app = express();

db.connect((err) => {
    if(err){
        console.log(err);
        process.exit(1);
    }
    console.log("Connected to MySQL DataBase...")
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`,))
const express = require("express");
const app = express();
const User = require("../models/user");
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

app.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});
app.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({
            username,
            password: hashPass
        })
        .then(() => {
            res.redirect("/");
        })
        .catch(error => {
            console.log(error);
        })
});
module.exports = app;
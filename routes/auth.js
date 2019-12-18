const express = require("express");
const app = express();
const User = require("../models/user");
// BCrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//Sign up
app.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});
app.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    if (username === "" || password === "") {
        res.render("auth/signup", {
            errorMessage: "Indicate a username and a password to sign up"
        });
        return;
    }
    User.findOne({ "username": username })
        .then(user => {
            if (user !== null) {
                res.render("auth/signup", {
                    errorMessage: "The username already exists!"
                });
                return;
            }

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
        })
        .catch(error => {
            next(error);
        })

});


//Log in
app.get("/login", (req, res, next) => {
    res.render("auth/login");
});

app.post("/login", (req, res, next) => {
    const theUsername = req.body.username;
    const thePassword = req.body.password;

    if (theUsername === "" || thePassword === "") {
        res.render("auth/login", {
            errorMessage: "Please enter both, username and password to sign up."
        });
        return;
    }

    User.findOne({ "username": theUsername })
        .then(user => {
            if (!user) {
                res.render("auth/login", {
                    errorMessage: "The username doesn't exist."
                });
                return;
            }
            if (bcrypt.compareSync(thePassword, user.password)) {
                // Save the login in the session!
                req.session.currentUser = user;
                res.redirect("/");
            } else {
                res.render("auth/login", {
                    errorMessage: "Incorrect password"
                });
            }
        })
        .catch(error => {
            next(error);
        })
});
//Log out
app.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        // cannot access session here
        res.redirect("/login");
    });
});

module.exports = app;
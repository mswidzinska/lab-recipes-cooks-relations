const express = require("express");
const hbs = require("hbs")
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const createError = require('http-errors')
    // const plainPassword1 = "HelloWorld";
    // const plainPassword2 = "helloworld";
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash1 = bcrypt.hashSync(plainPassword1, salt);
    // const hash2 = bcrypt.hashSync(plainPassword2, salt);

// console.log("Hash 1 -", hash1);
// console.log("Hash 2 -", hash2);

// const MongoStore = require("connect-mongo")(session);


let options = {
    useNewUrlParser: true,
    useUnifiedTypology: true
}
mongoose.connect("mongodb://localhost:27017/cookbook", options, (err, connectionInfo) => {
    if (err) console.log(err);
    else console.log("connected to database")
})
app.use(bodyParser.urlencoded({ extended: false }))



app.set('view engine', 'hbs');
var session = require('express-session')
var sessionOptions = {
    secret: 'keyboard cat',
    cookie: {}
}

app.use(session(sessionOptions));
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(__dirname + '/public'));

function protect(req, res, next) {
    if (req.session.currentUser) {
        next();
    } else next(createError(401, "Please log in to view this page"));
}

app.use((req, res, next) => {
    if (req.session.currentUser) {
        res.locals.user = req.session.currentUser;
    }
    next()
})
app.get('/', (req, res, next) => {
    res.render('index');
});
app.use("/", require("./routes/list"));

app.use("/", require("./routes/singleRecipe"));
app.use("/recipes/", protect, require("./routes/deleteRecipe"));
app.use("/create", protect, require("./routes/createRecipe"));
app.use("/edit", protect, require("./routes/editRecipe"));
app.use("/", require('./routes/auth'));
app.use("/", (req, res, next) => {
    next(createError(404, "Page not found"))
})
app.use((err, req, res, next) => {
    console.log(err)
    res.render("error", err)
})


app.listen(3000, () => {
    console.log("Webserver is listening");
})
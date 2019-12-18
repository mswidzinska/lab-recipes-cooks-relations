const express = require("express");
const hbs = require("hbs")
const bodyParser = require('body-parser')
const mongoose = require("mongoose")
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const plainPassword1 = "HelloWorld";
const plainPassword2 = "helloworld";

const salt = bcrypt.genSaltSync(saltRounds);
const hash1 = bcrypt.hashSync(plainPassword1, salt);
const hash2 = bcrypt.hashSync(plainPassword2, salt);

console.log("Hash 1 -", hash1);
console.log("Hash 2 -", hash2);


let options = {
    useNewUrlParser: true,
    useUnifiedTypology: true
}
mongoose.connect("mongodb://localhost:27017/cookbook", options, (err, connectionInfo) => {
    if (err) console.log(err);
    else console.log("connected to database")
})
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    res.render('index');
});
app.use("/", require("./routes/list"));

app.use("/", require("./routes/singleRecipe"));
app.use("/", require("./routes/deleteRecipe"));
app.use("/", require("./routes/createRecipe"));
app.use("/", require("./routes/editRecipe"));
app.use("/", require('./routes/auth'));


app.listen(3000, () => {
    console.log("Webserver is listening");
})
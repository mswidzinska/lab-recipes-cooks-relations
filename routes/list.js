const express = require("express")
const app = express()
const Recipe = require("../models/recipe")

app.get("/recipes", (req, res) => {
    Recipe.find({})
        .then((response) => {
            res.render("recipes/list.hbs", { recipes: response })
        })
        .catch(err => console.log(err))
})

module.exports = app
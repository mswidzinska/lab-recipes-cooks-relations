const express = require("express")
const app = express()
const Recipe = require("../models/recipe")
const Creator = require("../models/cook")
const mongoose = require("mongoose");


app.get("/", (req, res) => {
    Creator.find({})
        .then((creators) => {
            res.render("recipes/recipeCreate.hbs", { creators })
        })
        .catch(err => console.log(err))
})


app.post("/", (req, res) => {
    let newRecipe = {
        title: req.body.title,
        level: req.body.level,
        ingredients: [req.body.ingredients],
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: mongoose.Types.ObjectId(req.body.creator),
        created: req.body.created
    }

    Recipe.create(newRecipe)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
})


module.exports = app
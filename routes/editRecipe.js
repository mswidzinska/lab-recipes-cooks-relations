const express = require("express")
const app = express()
const Recipe = require("../models/recipe")
const Creator = require("../models/cook")
const mongoose = require("mongoose")


app.get("/:id", (req, res) => {
    Recipe.find({ _id: req.params.id })
        .then((result) => {
            Creator.find({})
                .then((creators) => {
                    res.render("recipes/editRecipe.hbs", { recipe: result[0], creators: creators })
                })

        })
        .catch(err => console.log(err))
})


app.post("/", (req, res) => {
    let recipeId = req.body.id
    let updatedRecipe = {
        title: req.body.title,
        level: req.body.level,
        ingredients: [req.body.ingredients],
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: mongoose.Types.ObjectId(req.body.creator),
    }

    Recipe.findByIdAndUpdate(recipeId, updatedRecipe, { new: true })
        .then((newRecipe) => {
            res.redirect(`/recipes/${newRecipe.id}`)
        })
        .catch(err => console.log(err))
})


module.exports = app
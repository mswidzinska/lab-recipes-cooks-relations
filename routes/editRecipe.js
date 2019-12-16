const express = require("express")
const app = express()
const Recipe = require("../models/recipe")

app.get("/edit/:id", (req, res) => {
    Recipe.find({ _id: req.params.id })
        .then((result) => {
            res.render("recipes/editRecipe.hbs", { recipe: result[0] })
        })
        .catch(err => console.log(err))
})


app.post("/edit", (req, res) => {
    let recipeId = req.body.id
    let updatedRecipe = {
        title: req.body.title,
        level: req.body.level,
        ingredients: [req.body.ingredients],
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator
    }

    Recipe.findByIdAndUpdate(recipeId, updatedRecipe, { new: true })
        .then(result => {
            res.render("recipes/singleRecipe", { recipe: result })
        })
        .catch(err => console.log(err))
})


module.exports = app
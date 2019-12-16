const express = require("express")
const app = express()
const Recipe = require("../models/recipe")
const Cook = require("../models/cook")



// PARAMS METHOD
app.get("/recipes/:id", (req, res) => {
    let recipeId = req.params.id
    Recipe.findById(recipeId)
        .populate("creator")
        .then(recipe => {
            debugger
            res.render("recipes/singleRecipe", { recipe: recipe })
        })
        .catch(err => console.log(err))
})

module.exports = app
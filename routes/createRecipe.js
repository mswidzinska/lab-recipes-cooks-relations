const express = require("express")
const app = express()
const Recipe = require("../models/recipe")

app.get("/create", (req, res) => {
    res.render("recipes/recipeCreate.hbs")
})

app.post("/create", (req, res) => {
    let newRecipe = {
        title: req.body.title,
        level: req.body.level,
        ingredients: [req.body.ingredients],
        cuisine: req.body.cuisine,
        dishType: req.body.dishType,
        image: req.body.image,
        duration: req.body.duration,
        creator: req.body.creator,
        created: req.body.created
    }

    Recipe.create(newRecipe)
        .then(result => {
            res.render("recipes/singleRecipe", { recipe: result })
        })
        .catch(err => console.log(err))
})


module.exports = app
const express = require("express")
const app = express()
const Recipe = require("../models/recipe")

app.get("/recipes/:id/delete", (req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => {
            debugger
            res.redirect('/recipes')
        })
        .catch(err => console.log(err))
})


module.exports = app
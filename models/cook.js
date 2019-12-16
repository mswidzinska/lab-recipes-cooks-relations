const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cook = mongoose.model("cooks", new Schema({
    name: String,
    image: { type: String, default: 'https://www.pngix.com/pngfile/middle/154-1549025_banner-royalty-free-library-barbecue-clipart-cooking-toque.png' },
}))


module.exports = Cook
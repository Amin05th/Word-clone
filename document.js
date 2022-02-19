const {Schema, model} = require("mongoose")

const WordDocument = new Schema({
    _id: String,
    value: String,
})

module.exports = model("WordDocument", WordDocument)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RecetteSchema = new Schema({
    id: ObjectId,
    name: String,
    temps: String,
    howto: String,
    ingredients: Array
})

module.exports = mongoose.model('Recette', RecetteSchema);
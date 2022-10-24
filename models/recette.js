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

const Recette = mongoose.model('Recette', RecetteSchema);

exports.recetteModel = Recette;
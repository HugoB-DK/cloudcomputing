const Recette = require("../models/Recette")

const axios = require('axios')


/**
 * GET Single POST
 * @param id
 */
exports.recette_get_post = (req, res) => {
    Recette.findById(req.params.id, (err, recette) => {
      const requests = []
      const urlList = []


      Recette.findById(req.params.id, (err, recette) => {

        if(!err){

          recette.ingredients.forEach(el => {
            urlList.push(process.env.API_INGREDIENT+el)
          });

          urlList.forEach(url => {
            requests.push(axios.get(url))
          });

          const data = []

          axios.all(requests)
          .then(function(){
            const responses = Array.prototype.slice.call(arguments)
            axios.spread.apply(null, responses)
            .then(function() {
              data = Array.prototype.slice.call(arguments)
            })
            .catch(error => {
              res.send(error)
            })
          })
          .catch(error => {
            res.send(error)
          })

          res.status(200);
          res.send({"recette" : recette, "ingredients": data});
        }
        else{
          res.status(400);
          res.send({"error": "No recipe found", "message": err.message})
        }
      })
    });
}


/**
 * GET ALL POSTS
 */
exports.recette_get_all_post = (req, res) => {
    Recette.find({}, (err, recettes) => {
        if(!err){
          res.status(200);
          res.send(recettes);
        }
        else{
          res.status(400);
          res.send({"error": "No recipe found", "message": err.message})
        }
      });
}

/**
 * CREATE Single POST
 */
exports.recette_create_post = (req, res) => {
  Recette.create({
    name: req.body.name,
    temps: req.body.temps,
    howto: req.body.howto,
    ingredients: req.body.ingredients,
  }, (err, recette) => {
    if(!err){
      res.status(201);
      res.send(recette);
    }
    else{
      res.status(400);
      res.send({"error": "Failed to create a new recipe", "message": err.message})
    }
  })
}

/**
 * DELETE Single POST
 * @param id
 */
exports.recette_delete_post = (req, res) => {
    Recette.findByIdAndDelete(req.params.id, (err, recette) => {
        if(!err){
            res.status(200);
            res.send({"message": "Successfully removed", "recipe": recette});
        }
        else{
            res.status(400);
            res.send({"error": "Failed to delete", "message": err.message})
        }
    })
}
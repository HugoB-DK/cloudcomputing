const axios = require('axios')

const Recette = require("../models/Recette")

module.exports = function(app) {


    //------------------------------------------
    // INDEX
    //------------------------------------------
    app.get('/', function(req, res) {
      res.send("Bienvenue sur l'API des recettes");
    });

    //------------------------------------------
    // GET
    //------------------------------------------

    //ALL RECIPES
    app.get("/recettes", async (req,res,next) => {
        Recette.find({}, (err, recettes) => {
          if(!err){
            axios.get('https://www.example.com').

            res.status(200);
            res.send(recettes);
          }
          else{
            res.status(400);
            res.send({"error": "No recipes found", "message": err.message})
          }
        });
    })

    //BY ID
    app.get("/recette/(:id)", async (req,res,next) => {
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
              console.log(error)
              res.send(error)
            })
          })
          .catch(error => {
            console.log(error)
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
    })

    //------------------------------------------
    // POST
    //------------------------------------------
    app.post("/recette", async (req,res) => {
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
    })

    //------------------------------------------
    // DELETE
    //------------------------------------------
    app.delete("/recette/(:id)", (req, res) => {
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
    })
  }
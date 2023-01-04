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
      Recette.findById(req.params.id, (err, recette) => {
        if(!err){
          res.status(200);
          res.send(recette);
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
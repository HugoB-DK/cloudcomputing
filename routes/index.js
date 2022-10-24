const Recette = require("../models/recette");

module.exports = function(app) {

    app.get('/', function(req, res) {
      console.log("Index");
    });

    app.get("/recettes", (req,res,next) => {
        res.json("Voilà toutes les recettes, trop trop bien ");
    })

    app.post("/recette", async (req,res) => {
      console.log(req.body);
      const recette = new Recette({
        name: req.body.name,
        temps: req.body.temps,
        howto: req.body.howto,
        ingredients: req.body.ingredients,
      })

      await recette.save();
      res.send(recette);
    
    })
  }
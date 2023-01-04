require('dotenv').config();

var express = require("express");

const mongoose = require("mongoose");
mongoose
.connect(process.env.DB, { useNewUrlParser: true })
.then(()=>{
    const app = express()

    app.use(express.json())


    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
    require('./routes')(app);
    
})
.catch((err)=>{
    console.error(err);
})



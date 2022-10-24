require('dotenv').config();

var express = require("express");
var app = express();

var db = require("./mongoose");

app.use(express.json())


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
require('./routes')(app);

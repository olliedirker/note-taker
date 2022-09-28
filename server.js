
const express = require("express");
const fs = require("fs");
const path = require('path');

//app init and port
const app = express();
const PORT = process.env.PORT || 3000;

//app parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//require the routes
require('./routes/routes')(app);

// port listening setup
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
}); 
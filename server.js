//dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

//inits the app and port
const app = express();
const PORT = process.env.PORT || 3000;

//data parse setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

//require the routes
require("./routes/routes")(app);
//the port listener
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});

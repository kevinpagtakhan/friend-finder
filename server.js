var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');

var app = express();
var PORT = 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Server Routes
require("./app/routing/api-routes")(app);
 require("./app/routing/html-routes")(app);

// Starting the Server
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});

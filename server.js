var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require('express-handlebars');
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
require("./models");

var PORT =  process.env.PORT || 3000

// Initialize Express
var app = express();

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
// mongoose.connect(MONGODB_URI);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
//handlebars mongodb://user:password1@ds141228.mlab.com:41228/heroku_pg2mds3z"
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Routes
  // * Adding routes
require("./routes/apiRoutes")(app); //include the controller file
require("./routes/htmlRoutes")(app); //include the controller file
  // Start the server
  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
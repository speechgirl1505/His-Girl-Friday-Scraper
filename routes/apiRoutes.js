var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  // A GET route for scraping the echoJS website
  app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.vox.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $(".c-entry-box--compact__title").each(function(i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this).text();
        result.link = $(this)
          .children("a")
          .attr("href");
        console.log(result.title, result.link);

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      });
      // Send a message to the client
        res.redirect("/");
    });
  });

  // Route for getting all Articles from the db
  app.get("/", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
      .then(function(dbArticle) {
        res.render("index", {dbArticle});
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  
  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // app.get("/saved", function(req,res){
  //   db.Article.find({"saved": true})
  //   .populate("notes")
  //   .then(function(dbarticles){
  //     var hbsObject = {
  //       article: articles
  //     };
  //     res.render("saved", hbsObject);
  //   })
  //   .catch(function(err) {
  //     res.json(err);
  //   });
  // });

//if they save a note it automatically saves the article???
  // Route for saving/updating an Article's associated Note
  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
          console.log(dbNote);
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { note: dbNote._id },
          {saved: true},
          { new: true }
        );
      })
      .then(function(dbArticle) {
        // If the Library was updated successfully, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });
};


//button for scrape
$(document).on("click", "#getArt", function(){
	$.ajax({
		method: "GET",
		url: "/scrape",
	}).done(function(data){
		console.log(data)
		window.location = "/"
	})
});

// Whenever someone clicks a p tag
$(document).on("click", "#takeNote", function() {
  // Empty the notes from the note section
  // $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

console.log("get it dammit" + thisId.id);
console.log("article title" + thisId.id)
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h5>" + data.title + "</h5>");
      console.log(data.title)
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button class='btn btn-outline-secondary my-2 my-sm-0' data-id='" + data._id + "' id='saveThisnote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
  $(document).on("click", "#saveThisNote", function() {
    // Grab the id associated with the article from the submit button
    var thisStupidArticle = $(this).attr("data-id");
  console.log("get it dammit" + thisStupidArticle.id);
  console.log("article title" + $(`#titleId-${thisStupidArticle.id}`).val())
// Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisStupidArticle.id,
      data: {
        // Value taken from title input
        title: $(`#titleId-${thisStupidArticle.id}`).val(),
        // Value taken from note textarea
        body: $(`#bodyId-${thisStupidArticle.id}`).val()
      }
    })
// With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#empty").empty();
      });
// Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  //shows modal when they want to take a note
  // $(document).on("click", ".takeNote", function () { 
  //       $('.showMeTheModal').modal('toggle')
  // })
    

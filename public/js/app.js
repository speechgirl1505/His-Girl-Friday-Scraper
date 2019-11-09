
// $(document).on("click", ".takeNote", addNote);
// function addNote() {
//  console.log("something works");
//  var noteTitle = $(`input[data-id=${this.id}]`).val();
//  var noteBody = $(`input[data-id=${this.id}]`).val();
//  console.log(noteTitle);
//  console.log(noteBody);

// }
//   $(document).on("click", "#takeNote", function() {
// //     // Empty the notes from the note section
//     // $("#notes").empty();
// //     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");
  
// //     // Now make an ajax call for the Article
//     $.ajax({
//       method: "GET",
//       url: "/articles/" + thisId
//     })
// //       // With that done, add the note information to the page
//       .then(function(data) {
//         console.log(data);
//         // The title of the article
//         $("#notes").append("<h2>" + data.title + "</h2>");
//         // An input to enter a new title
//         $("#notes").append("<input id='titleinput' name='title' >");
//         // A textarea to add a new note body
//         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//         // A button to submit a new note, with the id of the article saved to it
//         $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
// //         // If there's a note in the article
//         if (data.note) {
//           // Place the title of the note in the title input
//           $("#titleinput").val(data.note.title);
//           // Place the body of the note in the body textarea
//           $("#bodyinput").val(data.note.body);
//         }
//       });

// When you click the savenote button
  $(document).on("click", ".saveThisNote", function() {
    // Grab the id associated with the article from the submit button
    var thisStupidArticle = $(this)
        .parents(".parent-div")
        .data();
//   console.log("get it dammit" + currentArticle.id);
//   console.log("article title" + $(`#titleId-${currentArticle.id}`).val())
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
        $("#notes").empty();
      });
  
// Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });

  $(document).on("click", ".takeNote", function () { 
        $('#showMeTheModal').modal('toggle')
  })
    

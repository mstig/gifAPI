$(document).ready(function() {
//variables for api key, url and starting button array
var apiKey = "apikey=6vmGWZlfm1G2OE9sIxi1eRx9Xv3WaHok";
var queryURL = "https://api.giphy.com";
var instruments = ["guitar", "piano", "drums", "trumpet"];

// Function for displaying initial buttons
function renderButtons() {
    for (i = 0; i < instruments.length; i++) {
        $("<button>").text(instruments[i]).appendTo("#gif-buttons");
        console.log(instruments[i]);
    }
}
renderButtons();

//capturing clicks from navbar to add new button
$("#add-button").on("click", function (event) {
    event.preventDefault();
    var newItem = $("#user-input").val();
    $("<button>").text(newItem).addClass("item-button").appendTo($("#gif-buttons"));
});

$("#search-button").on("click", function (event) {
    event.preventDefault();
});

$("#input-form").on("submit", function(event){
    event.preventDefault();
});

});
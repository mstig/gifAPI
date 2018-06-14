$(document).ready(function () {
    //starting array for initial buttons      
    var instruments = ["Guitar", "Piano", "Drums", "Trumpet"];

    // Function for displaying initial buttons
    function renderButtons() {
        for (i = 0; i < instruments.length; i++) {
            $("<button>").text(instruments[i]).addClass("item-button btn btn-success").appendTo("#gif-buttons");
            console.log(instruments[i]);
        }
    }
    renderButtons();

    //capturing clicks from navbar to add new button
    $("#add-button").on("click", function (event) {
        event.preventDefault();
        var newItem = $("#user-input").val();
        $("<button>").text(newItem).addClass("item-button").appendTo($("#gif-buttons"));
        document.getElementById("input-form").reset();
    });

    $("#input-form").on("submit", function (event) {
        event.preventDefault();
        var newItem = $("#user-input").val();
        $("<button>").text(newItem).addClass("item-button").appendTo($("#gif-buttons"));
        document.getElementById("input-form").reset();
    });

    //Function for actual search button clicks
    //Empties gif show, calls giphy API and appends the gif show div with the results
    $(".container").on("click", ".item-button", function () {
        $("#gif-show").empty();
        var gifItem = this.innerText;
        console.log(gifItem);
        var apiKey = "&apikey=6vmGWZlfm1G2OE9sIxi1eRx9Xv3WaHok";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifItem + apiKey;
        $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
            console.log(response);
            //create column div for each gif, 10 times
            //add rating, add specific classes, add src as still frame
            //outside of this function, add click method to alternate still frame/animate
        });
    });



});
$(document).ready(function () {
    //starting array for initial buttons      
    var instruments = ["Guitar", "Piano", "Drums", "Trumpet"];

    //used to show 10 gifs during ajax call and to queue up more
    var ajaxIndex;

    // Function for displaying initial buttons
    function renderButtons() {
        for (i = 0; i < instruments.length; i++) {
            $("<button>").text(instruments[i]).addClass("item-button btn btn-success").appendTo("#gif-buttons");
            console.log(instruments[i]);
        }
    }
    renderButtons();

    //takes API results and breaks up into 10 gifs
    //ajaxIndex is used as the offset in case more gifs of same type are called
    function renderGifs(results) {
        for (i = 0 + ajaxIndex; i < ajaxIndex + 10; i++) {
            var newGif = $("<div class='gif-div col-xs-12 col-s-3'>").appendTo($("#gif-show"));
            var stillFrame = results[i].images.fixed_height_still.url;
            var animateFrame = results[i].images.fixed_height.url;
            $("<img>").attr({ "class": "gif-pic", "src": stillFrame, "img-state": "still", "still-src": stillFrame, "animate-src": animateFrame }).appendTo(newGif);
            newGif.append("<div>Rating: " + results[i].rating + "</div>");
        }
    }

    $("#more-button").hide();

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
        $("<button>").text(newItem).addClass("item-button btn btn-success").appendTo($("#gif-buttons"));
        document.getElementById("input-form").reset();
    });
    //Instructions say to add input to the array and remake all the buttons
    //I could push the input onto instruments[], empty the button div and call renderButtons()
    //Is it not better to just make 1 new button when its added than remake the entire array?


    //Function for actual search button clicks
    //Empties gif show, calls giphy API and appends the gif show div with the results

    var gifItem = "";
    $(".container").on("click", ".item-button", function () {
        $("#gif-show").empty();
        ajaxIndex = 0;
        gifItem = this.innerText;
        $("#more-item").text(gifItem); //updates text of show more gifs button
        var apiKey = "&apikey=6vmGWZlfm1G2OE9sIxi1eRx9Xv3WaHok";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifItem + apiKey;
        $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
            var results = response.data;
            renderGifs(results);
            ajaxIndex += 10;
            $("#more-button").show();
        });
    });

    //When user requests more gifs, does another ajax call with added offset function to avoid showing same 10 gifs
    //Offset increments by 10 each time gifs are displayed, resets when new item is selected
    //Originally tried adding gifs from the original API call, but only ~24 at a time so you can only show more once
    //This can still throw a jQuery error if clicked too many times, maybe giphy runs out of gifs to return and it bugs out on undefined return?
    $(".container").on("click", "#more-button", function () {        
        var apiKey = "&apikey=6vmGWZlfm1G2OE9sIxi1eRx9Xv3WaHok";
        var queryURL = "https://api.giphy.com/v1/gifs/search?limit=30&q=" + gifItem + apiKey + "&offset=" + ajaxIndex;
        $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
            var results = response.data;
            renderGifs(results);
            ajaxIndex += 10;
        });
    })

    //Changes still frame/animate based on img-state
    //Still and Animated sources stored as html attribute
    $(".container").on("click", ".gif-pic", function () {
        var state = $(this).attr("img-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("animate-src"));
            $(this).attr("img-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("still-src"));
            $(this).attr("img-state", "still");
        }
    });



});
var q = "your_artist_query"; // Replace with your artist query

$.ajax({
    url: "http://api.deezer.com/search/artists",
    jsonp: "callback",
    dataType: "jsonp",
    data: {
        q: encodeURIComponent(q),
        format: "json"
    },
    success: function(response) {
        $("#artists").empty(); // Clear previous content

        $.each(response.data, function(i, item) {
            var pictureUrl = item.picture_medium; // Use picture_medium for better resolution
            var artistName = item.name;

            // Construct HTML for each artist card
            var cardHtml = "<div id='card_artist'>";
            cardHtml += "<div id='cardimg' style='background-image: url(" + pictureUrl + ");'></div>";
            cardHtml += "<div id='artistname' class='jtextfill'><span>" + artistName + "</span></div>";
            cardHtml += "</div>";

            $("#artists").append(cardHtml); // Append the card to #artists container
        });
    }
});

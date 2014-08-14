var artistSearch = function(artistName) {
	$.ajax({
		url: "https://api.spotify.com/v1/search/",
		data: {
			q: artistName,
			type: "artist"
			},
		success: function (data) {
			var artistID = data.artists.items[0].id;
			var selectedCountry = $(".country").val();
			countrySearch(artistID, selectedCountry);
			//console.log(countrySearch.tracks);

		},
		error: function (error) {
			$(".results").text("Sorry, but we coudn't find that artist!");
		}
	});
	
};

var result = function(image) {
	var albumCover= $(".results").find("img");
	albumCover.attr("src", image.tracks[0].album.images[0].url);
};

var countrySearch = function(artistID, countryName) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=" + countryName,
		data: {
			id: artistID,
			country: countryName
			},
		success: function(data) {
			var albumCover = data.tracks[0].album.images[2].url;
			$(".results").html("<img src='" + albumCover + "'img>");
			$.each(data.tracks, function(i, item) {

			});
		},
		error: function (error) {
			$(".results").text("Sorry, that artist is not available in that country!");
		}

	});
};



$(document).ready( function() {
	$('.name').submit( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the name the user submitted
		var name = $(this).find("input[name='artist']").val();
		artistSearch(name);
	});
});
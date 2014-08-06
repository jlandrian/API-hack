var artistSearch = function(artistName) {
	var result = $.ajax({
		url: "https://api.spotify.com/v1/search/",
		data: {
			q: artistName,
			type: "artist"
			},
		success: function (data) {
			return data.artists.items[0].id;
		}
	});
	console.log(result);
};

var countrySearch = function(artistID, countryName) {
	
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=" + countryName,
		data: {
			q: artistName,
			type: "artist"
			},
		success: function (data) {
			$(".results").text(data.artists.items[0].images[0].url);
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
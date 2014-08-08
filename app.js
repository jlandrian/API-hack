var artistSearch = function(artistName) {
	var result = $.ajax({
		url: "https://api.spotify.com/v1/search/",
		data: {
			q: artistName,
			type: "artist"
			},
		success: function (data) {
			console.log(data);
			console.log(data.artists.items[0].id);
		}
	});
	console.log("the following is actually a jQuery promise() object");
	
};

var countrySearch = function() {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=" + countryName,
		data: {
			id: artistName,
			country: "US"
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
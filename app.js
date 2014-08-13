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
			//console.log(selectedCountry);
			//console.log(artistID);
			countrySearch(artistID, selectedCountry);
			//console.log(countrySearch.tracks);
		}
	});
	
};

var countrySearch = function(artistID, countryName) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=" + countryName,
		data: {
			id: artistID,
			country: countryName
			},
		success: function(data) {
			console.log(data.tracks[0].name, data.tracks[1].name, data.tracks[2].name);
			console.log(countryName);
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
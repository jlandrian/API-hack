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
		},
		error: function (error) {
			$(".results").text("Sorry, but we coudn't find that artist!");
		}
	});
	
};

var result = function(item) {

	var tracks = $(".track-template").clone();
	tracks.removeAttr("class");

	var albumCover = tracks.find(".art img");
	albumCover.attr("src", item.album.images[2].url);

	var songName = tracks.find(".track");
	songName.text(item.name);

	var preview = tracks.find(".preview a");
	preview.attr("href", item.preview_url);

	var songLink = tracks.find(".link a");
	songLink.attr("href", item.external_urls.spotify);

	return tracks;
};

var countrySearch = function(artistID, countryName) {
	$.ajax({
		url: "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=" + countryName,
		data: {
			id: artistID,
			country: countryName
			},
		success: function(data) {
			$.each(data.tracks, function(i, item) {
				var info = result(item);
				$(".results").append(info);
				console.log(item.album.images[2].url);
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
		$('.results').empty();
		// get the value of the name the user submitted
		var name = $(this).find("input[name='artist']").val();
		artistSearch(name);
		$(".name").val('');
	});
});
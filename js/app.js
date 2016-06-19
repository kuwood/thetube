$(function() {
  $('#searchTerm').submit(function(event) {
    event.preventDefault();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
  });

  function getRequest(searchTerm) {
    params = {
      part: 'snippet',
      key: 'AIzaSyDSKdYksK3z3UXl3bwI4dQab3dKluynD5I',
      q: searchTerm,
      maxResults: 6
    };

    url = 'https://www.googleapis.com/youtube/v3/search';

    $.getJSON(url,params, function(data) {
      showResults(data.items);
      console.log(data);
    });
  };

  function showResults(results) {
    var ul = "";
    $.each(results, function(index, value){
      var videoIdLink = "<a href='https://www.youtube.com/watch?v=" + value.id.videoId + "'>";
      var thumbnail =  "<img src='" + value.snippet.thumbnails.medium.url + "'></a>";
      var title = '<p>' + value.snippet.title.substring(0,40) + '...' + '</p>';
      var channelTitle = value.snippet.channelTitle;
      var channelId = value.snippet.channelId;
      var channelLink = "<p><a href='https://www.youtube.com/user/" + channelTitle + "'>" + channelTitle + "</a></p>";
      ul += "<li>"+ title + videoIdLink + thumbnail + channelLink + "</li>";
    })
    $('#results').html(ul);
  };

});

$(document).ready(function(){
  //paste it
  function pasta(logo, name, status) {
  $("#followers").prepend("<div class ='row'>" + "<div class='col-md-4'>" +"<img src='" + logo + "'>"+ "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div></div>");}
  //given names
  var streamNames = ['freecodecamp', 'brunofin', 'comster404'];
  //FCC status call
  var fccStatcall = 'https://api.twitch.tv/kraken/streams/freecodecamp';
  $.getJSON(fccStatcall, function(data){
    if (data.stream === null){
      $('#fccStatus').html('Freecodecamp is offline!');
    } else {
      $('#fccStatus').html('Freecodecamp is streaming!');
    }
  });
  //Names of other streamers
var palStatCall = 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels';
$.getJSON(palStatCall, function(data1){
  //storing dispay names array for status calls
  for (var i=0; i<data1.follows.length; i++){
    streamNames.push(data1.follows[i].channel.display_name);
  }
  for (var i=0; i<streamNames.length; i++){
    var streamerStats = 'https://api.twitch.tv/kraken/streams/' + streamNames[i] + '/?callback=?';
    //.done()??? Display former users
    $.getJSON(streamerStats).done(function(data2){
      var logo, name, status;
      if(data2.error){
        logo = 'http://www.clker.com/cliparts/a/6/e/8/119498563188281957tasto_8_architetto_franc_01.svg.thumb.png';
        name = data2.message;
        status = data2.error;
        pasta(logo,name,status);
      }//good to here
      //offline
      if(data2.stream===null){
        $.getJSON(data2._links.channel, function(data4){
          var logo = data4.logo;
          var name = data4.display_name;
          var status = "Offline";
          if (logo===null){
            logo = 'http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg';
          }
          pasta(logo,name,status);
        });
      }
    });
  }
  for(var i=0; i<streamNames.length; i++){
    var streamerStats1 = 'https://api.twitch.tv/kraken/streams/' + streamNames[i];
    $.getJSON(streamerStats1, function(data3){
      var logo = data3.stream.channel.logo;
      if(logo===null){
             logo = 'http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg';
           }
      var name = data3.stream.channel.display_name;
      var status = data3.stream.channel.status;
      pasta(logo,name,status);

    });
  }
});
});

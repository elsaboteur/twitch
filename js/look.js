$(document).ready(function() {
    var fNames = ['brunofin','comster404'];
    var userstaus = 'https://api.twitch.tv/kraken/streams/freecodecamp';
    $.getJSON(userstatus, function(data) {
        if (data.stream === null) {
            $('#status').html('OFFLINE! CHECK BACK LATER!!');
        } else {
            $('#status').html('NOW STREAMING!');
        }
    });
    var followers = 'https://api.twitch.tv/kraken/users/freecodecamp/follows/channels';
    $.getJSON(followers, function(data1) {
        for (var i = 0; i < data1.follows.length; i++) {
            var fName = data1.follows[i].channel.display_name;
            fNames.push(fName);
        }
        for (var ii = 0; ii < fNames.length; ii++) {
            var url = 'https://api.twitch.tv/kraken/streams/' + fNames[ii] + '/?callback=?';
            $.getJSON(url).done(function(data2) {
                console.log(data2);
                var xLogo;
                var xStatus;
                var xName;
                if (data2.error) {
                    xLogo = 'http://www.clker.com/cliparts/a/6/e/8/119498563188281957tasto_8_architetto_franc_01.svg.thumb.png';
                    xName = data2.message;
                    xStatus = data2.error;
                    $('#followers').prepend('<div class="row">' + '<div class="col-md-4">' + '<img src="' + xLogo + '">' + '</div>' + '<div class="col-md-4">' + xName + '</div>' + '<div class="col-md-4">' + xStatus + '</div></div>');
                }
                if (data2.stream === null) {
                    $.getJSON(data2._links.channel, function(data3) {
                        xStatus = "OFFLINE";
                        xLogo = data3.logo;
                        xName = data3.display_name;
                        if (logo === null) {
                            xLogo = 'http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg';
                        }
                        $("#followers").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
                            "<img src='" + xLogo + "'>" +
                            "</div>" + "<div class='col-md-4'>" + xName + "</div>" + "<div class='col-md-4'>" + xStatus + "</div></div>");
                    });
                }
            });
        }
        for (var iii = 0; iii < following.length; iii++) {
            var onlineURL = "https://api.twitch.tv/kraken/streams/" + following[iii];
            $.getJSON(onlineURL, function(data4) {
                var xLogo = data4.stream.channel.logo;
                if (logo === null) {
                    xLogo = 'http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg';
                }
                var xStatus = data4.stream.channel.status;

                var xName = data4.stream.channel.display_name;
                $("#followers").prepend("<div class ='row'>" + "<div class='col-md-4'>" +
                    "<img src='" + xLogo + "'>" +
                    "</div>" + "<div class='col-md-4'>" + xName + "</div>" + "<div class='col-md-4'>" + xStatus + "</div></div>");

            });
        }
    });
});

!function ($) {

    var register = function() {
        var socket = io.connect('http://localhost:5005');

        socket.on('connect', function () {
            $('#socket').css({'color':'green'}).text('localhost:5005');
        })
        .on('disconnect', function () {
            $('#socket, #mqtt').css({'color':'#6A5F4D'}).text('Not Connected');
        })
        .on('mqtt_connect', function (broker) {
            $('#mqtt').css({'color':'green'}).text(broker);
        })
    }

    $(document).ready(function() {
        $('#MQTTHub > .portlet-header').append('<img id="logo" src="/mqtthub/www/images/mqtthub.png"/>');
        register();
    });
  
} (jQuery);

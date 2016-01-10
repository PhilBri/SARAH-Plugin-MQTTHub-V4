#MQTTHub

***

### Use real-time MQTT with S.A.R.A.H.

***

This plugin is an add-on for the framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h), an Home Automation project built 
on top of:
* C# (Kinect) client for Voice, Gesture, Face, QRCode recognition. 
* NodeJS (ExpressJS) server for Internet of Things communication

***
## Description
This plugin gives you easy and instantly access to **MQTT** with **S.A.R.A.H.** using socket.io

## Usage

1. In **HTML** section (portlet.ejs file) of your plugin add this "ejs" script :

```html
<% script ('http://localhost:5005/socket.io/socket.io.js'); %>
```

Because MQTTHub expose socket.io client via localhost...


2. In **JQuery** section of your plugin, just use this code :

```js
    // Create socket on port 5005
    var socket = io.connect('http://localhost:5005');
    socket.on('connect', function () {
        //socket.emit('publish', {topic:"ESP-01", payload:"?"});
        socket.on('mqtt', function (msg) {
            var s = String.fromCharCode.apply(null, new Uint8Array(msg.payload));
            $('#temp').text(jQuery.parseJSON(s).temperature + "°C");
            $('#humi').text(jQuery.parseJSON(s).humidity + "%");
        });
        socket.emit('subscribe', {topic: '/ESP-01/dht'});
    });
```
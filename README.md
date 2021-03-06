# <img src="../master/www/images/mqtthub.png" width="40px" height="40px"/> MQTTHub

### Use MQTT protocol in real-time with S.A.R.A.H.

***

This plugin is an add-on for the framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h) an Home Automation project.
* [Description](#description)
* [Example](#example)
* [Docs](#docs)
* [Installation](#install)

***

<a name="description"></a>
## Description

![](../master/www/images/capture.png) 

Gives you easy and instantly access to **MQTT** Protocol with **S.A.R.A.H.** using [Socket.IO](http://socket.io).

***

<a name="example"></a>
## Example

In your own plugin **JQuery**'s section, - `..\plugins\YOURPLUGIN\www\portlet.js` - just use the code below :

```js
// Create socket on port 5005
var socket = io.connect('http://localhost:5005');

// Connection process
// i.e : msg.payload = {"temperature":"19,5","Humidity":"55"} and msg.topic = {"subscribed_topic"}

socket.on('connect', function () {

    socket.on('mqtt', function (msg) {

    	// Convert returned ArrayBuffer Object to string.
        var s = String.fromCharCode.apply(null, new Uint8Array(msg.payload));

        // Display in html tags.
        $('topic').text(msg.topic);
        $('#temp').text(jQuery.parseJSON(s).temperature + "°C");
        $('#humi').text(jQuery.parseJSON(s).humidity + "%");
    });

	// Subscribe to MQTT topic.
    socket.emit('subscribe', {topic: 'your_topic'});

	// Publish message to MQTT topic.
	socket.emit('publish', {topic:"your_topic", payload:"your_msg"});

	// Unsubscribe to MQTT topic.
	socket.emit('unsubscribe', {topic: 'your_unsubscribe_topic'});

    // Disconnect the broker
    socket.emit('disconnect');
});
```

> MQTTHub expose [Socket.IO] client through localhost connection on port ***5005***

> msg.topic is `String`.

> msg.payload is `ArrayBuffer`.

***

<a name="Docs"></a>
## Docs

For more documentation, thanks to refer to those of the modules used in this plugin :

- [NQTT.JS](https://github.com/mqttjs/MQTT.js)

<a name="install"></a>
## Installation

Use S.A.R.A.H. online MarketPlace or download files from here and then, copy them into `..\SARAH\plugins\MQTT Hub` directory.

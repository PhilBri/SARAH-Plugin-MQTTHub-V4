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
Gives you easy and instantly access to **MQTT** Protocol with **S.A.R.A.H.** using [Socket.IO](http://socket.io).

***Warning:*** This plugin is designed for **S.A.R.A.H** v4 only !...

***
<a name="example"></a>
## Example

In **JQuery** section `..\plugins\YOURPLUGIN\www\portlet.js`, just use the code below :

```js
// Create socket on port 5005
var socket = io.connect('http://localhost:5005');

// Connection process
// i.e : msg.payload = {"temperature":"19,5","Humidity":"55"} and msg.topic = {"subscribed_topic"}

socket.once('connect', function () {

    socket.on('mqtt', function (msg) {

    	// Converting returned ArrayBuffer Object ( to String() )
        var s = String.fromCharCode.apply(null, new Uint8Array(msg.payload));

        // Display in html tags
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
});
```

***Comments:***

> ***MQTTHub*** expose [Socket.IO](http://socket.io/) client through **localhost** connection on port **5005**

> ***msg.topic*** is `String`.

> ***msg.payload*** is `ArrayBuffer`.

> ***Use***  `connect.once('connect', function () {});` to prevent multiples (re) connections from same clients when server restart... 

***

<a name="Docs"></a>
## Docs

For more documentation, thanks to refer to those of the modules used in this plugin :

- [MQTT.JS](https://github.com/mqttjs/MQTT.js)
- [Socket.IO](http://socket.io/)

***

<a name="install"></a>
## Installation

Use S.A.R.A.H. online MarketPlace or download files from here and then, copy them into `..\SARAH\plugins\MQTTHub` directory.


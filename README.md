<a name="example"></a>
## Example

# <img src="../master/www/images/mqtthub.png" width="40px" height="40px"/> MQTTHub

### Use MQTT protocol in real-time with S.A.R.A.H.
***

This plugin is an add-on for the framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h) an Home Automation project.
* [Description](#description)
* [Example](#example)
* [Installation](#install)

***
<a name="description"></a>
## Description
Gives you easy and instantly access to **MQTT** Protocol with **S.A.R.A.H.** using [Socket.IO](http://socket.io).

***
In **HTML** section of your plugin `..\plugins\Your_Plugin_Path\portlet.ejs`, add this "EJS" script :

```js
<% script ('http://localhost:5005/socket.io/socket.io.js'); %>
```
> MQTTHub expose [Socket.IO] client via ***localhost*** on port ***5005***

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

> msg.topic is `String`.

> msg.payload is `ArrayBuffer`.

> Use `connect.once' ('connect', function () {});` to prevent multiples (re) connections fron same clients when server restart... 

With **NodeJS**.

AJAX callbacks.
socket.io.client


***

<a name="install"></a>
## Installation

Use S.A.R.A.H. online MarketPlace or download files from here and then, copy them into `..\SARAH\plugins\MQTT Hub` directory.

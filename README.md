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
Gives you easy and instantly access to **MQTT** Protocol with **S.A.R.A.H.** using **socket.io**
***

<a name="example"></a>
## Example

In your plugin **HTML** section `\plugins\YOURPLUGIN\portlet.ejs`, add this "ejs" script :
```js
<% script ('http://localhost:5005/socket.io/socket.io.js'); %>
```
> Because MQTTHub expose socket.io client via localhost...

In your plugin **JQuery** section `\plugins\YOURPLUGIN\www\portlet.js`, just use this code :
```js
// Create socket on port 5005
var socket = io.connect('http://localhost:5005');
socket.on('connect', function () {
    socket.emit('publish', {topic:"your_topic_on_connect", payload:"your_mess_on_connect"});
    socket.on('mqtt', function (msg) {
    	// i.e : msg.payload = {"temperature":"19,5","Humidity":"55"}
        var s = String.fromCharCode.apply(null, new Uint8Array(msg.payload));
        $('#temp').text(jQuery.parseJSON(s).temperature + "°C");
        $('#humi').text(jQuery.parseJSON(s).humidity + "%");
    });
    socket.emit('subscribe', {topic: 'your_topic'});
});
```

Elsewhere, in **JQUERY** or **NodeJS** sections...


```js
// Publish to MQTT
socket.emit('publish', {topic:"your_topic", payload:"your_msg"});
```

```js
// Subscribe to MQTT
socket.emit('subscribe', {topic: 'your_topic'});
```

```js
// Unsubscribe to MQTT
socket.emit('unsubscribe', {topic: 'your_unsubscribe_topic'});
```
***

<a name="install"></a>
## Installation

Use S.A.R.A.H. online MarketPlace or download files from here and then, copy them into `SARAH / plugins / MQTT Hub` directory.

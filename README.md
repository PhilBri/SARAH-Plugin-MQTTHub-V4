#![](../master/www/images/mqtthub.png){:height="36px" width="36px"}.MQTTHub

***
### Use MQTT protocol in real-time with S.A.R.A.H.
***
This plugin is an add-on for the framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h)
***
## Description
This plugin gives you easy and instantly access to **MQTT** Protocol with **S.A.R.A.H.** using **socket.io**
***

## Example

In **HTML** section `\plugins\YOURPLUGIN\portlet.ejs` of your plugin, add this "ejs" script :
```js
<% script ('http://localhost:5005/socket.io/socket.io.js'); %>
```
> Because MQTTHub expose socket.io client via localhost...

In **JQuery** section of your plugin `\plugins\YOURPLUGIN\www\portlet.js`, just use this code :
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

MQTT publishing :

```js
socket.emit('publish', {topic:"your_topic", payload:"your_msg"});
```

MQTT subscribing :
```js
socket.emit('subscribe', {topic: 'your_topic'});
```

MQTT unsubscribing :
```js
socket.emit('unsubscribe', {topic: 'your_unsubscribe_topic'});
```
***

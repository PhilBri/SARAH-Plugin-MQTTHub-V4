var setIoMqtt = function (cfg) {
    if (io) return;
    try {
        io = require('socket.io').listen(5005);
        io.sockets.on('connect', function (socket) { info('[ MQTTHub ] socket.io is connected...');
            var mqttClient = require ('mqtt').connect({
                host:               cfg.Host,
                port:               cfg.Port,
                username:           cfg.User,
                password:           cfg.Password,
                rejectUnauthorized: false,
                keepalive:          10000
            });

            // MQTT
            mqttClient.on('connect', function (connack) { info('[ MQTTHub ] connected to http://' + cfg.Host + ':' + cfg.Port);
                io.sockets.emit('mqtt_connect', cfg.Host +':'+ cfg.Port);       
            })
            .on('message', function (topic, payload, packet) {
                io.sockets.emit('mqtt', { 'topic': String(topic), 'payload': payload });
            })
            .on('error', function (err) {
                error('[ MQTTHub ] ' + err);
            });

            // socket.io
            socket.on('subscribe', function (data) { //info('[ MQTTHub ] Subscribing to '+ data.topic);
                socket.join(data.topic);
                mqttClient.subscribe(data.topic);
            })
            .on('unsubcribe', function (data) { //info('[ MQTTHub ] Unsubscribe to ' + data.topic);
                mqttClient.unsubcribe(data.topic);
                socket.leave(data.topic);
            })
            .on('publish', function (data) {
                mqttClient.publish(data.topic, data.payload);
            })
            .on('disconnect', function () { info('[ MQTTHub ] socket.io is disconnected...');
                mqttClient.end(true);
            });
        });
    } catch (ex) {
        io = false;
    }
}

var cfgOk = false,
    io = false;

exports.init = function () {
    info('Plugin MQTTHub is initializing ...');
    var cfg = Config.modules.MQTTHub;
    !cfg.Host || !cfg.Port || !cfg.User || !cfg.Password ? error('\033[91m[ MQTTHub ]\033[0m Config error !') : cfgOk = true; 
    if (cfgOk) setIoMqtt(cfg);
}

var setIoMqtt = function (cfg) {

    io = require('socket.io').listen(5005);
    io.sockets.on('connection', function (socket) { 
        info('[ MQTTHub ] socket.io is connected...');
        var broker = require ('mqtt').connect({
            host:               cfg.Host,
            port:               cfg.Port,
            username:           cfg.User,
            password:           cfg.Password,
            rejectUnauthorized: false,
            keepalive:          10000
        });

        // MQTT
        broker.on('connect', function (connack) {
            info('[ MQTTHub ] connected to broker: %s','http://' + cfg.Host + ':' + cfg.Port);
            io.sockets.emit('mqtt_connect', cfg.Host +':'+ cfg.Port);
        })
        // Forward all mqtt messages to socket.io
        .on('message', function (topic, payload, packet) {
            io.sockets.emit('mqtt', { 'topic': String(topic), 'payload': payload });
        })
        .on('error', function (err) {
            error('[ MQTTHub ] %s' + err.message);
        })
        .on('close', function (err) {
            info('[ MQTTHub ] broker: %s is closed... (%s)', cfg.Host, err.message);
        })
        .on('offline', function (err) {
            warn('[ MQTTHub ] is offline... (%s)', err.message);
        });

        // socket.io
        socket.on('subscribe', function (data) {
            socket.join(data.topic);
            broker.subscribe(data.topic);
        })
        .on('unsubcribe', function (data) {
            broker.unsubcribe(data.topic);
            socket.leave(data.topic);
        })
        .on('publish', function (data) {
            broker.publish(data.topic, data.payload);
        })
        .on('disconnect', function () {
            info('[ MQTTHub ] socket.io is disconnected...');
            broker.end(true);
        });
    });
}

var cfgOk = false;

exports.init = function () {
    info('Plugin MQTTHub is initializing ...');
    var cfg = Config.modules.MQTTHub;
    !cfg.Host || !cfg.Port || !cfg.User || !cfg.Password ? error('\033[91m[ MQTTHub ]\033[0m Config error !') : cfgOk = true; 
    if (cfgOk) setIoMqtt(cfg);
}

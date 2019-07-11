var net = require('net');


var NET_PORT = 5550;
//var NET_ADDRESS = "localhost";

var clients = [];

var server = net.createServer(function (socket) {
    socket.setKeepAlive(true,60000);
    clients.push(socket);
    console.log('Client Connected to Server');
    socket.on('data', function (data) {
        var outMsg = data.toString().split(";")
        for (var i = 0; i < outMsg.length - 1; i++) {
            broadcast(outMsg[i].toString()+';', socket);
            console.log('Server Broadcast: ' + outMsg[i].toString()+';');
        }
    });

    socket.on('end', function () {
        clients.splice(clients.indexOf(socket), 1);
        console.log('Client Disconnected from Server');
    });

    socket.on("error", function(err) {
        clients.splice(clients.indexOf(socket), 1);
        console.log("Caught flash policy server socket error: ");
        console.log(err.stack);
    });

    function broadcast(data, sender) {
        clients.forEach(function (client) {
            // Don't want to send it to sender
            if (client === sender)
                return;
            client.write(data);
        });
    };
});

server.listen(NET_PORT);

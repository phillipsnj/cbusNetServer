var net = require('net');
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var clients = [];

var serialPort = new SerialPort("mergBoard", {
    baudrate: 115200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    parser: serialport.parsers.readline(";")
});

var client = new net.Socket();

client.connect(5550, '127.0.0.1', function () {
    console.log('Client Connected');
});

client.on('data', function (data) {
    console.log('USB4 Received: ' + data);
    serialPort.write(data.toString());
});

serialPort.on("open", function () {
    console.log('Serial Port Open');
    serialPort.on('data', function (data) {
        console.log('USB Sent' + data.toString() + ";");
        client.write(data.toString() + ";");
    });
});


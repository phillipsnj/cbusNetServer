/**
 * Created by nigel on 05/11/2016.
 */
var cbus = require('./mergCbus.js');
var net = require('net');

var client = new net.Socket();

client.connect(5550, '192.168.12.1', function () { //create a client connection to the the cbus server
    console.log('Client Connected');
    client.write(cbus.QNN()); //This is the code that sends out an event requesting details from each node.
});

client.on('data', function (data) { //Listen for Cbus Messages
    client.setKeepAlive(true, 60000);
    var outMsg = data.toString().split(";"); //Sometimes multiple events appear in a single network package.
    for (var i = 0; i < outMsg.length - 1; i++) { //loop through each event.
        //var msg = event.cbusMessage(outMsg[i]);
        var cbusData = cbus.data(outMsg[i]);
        switch (cbusData[0]) {
            case "B6": // Once a QNN is sent out each node should send a B6 event.
                //opCodeSupported(msg);
                var nodeId = parseInt((cbusData[1]+cbusData[2]),16);
                var manufacturerId = parseInt(cbusData[3],16);
                var moduleId = parseInt(cbusData[4],16);
                var flags = parseInt(cbusData[5],16);
                var consumer = (flags & 1)?true : false;
                var producer = (flags & 2)?true : false;
                var flim = (flags & 4)?true : false;
                var bootloader = (flags & 8)?true : false;
                var output = 'NodeID:'+nodeId+' Manufacturer :'+manufacturerId+' Module :'+moduleId+' FLags :'+flags;
                var output = consumer?output+' Consumer':output;
                var output = producer?output+' Producer':output;
                var output = flim?output+' Flim':output+' Slim';
                var output = bootloader?output+' Bootloader':output;
                console.log(output);
                break;
            default:
                console.log('OpCode: ' + cbus.deCodeCbusMsg(outMsg[i]) + ' not supported by this module');
        }
    }

});

function opCodeSupported(msg){
    console.log('OpCode: ' + msg.opCode + ' is supported by this module');
}


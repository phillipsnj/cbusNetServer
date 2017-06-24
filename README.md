# cbusNetServer
Basic network server for MERG cbus with additional micro services. This system works, but I am currently in the process of testing all the options. 

## cbusNetSever.js ##
Main server process.

## canPi.js ##
Micro service that connects a Raspberry Pi directly to the cbus can network using Ian Hart's canpi or canpiwi borards or the Pican2 board from skpang.

## canUSB.js ##
Miscro service that connects the MERG canusb4 board to the cbusNetServer.js

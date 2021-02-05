// Stuff to start the Express server that will be used to communicate with the website.
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Require sockets, which is the protocol used to transfer information between the server and the website's javascript.
const io = require('socket.io')(server); //NEW

// Install serial port node package for Arduino and prepare it to receive data.
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Don't forget to change the 'COM3' port to the one your Arduino is plugged into.
const port = new SerialPort('/dev/cu.usbmodem14201');
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

var path = require('path');

// This bit means the express server can see all of the static fies in the 'public' folder.
app.use(express.static('public'));

// Socket response when someone connects to the website...
io.on('connection', (socket) => {

    // Send the data:
    // console.log(socket);
    parser.on('data', function(data) {
        console.log(data);
        socket.emit('arduino data', data);
    });
    // socket.emit('welcome', socket.id); remove this

    // Socket response when someone disconnects.
    socket.on('disconnect', () => {
        console.log('left: ' + socket.id);
    });

});

// This is the website that the server will send Sockets to, in our case it is 'index.html' located in the 'views' folder.
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

// Note to say where the server will go. You visit localhost:3000 to see the code working.
server.listen(3000, () => {
    console.log('app listening on ' + server.address().port);
});
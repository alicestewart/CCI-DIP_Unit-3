console.log('inside the data.js file');

// Start sockets
let socket = io();

// Chose part of the site you want to change
let text = document.getElementById('text-content');

// Create variables globally that p5 will use.
let eWidth = 80;
let eHeight = 80;
let cursorColour;

// socket.on('welcome', (data)=> { REMOVE
//     console.log(data);
//     text.innerHTML = "this id of the socket.io connection for this page is " + data;
// });

// Prepare to listen to the 'arduino data' socket that the server.js file will send to.
// The Arduino stuff coming from server.js will be called 'data' 
socket.on('arduino data', (data) => {
    console.log(data)

    // Do stuff:
    text.innerHTML = "Data coming in from Arduino: " + data;

    // You can change or manipulate the data here:

    // Turn data from a string to an Integer so it can be used in the fill function:
    cursorColour = parseInt(data);

    // You could also do if statements:
    if (data === "10") {}

    if (data === "20") {}
});

// Your p5 sketch that does whatever you want it to do
function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('p5Canvas');
}

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(cursorColour);
    }

    // Change the variables that the arduino data socket provides
    ellipse(mouseX, mouseY, eWidth, eHeight);
}
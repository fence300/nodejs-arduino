// Settings

// Update this with whatever your device manager said the USB port is called
const COM = 'COM4'

// this will cause the webserver to listen on http://localhost:3000
const listenPort = 3000


// Require some libraries
const express = require('express')
const logger = require('morgan')
const SerialPort = require('serialport');


// set up the serial connection
const serialPort = new SerialPort(COM, { baudRate: 9600 });

serialPort.on('open', (error) => {
    if (error) return console.log(error)
    console.log('serial connection is open')
})

serialPort.on('error', (error) => {
    if (error) return console.log(error)
})

serialPort.on('close', (error) => {
    if (error) console.log(error)
    console.log('serial connection closed')
})

// helper function
function writeAndDrain(data) {
    // send data over the serial port
    serialPort.write(data, 'ascii', () => {
        // wait for data to finish sending
        serialPort.drain()
    })
}


// setting up the webserver
const app = express();
app.use(logger('dev'))

/**
 * It goes '/endpoint', function that should 
 * be executed when that endpoint is called
 * So for this one we would visit:
 * 
 *      http://localhost:3000/slow
 * 
 * And then the server, which is running on ourcomputer, localhost
 * and listening on port 3000 will see that we've submitted a GET request
 * for the endpoint '/1'
 * 
 * What follows is the definition of an anonymous function to be executed.
 * That anonymous function takes two parameters: the request object, and the
 * response object.  And it will refer to them internally as `req` and `res`
 * And inside the definition of that function, you can see that it will write
 * a string of one character to the serial connection, and then set the status
 * of the response object to 200 and send the string 'ok'
 * That response is what you will see in your browser.
 */
app.get('/slow', (req, res) => {
    writeAndDrain('1')
    res.status(200)
    res.send('ok')
})

app.get('/medium', (req, res) => {
    writeAndDrain('2')
    res.status(200)
    res.send('ok')
})

app.get('/fast', (req, res) => {
    writeAndDrain('3')
    res.status(200)
    res.send('ok')
})

app.get('/stop', (req,res) => {
    writeAndDrain('0')
    res.status(200)
    res.send('ok')
})

/**
 * This behavior catches any requests which did not match any of the defined
 * responses above.
 */
app.use((req, res) => {
    res.status(404)
    res.send('endpoint not found')
})

// Lastly, now that all the behaviors have been configured, we'll start the
// webserver listening for incoming connections.
app.listen(listenPort, () => {
    console.log(`started listening on port ${listenPort}`)
})
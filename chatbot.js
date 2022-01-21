// this will allow us to set environment processes in a special file
// called .env -- which has been excluded from the github beause it
// contains my login secrets
require('dotenv').config();

// Update this with whatever your device manager said the USB port is called
const COM = 'COM4'

// require the libraries
const tmi = require('tmi.js');
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

// helper function to send data over serial connection
function writeAndDrain(data) {
    // send data over the serial port
    serialPort.write(data, 'ascii', () => {
        // wait for data to finish sending
        serialPort.drain()
    })
}


// Set up the chatbot

// Define configuration options
const opts = {
    identity: {
      username: process.env.BOT_USERNAME,
      password: process.env.OATH_TOKEN
    },
    channels: [
      process.env.CHANNEL_NAME
    ]
};

// create the client with those options
const client = new tmi.client(opts)

// configure event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

function onMessageHandler (target, context, message, self) {
    // Ignore any messages that the bot sends
    if (self) { return;}

    // Ignore any messages that are not addressed to the bot
    if (! new RegExp('^[Hh]elper').test(message)) { return;}

    const command = message.trim().replace(/^[Hh]elper,?/, '').trim()

    if (command === 'report') {
        client.say(target, `I am listening`)
        console.log(`* Executed command: ${command}`)
        return
    }

    if (command === 'stop') {
        writeAndDrain('0');
        console.log(`* Executed command: ${command}`)
    }

    if (command === 'slow') {
        writeAndDrain('1')
        console.log(`* Executed command: ${command}`)
        return
    }

    if (command === 'medium') {
        writeAndDrain('2')
        console.log(`* Executed command: ${command}`)
        return
    }

    if (command === 'fast') {
        writeAndDrain('3')
        console.log(`* Executed command: ${command}`)
        return
    }

    console.log(`* Unrecognized command: ${command}`)
    return

}

function onConnectedHandler (addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}

// And lastly, connect to Twitch:
client.connect();
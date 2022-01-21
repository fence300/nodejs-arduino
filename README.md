# So you want to let the internet control your LEDs?
This repository contains some very simple proof of concept scripts which will do exactly that.

### flashing-modes.ino
This file is the code that you'll need to upload to your Arduino.
In order to do this, you'll have to install the Arduino IDE (integrated development environment) on one of your computers. 

You can download the Arduino IDE here: 
https://www.arduino.cc/en/software

The code for this proof of concept is based loosely on the `blink` example, which you can find documented here:
https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink

Just replace the text of blink script with the file `flashing-modes.ino` in the Arduino editor and upload it to your board.

### The rest of the files
The rest of the files in this repository are used by the nodejs part of the project. You'll need to install nodejs on your computer, if you haven't already.  You can download it here: 
https://nodejs.org/en/download/

Installing nodejs will also install the node package manager `npm` which is useful not only for installing dependencies, but initializing new projects and managing your existing projects.

The next thing you'll need to do is open a terminal and change directory to the folder where you unpack this repository. Once you're sitting in that directory, run `npm install` and that will cause the node package manager to look at the file `package.json` and install the node modules that this project depends on.

The next thing we'll need to do is determine the computers name for the USB port that your arduino is plugged into. For Windows users, you'll need to open the Device Manager and expand the dropdown arrow beside Ports.  Keep expanding things until you find the Arduino board. Mine was called `COM4` so that is what is written in the files in this repository by default.

In order for these packages to work, you'll need to update the definition of the constant `COM` in `webserver.js` and `chatbot.js` 

At this point, you're ready to run the webserver.  You can do this by executing the following command in the same terminal as before, in the same folder where you unpacked `package.json`:
```
npm run web
```
The node package manager will examine `package.json` and find the script titled `web` and run that script to start the webserver.

Once it is running, you can open a browser and visit these links:
http://localhost:3000/slow
http://localhost:3000/medium
http://localhost:3000/fast
http://localhost:3000/stop

And that *should* cause the LED to blink slowly, at a medium pace, and fast, respectively.

I wrote the webserver as a way to test and debug the connection between any given nodejs project and the Arduino connection.

The chatbot requires a little more preparation. You'll want to:
- enable multiple accounts being created for your verified email address
- create a new account for the bot to use
- log into https://twitchapps.com/tmi/ using that new username and it's password to generate an auth code
- create a file called `.env` in the working directory, and add the following content to it:
```
BOT_USERNAME="your_bot_username"
OATH_TOKEN="oauth:your_oath_token"
CHANNEL_NAME="name_of_your_channel"
```

Once you've done all of that, you should be able to run `npm run bot` and have your chatbot connect to the Twitch chat server as well as the Arduino USB port.  And then people in your channel can say,
- "Helper, slow"
- "Helper, medium"
- "Helper, fast"
- "Helper, stop"

// upload this to the arduino you'll be using for the project
// I used an ardunio uno, which has a builtin LED on pin 13, but you 
// could follow some examples and modify this script to fit a different board
int mode = 0;
int OUTPUT_PIN = 13;

// flash the LED on the output pin some number of times per second
void flashHertz(int n) {
    for (int i = 0; i < n; i++) {
        digitalWrite(OUTPUT_PIN, HIGH);
        delay(500 / n);
        digitalWrite(OUTPUT_PIN, LOW);
        delay(500 / n)
    }
}

// this runs once when the LED powers on
void setup() {
    // initialize the connection to the USB
    Serial.begin(9600);

    // initialize your desired pin into output mode
    pinMode(OUTPUT_PIN, OUTPUT);
}

// this runs over and over again, with variables carried over to the next loop
void loop() {

    // check if we have received new data over the USB connection
    if (Serial.available() > 0) {

        // read it as a string and convert it to an integer
        /** 
         * Data is sent ove the Serial connection as ascii, so each letter
         * corresponds to a number.  You ascii data as integers, but it doesn't
         * make much sense
        */
        mode = Serial.readString().toInt();
    }

    /** 
     * switch only works on integers.  You can have mode be a string, but you
     * would have to replace this logic block which determines what behaviors
     * should be executed
     */
    switch(mode) {
        case 1:
            flashHertz(1);
            break;

        case 2:
            flashHertz(2);
            break;

        case 3:
            flashHertz(4);
            break;
    }
}
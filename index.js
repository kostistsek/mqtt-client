const mqtt = require('mqtt')

// Url -> Connect using Websockets, maqiatto port 8883
const url = 'ws://maqiatto.com:8883/mqtt';

// Define topic to subscribe when connected
const topic = 'kostistsek@gmail.com/tester';

// Define username to connect
const user = 'kostistsek@gmail.com';

// Define password to connect
const pass = 'sensors';



// Select options for the MQTT connection
const options = {
    // Clean session
    clean: true,
    connectTimeout: 4000,
    // Authentication
    clientId: 'maqiatto_test',
    username: user,
    password: pass,
}

// Create an MQTT client instance
const client  = mqtt.connect(url, options);

// Client onconnect callback
client.on('connect', function () {
    console.log('Connected');
    // Subscribe to a topic
    client.subscribe(topic, function () {
        console.log('Subscribed to topic');
    })
})

// Receive messages callback
client.on('message', function (topic, message) {
    // Define google script URL, must be viewable by anyone and linked to desired Sheet
    const gsURL = "https://script.google.com/macros/s/AKfycbzNUPhL5wD1RFksxNBPbD7yAAU0Keb_zOKKc3VHwWmkFijPSYtR5jppPr0oyPszGUdINQ/exec";
    // Send message to Google script
    const axios = require('axios');

    // Create GET request, query after ?
    const requestURL = gsURL + '?' + message;

    // Send the GET request
    axios.get(requestURL).then(resp => {
        console.log(resp.data);
    });

})
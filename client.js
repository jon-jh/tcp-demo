// 3. The client and the server can be thought of as seperate apps.
// Start by adding the node packages we need, which includes 'net'

const net = require('net')

//declare the config for net.createConnection, it needs the host and the port. localhost always means this computer, if you don't want to connect to another computer.

const config = {
  host: 'localhost', // host is ALWAYS a string ''
  port: 54001 // same as client port
}

const tcpConnection = net.createConnection(config) // declare a variable to hold the connection, then call net.createConnection(config) within it. net.createConnection(config) returns the object that represents the TCP connection net.Socket tcpConnection is now my 'net' object for client.js.


tcpConnection.setEncoding('utf8') // set the encoding, to make sure incoming data is translated to text.


// 5. listen for events / messages recieved from the server.
tcpConnection.on('data', (data) => {
  console.log('server message: ', data)

  // send a message saying you have connected, the server must also be listening and have encoding set to utf8.

  // tcpConnection.write('Hello from client!') this caused an infinite loop, because whenever the server recieved a message, it would send it out again to everyone.
})

// 6. @@@ THE FUNCTION FOR SENDING MESSAGES @@@

process.stdin.setEncoding('utf8')
process.stdin.on('data', (data) => {
  console.log('you said: ', data)
  tcpConnection.write(data)
})
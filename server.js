/* SERVER CHAT ROOM DEMO - TO SEND MESSAGES BETWEEN CLIENTS AND SERVERS ON TCP
1. Add the built in node PACKAGE called Assert. When JS was moved from the browser to NODE, they added many packages to make it work. 

These are objects with a bunch of methods inside them.

You can go on the nodejs.org website to see the packages, and the options they can take. for example, net.createServer(option, option, etc.)
*/

const { Server } = require('http');
const net = require('net')

// net.createServer(); //creates an {object} and (returns it), as net.Server. 
// the object represents a server.
const myServer = net.createServer();


/*
2. Start the server. To do this, use myServer.listen(port).

It can be easier to declare the port as a constant, so you can use it in a console.log later. It's good practice to add a callback () => {console.log(`server now running on port ${port}`)} for when you may have more than one server running at a time. */ 

const port = 54001

//7. create an array to hold the names of unique connections in it.
const clientNames = []
//

myServer.listen(port, () => { // special note: this is event driven programming - "when the event "listening" occurs, run my callback (console.log)"
  console.log(`The server is now running on port ${port}.`)
}); 

//4. listen for incoming connections, or connection lost, or other events.

myServer.on('connection', (anyName) => { // this can use any name, because its just an argument used within the 'connection' object that NODE is using. So it does not need the same name as the one the client uses, because that one is also using the same 'connection' object in node. It's just a name for the argument. 

  // the argument 'connection' is one of a few accepted arguments for the 'net' package. everone that connects gets their own connection object. you can log the different connections be adding your own variables to it, such as uniqueId, or moderator, like ('connection' (connection)) connection.uniqueId = xx, or connection.moderator = true 

  console.log("Someone has connected to the server.")
  // 7. 
  clientNames.push(anyName)
  console.log("clients connected: " + clientNames.length)
  //

  // send the new connection a welcome message.
  // the client needs to be listening for incoming data.
  anyName.write('You are now connected to the server.')

  // we also want to start listening for data recieved on connection, so add this into myServer.on('connection'):
  anyName.on('data', (data) => { // when data is recieved, show me the (data), then console.log it.
    console.log('client said: ', data)

    //7. push any messages out to all clients, instead of just keeping them in the server. since we are looping through an array, use a for...of loop. (clientNames array.)
    for (const say of clientNames) {
      // final step, optional //
      if (say !== anyName){ // if say !== the currently connected user 'connection' (anyName), then .write that (data). This prevents the user message appearing on the screen of the person who sent it as an incoming message. 
      // 7. resumes //
      say.write(data)
      }
    }
  })

  // we also want to set the encoding for translating recieved data within the myServer.on('connection')
  anyName.setEncoding('utf8') // set the encoding, to make sure incoming data is translated to text.
  
})

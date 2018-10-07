const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;

const PORT = 3001;

const server = express()
  
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({
  server
});

function isJSON(string) {
  try {
    JSON.parse(string);
  } catch (err) {
    return false;
  }
  return true;
}

wss.broadcast = (dataString) => {
  let data = JSON.parse(dataString);

  data.status = "incoming";
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      console.log('Sending data')
      client.send(JSON.stringify(data));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Connection open');

  ws.send(JSON.stringify({ "status": "incoming", "type": "connections", "content": wss.clients.size }));

  ws.on('message', (data) => { if (isJSON(data)) { wss.broadcast(data) } });
  
  ws.on('close', () => console.log('Connection closed'));
});
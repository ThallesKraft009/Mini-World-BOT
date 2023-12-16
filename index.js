const WebSocket = require('websocket').w3cwebsocket;
const fs = require("fs");
const colors = require("colors");
const CONFIG = require("./settings/client.js");

const token = CONFIG.token;
const intents = CONFIG.intents;

const opcodes = {
  IDENTIFY: 2,
  HEARTBEAT: 1,
  RECONNECT: 7,
  HEARTBEAT_ACK: 11,
};

const payload = {
  op: opcodes.IDENTIFY,
  d: {
    token: token,
    intents: intents,
    properties: {
      $os: 'linux',
      $browser: 'chrome',
      $device: 'chrome',
    },
    presence: {
      activities: [{
        name: "Mini World: CREATA",
        type: 0
      }],
      status: "dnd",
      since: 91879201,
      afk: false
    },
  },
};

const gatewayURL = 'wss://gateway.discord.gg/?v=10&encoding=json';
let ws = null;
let heartbeatInterval;
let reconnectInterval = 10000; // Longer initial reconnect interval

function connectWebSocket() {
  ws = new WebSocket(gatewayURL);

  ws.onopen = () => {
    identify();
    console.log(colors.yellow("WebSocket opened."));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.op)
    if (data.op === 10) {
      handleHello(data.d.heartbeat_interval);
    } else if (data.op === 11) {
      console.log('Heartbeat ACK received.');
    } else if (data.op === 0) {
      require("./events/index.js")(data);
    } else if (data.op === opcodes.RECONNECT) {
      console.log('Received RECONNECT opcode. Reconnecting...');
      reconnect();
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error.message);
    reconnect();
  };

  ws.onclose = () => {
    console.log(colors.red("WebSocket closed. Reconnecting..."));
    reconnect();
  };

  
}

function handleHello(interval) {
  heartbeatInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      sendHeartbeat();
    } else {
      clearInterval(heartbeatInterval);
      reconnect();
    }
  }, interval);
}

function identify() {
  ws.send(JSON.stringify(payload));
}

function sendHeartbeat() {
  ws.send(JSON.stringify({ op: opcodes.HEARTBEAT, d: null }));
}

function reconnect() {
  clearInterval(heartbeatInterval);
  setTimeout(() => {
    connectWebSocket();
  }, reconnectInterval);

  reconnectInterval = Math.min(reconnectInterval * 2, 60000);
}

// Initialize the connection on script startup
connectWebSocket();
/*
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error.message);
});
*/
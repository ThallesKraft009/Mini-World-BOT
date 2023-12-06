const WebSocket = require('websocket').w3cwebsocket;
const fs = require("fs");
const colors = require("colors");
const CONFIG = require("./settings/client.js");

const token = CONFIG.token;
const intents = CONFIG.intents;

const payload = {
  op: 2,
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
let reconnectInterval = 1000;

function connectWebSocket() {
  ws = new WebSocket(gatewayURL);

  ws.onopen = () => {
    identify();
    console.log(colors.yellow("WebSocket aberto."));
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.op === 10) {
      handleHello(data.d.heartbeat_interval);
    } else if (data.op === 11) {
      console.log('Heartbeat ACK received.');
    } else if (data.op === 0) {
      require("./events/index.js")(data);
    }
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error.message);
    reconnect();
  };

  ws.onclose = () => {
    reconnect();
  };
}

function handleHello(heartbeatInterval) {
  const intervalId = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      sendHeartbeat();
    } else {
      clearInterval(intervalId);
      reconnect();
    }
  }, heartbeatInterval);

  reconnectInterval = 1000;
}

function identify() {
  ws.send(JSON.stringify(payload));
}

function sendHeartbeat() {
  ws.send(JSON.stringify({ op: 1, d: null }));
}

function reconnect() {
  console.log(colors.red("Tentando reconectar..."));
  setTimeout(() => {
    connectWebSocket();
  }, reconnectInterval);

  reconnectInterval = Math.min(reconnectInterval * 2, 60000);
}

// Inicializa a conexão na inicialização do script
connectWebSocket();
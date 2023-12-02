import pkg from "websocket";
import dotenv from "dotenv";
dotenv.config()
  
const { w3cwebsocket: WebSocket } = pkg;
import fs from 'fs';
import colors from 'colors';
const token = process.env.token;
const intents = 3276799;

//const token = CONFIG.token;
//const intents = CONFIG.intents;

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
        name: 'Mini World: CREATA',
        type: 0
      }],
      status: 'dnd',
      since: 91879201,
      afk: false
    },
  },
};

const gatewayURL = 'wss://gateway.discord.gg/?v=10&encoding=json';
const ws = new WebSocket(gatewayURL);
let heartbeatInterval = null;
let reconnectAttempts = 0;
let reconnectInterval = 1000;

ws.onopen = () => {
  identify();
  console.log(colors.yellow('WebSocket aberto.'));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.op === 10) {
    const { heartbeat_interval } = data.d;
    heartbeatInterval = setInterval(sendHeartbeat, heartbeat_interval);
    reconnectAttempts = 0;
    reconnectInterval = 1000;
  } else if (data.op === 11) {
    console.log('Heartbeat ACK received.');
  } else if (data.op === 0) {
    import('./events/index.js').then((module) => module.default(data));
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error.message);
  reconnect();
};

ws.onclose = () => {
  reconnect();
};

function identify() {
  ws.send(JSON.stringify(payload));
}

function sendHeartbeat() {
  ws.send(JSON.stringify({ op: 1, d: null }));
}

function reconnect() {
  clearInterval(heartbeatInterval);
  ws.close();

  reconnectAttempts++;
  const reconnectIntervalIncrement = Math.random() * 1000;
  const maxReconnectInterval = 60000;
  reconnectInterval = Math.min(
    reconnectInterval * 2 + reconnectIntervalIncrement,
    maxReconnectInterval
  );

  setTimeout(() => {
    start();
  }, reconnectInterval);
  }
      
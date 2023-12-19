const { WebSocketManager, WebSocketShardEvents } = require('@discordjs/ws');
const { REST } = require("@discordjs/rest")
const fs = require('fs');
const colors = require('colors');
const CONFIG = require('./settings/client.js');

const token = CONFIG.token;
const intents = CONFIG.intents

const rest = new REST().setToken(token);

const MiniWorldBOT_connect = async function(){
  
const manager = new WebSocketManager({
	token: token,
	intents: intents,
	rest,
});

manager.on(WebSocketShardEvents.Dispatch, (event) => {
	require("./events/index.js")(event.data);
});

await manager.connect();

   }


MiniWorldBOT_connect()
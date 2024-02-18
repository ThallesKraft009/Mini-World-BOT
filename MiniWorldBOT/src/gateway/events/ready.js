const client = require("../MiniWorldBOT.js");
const config = require("../../config/secret.js")
const { ActivityType } = require('discord.js');


client.once("ready", async() => {

  require("mongoose").connect(config.mongo)
  console.log(require("colors").cyan(client.user.username + " online!"))

  client.user.setActivity('MiniWorld: CREATA', { type: ActivityType.Playing });

  client.user.setStatus('dnd')
})
const { Client } = require("discord.js");
const fs = require("fs");

module.exports = (client) => {
  try {
    fs.readdirSync("./MiniWorldBOT/src/gateway/events/").forEach((file) => {
      const events = fs
        .readdirSync("./MiniWorldBOT/src/gateway/events/")
        .filter((file) => file.endsWith(".js"));
      for (let file of events) {
        let pull = require(`../events/${file}`);
        if (pull) {
          client.events.set(file, file.split(".js"));
        }
      }
    });
    
  } catch (e) {
    console.log(e);
  }
};
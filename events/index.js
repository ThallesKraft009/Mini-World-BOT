 const { mongo, clientId } = require("../settings/client.js");
const { connect } = require("mongoose");
const CALLBACK = require("../settings/callback.js");
const DiscordRequest = require("../settings/request.js");
const fs = require("fs");
const { Prefix } = require("./GUILD/messageCreate.js");
const { Interaction } = require("./GUILD/interactionCreate.js");
const c = require("colors");
const commands = [];
const commandsData = [];
const commandsJson = [];
const commandsOld = [];
fs.readdirSync(`./Commands/Slash/`).forEach(dir => {
    const files = fs.readdirSync(`./Commands/Slash/${dir}/`).filter(file => file.endsWith('.js'));

    files.forEach((file) => {
        let cmd = require(`../Commands/Slash/${dir}/${file}`)

        if (cmd) {
            commands[cmd.data.name] = cmd;
            commandsData.push(cmd.data);
        }
    })
})

module.exports = async(data) => {

  let { t, d } = data;

  if (t === "READY"){
    console.log(c.cyan("Client está Online"))
    connect(mongo);

   let cmdOld = await DiscordRequest(CALLBACK.interaction.commands(clientId),{
      method: "GET"
    })

    cmdOld = await cmdOld.json();
    cmdOld.map(async(cmd) => {

      await DiscordRequest(CALLBACK.interaction.commandsDelete(clientId, cmd.id),{
        method: "DELETE"
      })
    })

    console.log(c.yellow("Registrando slashcommand...."))

      commandsData.map(async(command) => {

   let cmd = await DiscordRequest(CALLBACK.interaction.commands(clientId), {
      method: "POST",
      body: command
    })

        cmd = await cmd.json();

        commandsJson.push(cmd);

      })

    console.log(c.green("SlashCommands registrados"))


   // console.log(commandsJson)
  } else if (t === "MESSAGE_CREATE"){
    return Prefix(data);
  } else if (t === "INTERACTION_CREATE"){
    return Interaction(data, commands);
  }
  
}
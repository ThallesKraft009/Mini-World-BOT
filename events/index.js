import config from '../settings/client.js';
const { token, mongo, clientId } = config
import { connect } from 'mongoose';
import CALLBACK from '../settings/callback.js';
import DiscordRequest from '../settings/request.js';
import fs from 'fs';
import { Prefix } from './GUILD/messageCreate.js';
import { Interaction } from './GUILD/interactionCreate.js';
import c from 'colors';
const commands = [];
const commandsData = [];
const commandsJson = [];
const commandsOld = [];
fs.readdirSync('./Commands/Slash/').forEach((dir) => {
  const files = fs.readdirSync(`./Commands/Slash/${dir}/`).filter((file) => file.endsWith('.js'));

  files.forEach((file) => {
    let cmd = require(`../Commands/Slash/${dir}/${file}`);

    if (cmd) {
      commands[cmd.data.name] = cmd;
      commandsData.push(cmd.data);
    }
  });
});

export default async (data) => {
  let { t, d } = data;

  if (t === 'READY') {
    console.log(c.cyan('Mini World BOT Online.'));
    connect(mongo);

    let cmdOld = await DiscordRequest(CALLBACK.interaction.commands(clientId), {
      method: 'GET',
    });

    cmdOld = await cmdOld.json();
    cmdOld.map(async (cmd) => {
      await DiscordRequest(CALLBACK.interaction.commandsDelete(clientId, cmd.id), {
        method: 'DELETE',
      });
    });

    console.log(c.yellow('Registrando slashcommand....'));

    commandsData.map(async (command) => {
      let cmd = await DiscordRequest(CALLBACK.interaction.commands(clientId), {
        method: 'POST',
        body: command,
      });

      cmd = await cmd.json();
      commandsJson.push(cmd);
    });

    console.log(c.green('SlashCommands registrados'));
  } else if (t === 'MESSAGE_CREATE') {
    return Prefix(data);
  } else if (t === 'INTERACTION_CREATE') {
    return Interaction(data, commands);
  }
};
    
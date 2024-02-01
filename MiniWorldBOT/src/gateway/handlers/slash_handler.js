const fs = require('fs');
const chalk = require('colors');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v10');
const { REST } = require('@discordjs/rest')

const config = require("../../config/secret.js")
const TOKEN = config.token;
const CLIENT_ID = config.clientId;

const rest = new REST({ version: '10' }).setToken(TOKEN);

module.exports = (client) => {
  const slashCommands = [];

  fs.readdirSync('./MiniWorldBOT/src/gateway/commands').forEach(async dir => {
    const files = fs.readdirSync(`./MiniWorldBOT/src/gateway/commands/${dir}/`).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const slashCommand = require(`../commands/${dir}/${file}`);
      slashCommands.push({
        name: slashCommand.name,
        name_localizations: slashCommand.name_localizations,
        description: slashCommand.description,
        description_localizations: slashCommand.description_localizations,
        type: slashCommand.type,
        options: slashCommand.options ? slashCommand.options : null,
        default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
        default_member_permissions: slashCommand.default_member_permissions ? PermissionsBitField.resolve(slashCommand.default_member_permissions).toString() : null
      });

      if (slashCommand.name) {
        client.commands.set(slashCommand.name, slashCommand)
      }
    }
  });

  (async () => {
    try {
      //await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] }).then(() => console.log(chalk.blue('Carregando slashCommands....')));

   //   procces.exit()

      await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: slashCommands }
      )
      
    } catch (error) {
      console.error(error);
    }
  })();
};

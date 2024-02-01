const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require("discord.js");
const client = require("../MiniWorldBOT.js");

client.on("interactionCreate", async (interaction) => {

  if (interaction.isChatInputCommand()) {
//interaction.reply("OK")
  
  const command = client.commands.get(interaction.commandName);

    if (!command) return;

    
    try {
      command.run(client, interaction);
    } catch (e) {
      console.error(e)
    };
  };
});
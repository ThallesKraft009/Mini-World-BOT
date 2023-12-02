import fs from 'fs';
import { guilddb } from '../../mongodb/guild.js';
import CALLBACK from '../../settings/callback.js';
import DiscordRequest from '../../settings/request.js';

const Commands = [];
fs.readdirSync(`./Commands/Prefix/`).forEach((dir) => {
  const files = fs.readdirSync(`./Commands/Prefix/${dir}/`).filter((file) => file.endsWith('.js'));

  files.forEach((file) => {
    let command = require(`../../Commands/Prefix/${dir}/${file}`);

    if (command) {
      Commands[command.name] = command;
    }
  });
});

const Prefix = async (data) => {
  let db = await guilddb.findOne({ guildId: data.d.guild_id });

  if (!db) {
    const newguild = new guilddb({ guildID: data.d.guild_id });
    await newguild.save();

    db = await guilddb.findOne({ guildID: data.d.guild_id });
  }

  let { d } = data;
  let prefix = db.bot.prefix;

  if (d.content.startsWith('<@1165243701073821766>') || d.content.startsWith('<@!1165243701073821766>')) {
    await DiscordRequest(CALLBACK.message.response(d.channel_id), {
      method: 'POST',
      body: {
        content: `Meu prefixo aqui é **\`${db.bot.prefix}\` e use **${db.bot.prefix}ajuda ou </ajuda:12345> para ver minha lista de comandos.`,
        message_reference: {
          message_id: d.id,
          channel_id: d.channel_id,
          guild_id: d.guild_id,
        },
      },
    });
  }

  if (d.type !== 0) return;

  try {
    const args = d.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = Commands[cmd];
    command.run(d, args);
  } catch (err) {
    console.log(err);
  }
};

export { Prefix, Commands };
      
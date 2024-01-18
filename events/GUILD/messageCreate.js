const fs = require("fs");
const { guilddb } = require("../../mongodb/guild.js");
const CALLBACK = require("../../settings/callback.js");
const DiscordRequest = require("../../settings/request.js");

let Commands = {};

fs.readdirSync(`./Commands/Prefix/`).forEach(dir => {
    const files = fs.readdirSync(`./Commands/Prefix/${dir}/`).filter(file => file.endsWith('.js'));

    files.forEach((file) => {
        const command = require(`../../Commands/Prefix/${dir}/${file}`);

        if (command && command.name) {
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

    if (d.content.startsWith("<@1180550435464020028>") || d.content.startsWith("<@!1180550435464020028>")) {
        await DiscordRequest(CALLBACK.message.response(d.channel_id), {
            method: 'POST',
            body: {
                content: `</bot help:12345>`,
                message_reference: {
                    message_id: d.id,
                    channel_id: d.channel_id,
                    guild_id: d.guild_id
                }
            }
        });
    }

    if (d.type !== 0) return;

    if (!d.content.startsWith(prefix)) return;

    try {
        const args = d.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();

        if (cmd.length === 0) return;

        const command = Commands[cmd];

        if (command && command.run) {
            command.run(d, args);
        } else {
            console.log(`Command '${cmd}' not found or doesn't have a 'run' method.`);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { Prefix, Commands };

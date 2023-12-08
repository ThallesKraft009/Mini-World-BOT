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
        let cmd = require(`../Commands/Slash/${dir}/${file}`);

        if (cmd) {
            commands[cmd.data.name] = cmd;
            commandsData.push(cmd.data);
        }
    });
});

const isSameCommand = (cmd1, cmd2) => {
    // Lógica para verificar se dois comandos são iguais, considerando subcomandos e grupos
    return cmd1.name === cmd2.name &&
        cmd1.type === cmd2.type &&
        ((cmd1.options && cmd1.options.length > 0) ? JSON.stringify(cmd1.options) === JSON.stringify(cmd2.options) : true);
};

module.exports = async (data) => {
    let { t, d } = data;

    if (t === "READY") {
        console.log(c.cyan("Client está Online"));
        connect(mongo);

        let apiCommands = await DiscordRequest(CALLBACK.interaction.commands(clientId), {
            method: "GET"
        });

        apiCommands = await apiCommands.json();

        console.log(c.yellow("Registrando slashcommand...."));

        commandsData.map(async (localCommand) => {
            // Verifica se o comando já existe na API, considerando subcomandos e grupos
            if (!apiCommands.some(apiCommand => isSameCommand(apiCommand, localCommand))) {
                let cmdResponse = await DiscordRequest(CALLBACK.interaction.commands(clientId), {
                    method: "POST",
                    body: localCommand
                });

                cmdResponse = await cmdResponse.json();
                commandsJson.push(cmdResponse);
            }
        });

        console.log(c.green("SlashCommands registrados"));
    } else if (t === "MESSAGE_CREATE") {
        return Prefix(data);
    } else if (t === "INTERACTION_CREATE") {
        return Interaction(data, commands);
    }
};

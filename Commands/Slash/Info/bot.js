const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const language = require("../../../language/commands/bot.js")

module.exports = {
  data: {
    name: "bot",
    description: "Comandos relacionados ao BOT",
    type: 1,
    options: [{
      name: "support",
      name_localizations: {
        "pt-BR": "suporte"
      },
      description: "Join my support server",
      description_localizations: {
        "pt-BR": "Entre em meu servidor de suporte"
      },
      type: 1
    },{
      name: "help",
      description: "Check my command list",
      description_localizations: {
        "pt-BR": "Veja minha lista de comandos"
      },
      type: 1
    },{
      name: "info",
      description: "See my current information",
      description_localizations: {
        "pt-BR": "Veja minhas informações atuais"
      },
      type: 1
    }],
  },

  run: async function(interaction){

    let subCmd = interaction.data.options[0].name;

   if (subCmd === "info"){

      await DiscordRequest(`/applications/@me`,{
        method: "GET"
      }).then(async(response) => {
        let client = await response.json();

     //    console.log(client);
        /** 
        My name is ${client.name}, and I am a bot fully inspired by the game **Mini World: CREATA**!\nI am a bot for: **Economy** and **Information** for your server. My currency is called "Mini Beans," which is one of the in-game currencies.\n\nI was developed by **ThallesKraft** and hosted on **SquareCloud**.\n\nCurrently, I am in **\`${client.approximate_guild_count}\`** servers.*/

        let data = {
  embeds: [{
    title: `${language[interaction.locale] ? language[interaction.locale]["info"].embed_title : "My Information"}`,
    description: `${language[interaction.locale] ? language[interaction.locale]["info"].embed_description.replace("(botName)", client.name).replace("(guilds)", client.approximate_guild_count) : `My name is ${client.name}, and I am a bot fully inspired by the game **Mini World: CREATA**!\nI am a bot for: **Economy** and **Information** for your server. My currency is called "Mini Beans," which is one of the in-game currencies.\n\nI was developed by **ThallesKraft** and hosted on **SquareCloud**.\n\nCurrently, I am in **\`${client.approximate_guild_count}\`** servers.`}`,
    thumbnail: {
      url: `https://cdn.discordapp.com/avatars/${client.bot.id}/${client.bot.avatar}.png?size=2048`
    },
    color: 255
  }],
  components: [{
    type: 1,
    components: [{
      label: "Add",
      style: 5,
      url: `https://discord.com/api/oauth2/authorize?client_id=1180550435464020028&permissions=2339214585024&scope=bot+applications.commands`,
      type: 2
    }, {
      label: "GitHub",
      style: 5,
      url: `https://github.com/ThallesKraft009/Mini-World-BOT/tree/main`,
      type: 2
    }]
  }]
        }

        await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `<@${interaction.member.user.id}>`,
          embeds: data.embeds,
          components: data.components
        }
      }
        })
        
      })
    }

    if (subCmd === "help"){

      
//
      

await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `<@${interaction.member.user.id}>`,
          flags: 64,
          embeds: [language[interaction.locale] ? language[interaction.locale]["help"].embed : {
     "title": "Command List",
     "description": "Select the menu below to choose commands!",
     "color": 255
          }],
          components: [{
            type: 1,
            components: [{
              type: 3,
              custom_id: "commands",
              placeholder: "Commands",
              options: [{
                label: `${language[interaction.locale] ? language[interaction.locale]["help"].label_info : "Information"}`,
                description: `${language[interaction.locale] ? language[interaction.locale]["help"].description : "Click to select"}`,
                value: "0"
              },{
                label: `${language[interaction.locale] ? language[interaction.locale]["help"].label_economia : "Economy"}`,
                description: `${language[interaction.locale] ? language[interaction.locale]["help"].description : "Click to select"}`,
                value: "1"
              },{
                label: `${language[interaction.locale] ? language[interaction.locale]["help"].label_social : "Social"}`,
                description: `${language[interaction.locale] ? language[interaction.locale]["help"].description : "Click to select"}`,
                value: "2"
              }]
            }]
          }]
        }
      }
        })
      
    }

    if (subCmd === "support"){

      let response = `Here is the invitation link to my support server **https://discord.com/invite/sZrGdBRWyT**.\nRemember, the server is entirely in Portuguese`

      if (interaction.locale === "pt-BR") response = "Aqui está o convite do meu servidor de suporte **https://discord.com/invite/sZrGdBRWyT**.\nLembre-se, o Servidor é totalmente em Português"

      await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `<@${interaction.member.user.id}> | ${response}`,
          flags: 64
        }
      }
        })
    }
  }
}
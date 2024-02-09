const clusters = require("../../../config/clusters.js")
const language = require("../../language/commands/bot.js")
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const {collector} = require("../../functions/collector.js");

module.exports = {
    name: "bot",
    description: "Comandos relacionados ao BOT",
    type: 1,
    options: [{
      name: "support",
      name_localizations: {
        "pt-BR": "suporte",
        "es-ES": "soporte"
      },
      description: "Join my support server",
      description_localizations: {
        "pt-BR": "Entre em meu servidor de suporte",
        "es-ES": "Entra al server de soporte"
      },
      type: 1
    },{
      name: "help",
      name_localizations: {
        "pt-BR": "ajuda",
        "es-ES": "ayuda"
      },
      description: "Check my command list",
      description_localizations: {
        "pt-BR": "Veja minha lista de comandos"
      },
      type: 1
    },{
      name: "info",
      description: "See my current information",
      description_localizations: {
        "pt-BR": "Veja minhas informações atuais",
        "es-ES": "Mira mi información actual"
      },
      type: 1
    },{
      name: "ping",
      description: "See current latency",
      description_localizations: {
        "pt-BR": "Veja minha latência atual",
        "es-ES": "Ver estado actual del bot"
      },
      type: 1
    }],
  run: async function(client, interaction){

    let subCmd = interaction.options.getSubcommand();

  //if (true) return await interaction.reply("teste!")
    if (subCmd === "ping"){

      let ping = client.ws.ping;
      let apiping = Date.now() - interaction.createdTimestamp;

      let cluster = clusters[client.cluster.id];
      let shard = interaction.guild.shardId;

      await interaction.reply({
        content: `🏓 Pong! (Cluster [${client.cluster.id}] - \`${cluster}\`) (Shard ${getInfo().TOTAL_SHARDS}/${shard})\n⏰ Gateway Ping: **\`${client.ws.ping}ms\`**\n⌛ Api Ping: **\`${apiping}ms\`**`
      })
    }

   if (subCmd === "info"){

      

     //    console.log(client);
        /** 
        My name is ${client.name}, and I am a bot fully inspired by the game **Mini World: CREATA**!\nI am a bot for: **Economy** and **Information** for your server. My currency is called "Mini Beans," which is one of the in-game currencies.\n\nI was developed by **ThallesKraft** and hosted on **SquareCloud**.\n\nCurrently, I am in **\`${client.approximate_guild_count}\`** servers.*/
//console.log(interaction.locale)
        let data = {
  embeds: [{
    title: `${language[interaction.locale] ? language[interaction.locale]["info"].embed_title : "My Information"}`,
    description: `${language[interaction.locale] ? language[interaction.locale]["info"].embed_description.replace("(botName)", client.user.username).replace("(guilds)", client.guilds.cache.size) : `My name is ${client.user.username}, and I am a bot fully inspired by the game **Mini World: CREATA**!\nI am a bot for: **Economy** and **Information** for your server. My currency is called "Mini Beans," which is one of the in-game currencies.\n\nI was developed by **ThallesKraft** and hosted on **SquareCloud**.\n\nCurrently, I am in **\`${client.guilds.cache.size}\`** servers.`}`,
    thumbnail: {
      url: `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png?size=2048`
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

        await interaction.reply({
          content: `<@${interaction.user}>`,
          embeds: data.embeds,
          components: data.components
        })
      
        
        
      
    }

    if (subCmd === "help"){

      
//
      

await interaction.reply({
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
              custom_id: `commands_${interaction.id}`,
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
        })
      
    
      collector(async(i) => {
        if (i.isStringSelectMenu()){
          if (i.customId === `commands_${interaction.id}`){
          let value = i.values[0];

              if (value === "0"){
      let embed = language[interaction.locale] ? language[interaction.locale]["help"]["embed_0"] : {
        title: "Information Commands",
        fields: [{
          name: "</bot help:12345>",
          value: "`See my list of commands`"
        },{
          name: "</bot info:12345>",
          value: "`See my current information`"
        },{
          name: "</servers:12345>",
          value: "`See all official Mini World servers`"
        }],
        color: 16776960
      };

                await i.update({
                  embeds: [embed]
                })
    } else if (value === "1"){
      let embed = language[interaction.locale] ? language[interaction.locale]["help"]["embed_1"] : {
        title: "Economy Commands",
        fields: [{
          name: "</minibeans daily:12345>",
          value: "`Redeem your daily Mini Beans`"
        },{
          name: "</minibeans atm:13345>",
          value: "`See how many Mini Beans you or another user has!`"
        },{
          name: "</minibeans pay:12345>",
          value: "`Send Mini Beans to another user!`"
        },{
          name: "</minibeans work:12345>",
          value: "`Do projects and earn Mini Beans`"
        },{
          name: "</minibeans rank:12345>",
          value: "`.`"
        }],
        color: 65280
      };

      await i.update({
        embeds: [embed]
      })
    } else if (value === "2"){
      let embed = language[interaction.locale] ? language[interaction.locale]["help"]["embed_2"] : {
        title: "Social Commands",
        fields: [{
          name: "</profile view:12345>",
          value: "`View the profile of a user`"
        },{
          name: "</profile about-me:12345>",
          value: "`Change your About Me`"
        },{
          
          name: "</uid save:12345>",
          value: "`Save your UID on Discord`"
        },{
          name: "</uid search:12345>",
          value: "`View the UID of another member`"
        }],
        color: 16753152
      };

      await i.update({
        embeds: [embed]
      })
    }
  }
        }
        
      })
    }

    if (subCmd === "support"){

      let response = `Here is the invitation link to my support server **https://discord.com/invite/sZrGdBRWyT**.\nRemember, the server is entirely in Portuguese`

      if (interaction.locale === "pt-BR") response = "Aqui está o convite do meu servidor de suporte **https://discord.com/invite/sZrGdBRWyT**.\nLembre-se, o Servidor é totalmente em Português"

      await interaction.reply({
        content: response
      })
    }
  }
}
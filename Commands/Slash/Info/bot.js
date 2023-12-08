const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");

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
    }]
  },

  run: async function(interaction){

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "help"){

      let language = {
        br: `</uid salvar:12345> - Salve seu Uid\n</uid pesquisar:12345> - Veja o UID de algum membro\n</minifeijões diárias:12345> - Resgate seus Mini Feijões Diárias\n</minifeijões atm:12345> - Veja quantos Mini Feijões você ou algum usuário tem\n</minifeijões pagar:12345> - Envie Mini Feijões para algum usuário\n</servidores:12345> - Veja a Lista de Servidores disponíveis de Mini World\n</bot suporte:12345> - Entre no meu servidor de Suporte\n</bot help:12345> - Veja a Lista de Comandos`,

        ingles: `</uid save:12345> - Save your UID\n</uid search:12345> - View the UID of a member\n</minibeans daily:12345> - Redeem your Daily Mini Beans\n</minibeans atm:12345> - Check how many Mini Beans you or another user has\n</minibeans pay:12345> - Send Mini Beans to another user\m</servers:12345> - View the list of available Mini World servers\n</bot support:12345> - Join my support server\n</bot help:12345> - View the list of commands
`
      }

      let response = language.ingles
      if (interaction.locale === "pt-BR") response = language.br

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
          embeds: [{
            description: `${response}`
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
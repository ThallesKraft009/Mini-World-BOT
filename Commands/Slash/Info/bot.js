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
        br: `</uid salvar:12345> - Salve seu Uid\n</uid pesquisar:12345> - Veja o UID de algum membro\n</minifeijões diárias:12345> - Resgate seus Mini Feijões Diárias\n</minifeijões atm:12345> - Veja quantos Mini Feijões você ou algum usuário tem\n</minifeijões pagar:12345> - Envie Mini Feijões para algum usuário\n</servidores:12345> - Veja a Lista de Servidores disponíveis de Mini World\n</bot suporte:12345> - Entre no meu servidor de Suporte\n</bot help:12345> - Veja a Lista de Comandos\n</perfil ver:12345> - Veja seu perfil ou de algum outro usuário\n</perfil sobremim:12345> - Altere seu sobremim\n</perfil mapas enviar:12345> - Envie seu mapa para eu\n</perfil mapas deletar:12345> - Delete um mapa seu`,

        ingles: `</uid save:12345> - Save your UID
</uid search:12345> - View the UID of a member
</minibeans daily:12345> - Redeem your Daily Mini Beans
</minibeans atm:12345> - Check how many Mini Beans you or another user have
</minibeans pay:12345> - Send Mini Beans to another user
</servers:12345> - View the List of available Mini World servers
</bot support:12345> - Join my Support server
</bot help:12345> - View the List of Commands
</profile view:12345> - View your profile or another user's
</profile aboutme:12345> - Change your About Me
</profile maps send:12345> - Send your map to me
</profile maps delete:12345> - Delete one of your maps
`
      }
//
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
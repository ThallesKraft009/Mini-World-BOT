const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");

module.exports = {
  data: {
    name: 'servers',
    name_localizations: {
      "pt-BR": "servidores"
    },
    description: 'Check out the available Mini World servers on Discord',
    description_localizations: {
      "pt-BR": "Veja os servidores disponíveis de Mini World no Discord"
    },
    type: 1
  },
  run: async function (interaction) {

    let title = `Server List`
    if (interaction.locale === "pt-BR") title = `Lista de Servidores`

    let embed = {
      title: `${title}`,
      fields: [{
        name: `Mini World: CREATA`,
        value: `https://discord.gg/VXn6ZErz5a`
      },{
        name: `Mini World: CREATA Português`,
        value: `https://discord.com/invite/h9jsX7HbrR`
      },{
        name: "Mini World: CREATA (FR)",
        value: "https://discord.gg/Q9h6Nk3BAV"
      },{
        name: "Mini World: CREATA (TR)",
        value: "https://discord.gg/ZjV6aJ3XWw"
      },{
        name: "Mini World: CREATA (Italia)",
        value: "https://discord.gg/dQagUquYEU"
      },{
        name: "Mini World: CREATA (VN)",
        value: "https://discord.gg/mini-world-creata-vn-947765157411561472"
      },{
        name: "Mini World: CREATA (DE)",
        value: "https://discord.gg/3tBXTD48Ge"
      },{
        name: "Mini World: CREATA (Indonésia)",
        value: "https://discord.gg/649wjCWn5U"
      },{
        name: "Mini World: CREATA (Arabi)",
        value: "https://discord.gg/jxsrtDe3wt"
      }],
      color: 255
    };

    await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `<@${interaction.member.user.id}>`,
          embeds: [embed]
        }
      }
        })
  }
};


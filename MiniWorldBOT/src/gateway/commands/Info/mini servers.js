
const language = require("../../language/commands/miniservers.js")

module.exports = {
    name: 'servers',
    name_localizations: {
      "pt-BR": "servidores",
      "es-ES": "servidores"
    },
    description: 'Check out the available Mini World servers on Discord',
    description_localizations: {
      "pt-BR": "Veja os servidores disponíveis de Mini World no Discord",
      "es-ES": "Mira los servidores de Discord disponibles de  Mini World"
    },
    type: 1,
  run: async function (client, interaction) {

    let title = `Server List`
    if (interaction.locale === "pt-BR") title = `Lista de Servidores`

    let embed = {
      title: `${language[interaction.locale] ? language[interaction.locale] : "Server List"}`,
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

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    })
  }
};


const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");

module.exports = {
  name: "embedIntroduction",
  run: async function(message, args) {

    if (true) return;

    let embeds = [{
      title: "Mini World BOT",
      description: `* **The Mini World Bot was developed inspired by the game Mini World: CREATA. It features commands in Slashcommand (/) format and supports various languages compatible with your Discord server.**`,
      color: 65280,
      thumbnail: {
        url: "https://cdn.discordapp.com/avatars/1180550435464020028/aa059c9fd6250c9f9008d71f84d07862.png?size=2048"
      }
    },{
      description: `>>> There are commands to find a Discord user's UID, who needs to have saved their UID with </uid save:12345>. After saving, you can view the profile using </profile view:12345> and list the sent maps with </profile maps send:12345>.

Additionally, the bot has economic commands using the currency "Mini Feijão" for an economic experience on your server, noting that it doesn't correspond to real Mini World coins.`,
      color: 65280,
      footer: {
        text: "Developed by ThallesKraft",
        icon_url: "https://cdn.discordapp.com/attachments/1186032325813862580/1187438024888426626/Badge_Early_VerifiedBotDeveloper.png?ex=6596e2d6&is=65846dd6&hm=00f75de1790705393f7f0f1db51a65e03649993e09b38d7981cf16102eb2fd26&"
      }
    },{
      title: "Server Guide",
      description: "In the support server of <@1180550435464020028>, you'll find important information. Check out the quick guide:",
      fields: [{
        name: "* <#1180549247024762961>",
        value: "Stay informed about bot updates."
      },{
        name: "* <#1180549276217127063>",
        value: "Understand why the bot is offline."
      },{
        name: "* <#1180549311570911302>",
        value: "Share your opinions on bot commands and systems."
      },{
        name: "* <#1180839541301596191>",
        value: "Report errors and translations."
      },{
        name: "* <#1180839581432676392>",
        value: "Share your ideas!"
      },{
        name: "* <#1182629814545432638>",
        value: "Report inappropriate behavior."
      },{
        name: "* <#1180839630900305970>",
        value: "Have questions about the bot? Call the Support Team!"
      }],
      color: 65535
    }]

    await DiscordRequest(CALLBACK.message.response(message.channel_id), { 
      method: 'POST',
      body: {
        embeds: embeds
      }
    });
  }
}
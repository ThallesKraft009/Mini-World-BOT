const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const {userdb} = require("../../../mongodb/user.js")
module.exports = {
  data: {
    name: "minibeans",
    name_localizations: {
      "pt-BR": "minifeijões"
    },
    description: "Comandos relacionados a Economia",
    type: 1,
    options: [{
      name: "daily",
      name_localizations: {
        "pt-BR": "diárias"
      },
      description: "Redeem your Daily Mini Beans!",
      description_localizations: {
        "pt-BR": "Resgate seus Mini Feijões diários!"
      },
      type: 1
    }]
  },
  run: async function(interaction) {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "daily"){

      
    }
  }
}
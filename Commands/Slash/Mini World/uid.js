const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");

module.exports = {
  data: {
    name: "uid",
    description: "Comandos relacionados a UID",
    type: 1,
    options: [{
      name: "save",
      name_localizations: {
        "pt-BR": "salvar"
      },
      description: "Save your Mini World UID!",
      description_localizations: {
        "pt-BR": "Salve seu UID do Mini World!"
      },
      type: 1
    }]
  },
  run: async function(interaction) {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "save"){
    let data = {
      title: "UID Management",
      option: "Enter your UID below"
    };

    if (interaction.locale === "pt-BR") data = {
      title: "Salvamento de Uid",
      option: "Insira seu UID abaixo"
    }

    let modal = {
       title: `${data.title}`,
        custom_id: "uid",
        components: [{
          type: 1,
          components: [{
            type: 4,
            custom_id: "x",
            label: `${data.option}`,
            style: 1
          }]
        }]
    }

      await DiscordRequest(CALLBACK.interaction.response(
      interaction.id, interaction.token
      ), {
         method: "POST",
         body: {
           type: 9,
           data: modal
         }
      }
    )

    }

  
  }
      }
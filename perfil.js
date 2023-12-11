const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const { userdb } = require("../../../mongodb/user.js");

module.exports = {
  data: {
    name: "profile",
    name_localizations: {
      "pt-BR": "perfil"
    },
    description: "Comandos relacionados a Perfil",
    type: 1,
    options: [{
      name: "view",
      name_localizations: {
        "pt-BR": "ver"
      },
      description: "Check your profile or another user's",
      description_localizations: {
        "pt-BR": "Veja seu perfil ou de algum usuário!"
      },
      type: 1,
      options: [{
        name: "user",
        description: "Mention or enter the ID",
        type: 6,
        required: false
      }]
    },{
      name: "about-me",
      name_localizations: {
        "pt-BR": "sobremim"
      },
      description: "Update your 'about me'!",
      description_localizations: {
        "pt-BR": "Edite seu sobremim!"
      },
      type: 1
    },{
      name: "badges",
      name_localizations: {
        "pt-BR": "emblemas"
      },
      description: "Check your badges and learn how to earn more",
      description_localizations: {
        "pt-BR": "Veja seus emblemas e como conseguir mais"
      },
      type: 1
    },{
      name: "maps",
      name_localizations:{
        "pt-BR": "mapas"
      },
      description: "Send your maps to me",
      description_localizations: {
        "pt-BR": "Envie seus mapas pra mim"
      },
      type: 2,
      options: [{
        name: "send",
        name_localizations: {
          "pt-BR": "enviar"
        },
        description: "Send your maps to me",
        description_localizations: {
          "pt-BR": "Envie seus mapas pra mim"
        },
        type: 1,
        options: [{
          name: "name",
          name_localizations: {
            "pt-BR": "nome"
          },
          description: "Enter the name of your map",
          description_localizations: {
            "pt-BR": "Insira o nome de seu mapa"
          },
          type: 3,
          required: true
        },{
          name: "description",
          name_localizations: {
            "pt-BR": "descrição"
          },
          description: "Enter the description of your map",
          description_localizations: {
            "pt-BR": "Insira a descrição de seu mapa"
          },
          type: 3,
          required: true
        },{
          name: "image",
          name_localizations: {
            "pt-BR": "imagem"
          },
          description: "Send a picture of your map",
          description_localizations: {
            "pt-BR": "Envie uma imagem de seu mapa"
          },
          type: 11,
          required: false
        }]
      },{
        name: "delete",
        name_localizations: {
        "pt-BR": "deletar"
        },
        description: "Delete a map",
        description_localizations: {
          "pt-BR": "Delete um mapa"
        },
        type: 1,
        options: [{
          name: "map",
          name_localizations: {
            "pt-BR": "mapa"
          },
          description: "Select the map",
          description_localizations: {
            "pt-BR": "Selecione o mapa"
          },
          type: 3,
          focused: true,
          required: true
        }]
      }]
    }]
  },
  run: async function(interaction){
    
  }
}

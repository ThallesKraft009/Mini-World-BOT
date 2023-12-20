const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const { userdb } = require("../../../mongodb/user.js");
const language = require("../../../language/commands/uid.js")
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
    },{
      name: "search",
      name_localizations: {
        "pt-BR": "pesquisar"
      },
      description: "Search for the UID of a user",
      description_localizations: {
        "pt-BR": "Veja o UID de algum usuário"
      },
      type: 1,
      options: [{
        name: "member",
        name_localizations: {
          "pt-BR": "membro"
        },
        description: "Mention the member or insert the ID",
        description_localizations: {
          "pt-BR": "Mencione um Membro ou insira o ID"
        },
        type: 6,
        required: true
      }]
    }]
  },
  run: async function(interaction) {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "search"){

      let userId = interaction.data.options[0].options[0].value;

      await DiscordRequest(
  CALLBACK.guild.userGet(
    interaction.guild_id, 
    userId), {
      method: "GET"
  }).then(async(x) => {
  let user = await x.json();

        let db = await userdb.findOne({ userID: userId });

        if (!db){
          let newuser = new userdb({ userID: userId });

          await newuser.save();

          db = await userdb.findOne({ userID: userId })
        }

        let data = {
          uid_not: language[`${interaction.locale}`] ? language[`${interaction.locale}`]["uid-search"].uid_not : "Undefined",
          response: language[`${interaction.locale}`] ? language[`${interaction.locale}`]["uid-search"].response : `The UID of <@${userId}> is (uid)!`
        }

        

        let uid = db.uid;
        if (uid === "Não definido" || uid === null) uid = data.uid_not

        await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${data.response.replace("(uid)", uid).replace("(member)", `<@${userId}>`)}`
        }
      }
        })
      
            
      })

      
    }

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
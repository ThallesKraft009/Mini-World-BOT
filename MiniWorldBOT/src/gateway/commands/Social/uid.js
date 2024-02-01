const { collector } = require("../../functions/collector.js");
const { userdb } = require("../../mongodb/user.js");
const language = require("../../language/commands/uid.js")
module.exports = {
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
    }],
  run: async function(client, interaction) {

    let subCmd = interaction.options.getSubcommand()

    if (subCmd === "search"){

      let userId = interaction.options.getUser("member").id

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

      console.log(db)

        await interaction.reply({
          content: `${data.response.replace("(uid)", uid).replace("(member)", `<@${userId}>`)}`
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
        custom_id: `uid`,
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

      await interaction.showModal(modal)

      collector(async(i) => {
        if (i.isModalSubmit()){
          if (i.customId === `uid`){

            let uid = i.fields.getTextInputValue('x');

            let userId = i.user.id;
            
            let db = await userdb.findOne({ userID: userId });

        if (!db){
          let newuser = new userdb({ userID: userId });

          await newuser.save();

          db = await userdb.findOne({ userID: userId })
        }

            db.uid = uid;

            await db.save();

            await i.reply({
              content: `${uid}`,
              ephemeral: true
            })
          }
        }
      })
    }

  
  }
      }
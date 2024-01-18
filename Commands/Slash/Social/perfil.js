const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const { userdb } = require("../../../mongodb/user.js");
const { QuickDB } = require("quick.db");
const dbQ = new QuickDB();
const language = require("../../../language/commands/profile.js")
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
          required: true
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
          required: true,
          autocomplete: true
        }]
      }]
    }]
  },
  run: async function(interaction){


   // console.log(interaction.data)
    
    
    let subCmd = interaction.data.options[0].name;

    if (subCmd === "maps"){
     /// console.log(interaction.data.options[0])

      let cmd = interaction.data.options[0].options[0];
      

      if (cmd.name === "delete"){

        let db = await userdb.findOne({
          userID: interaction.member.user.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: interaction.member.user.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: interaction.member.user.id
        })
        }

        let map = cmd.options[0].value;

       // if (map === ""){}
    //    console.log(map)

        db.perfil.mapas = db.perfil.mapas.filter(x => x.name !== map);
     //   console.log(db.perfil.mapas)

        await db.save();

        let response = "Your map has been successfully removed!";

        if (interaction.locale === "pt-BR") response = "Seu mapa foi removido com sucesso!"
        
        await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${language[interaction.locale] ? language[interaction.locale]["map_delete"].response : "Your map has been successfully removed!"}`
        }
      }
        })
      }

      if (cmd.name === "send"){
   //   console.log(intearction)

     // console.log()

      let url = interaction.data.resolved.attachments[cmd.options[2].value].url;
      //console.log(interaction.data.resolved.attachments[cmd.options[2].value].url)

      /*let embed = {
        image: {
          url: `${url}`
        }
      }*/

      let db = await userdb.findOne({
          userID: interaction.member.user.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: interaction.member.user.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: interaction.member.user.id
        })
        }

      let mapas = db.perfil.mapas;

        let responseMapLimit = "You've reached the map limit!\nYou can only submit 25 maps!"

        if (interaction.locale === "pt-BR") responseMapLimit = "Você atingiu o limite de mapas!\nVocê pode enviar apenas 25 mapas!"

        if (mapas.length === 25){
          await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${language[interaction.locale] ? language[interaction.locale]["map_save"].limit : "You've reached the map limit!\nYou can only submit 25 maps!"}`,
          flags: 64
        }
      }
        })
        }

     // console.log(embed.image.url)

      db.perfil.mapas.push({
        name: cmd.options[0].value,
        description: cmd.options[1].value,
        image: `${url}`
      });

      let embed = {
        title: `${cmd.options[0].value}`,
        description: `${cmd.options[1].value}`,
        image: {
          url: `${url}`
        }
      }


//console.log(embed)

      await db.save();

      await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          embeds: [embed]
        }
      }
        })
      }
    }
    if (subCmd === "about-me"){

      let db = await userdb.findOne({
          userID: interaction.member.user.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: interaction.member.user.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: interaction.member.user.id
        })
        }

                let data = {
            title: `${language[interaction.locale] ? language[interaction.locale]["aboutme"].modal_title : "About Me Changes"}`,
            option_name: `${language[interaction.locale] ? language[interaction.locale]["aboutme"].modal_option : "Insert your new About Me below"}}`
          }

      let modal = {
       title: `${data.title}`,
        custom_id: "sobremim",
        components: [{
          type: 1,
          components: [{
            type: 4,
            custom_id: "x",
            label: `${data.option_name}`,
            style: 1,
            value: `${db.perfil.sobremim}`
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
    if (subCmd === "view"){

              let userId;

        if (interaction.data.options[0].options.length == 0){

        userId = interaction.member.user.id;
        
      } else {
        userId = interaction.data.options[0].options[0].value;
        
        }

        let db = await userdb.findOne({
          userID: userId
        })

        if (!db) {
          let newUser = new userdb({
            userID: userId
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: userId
        })


        }

      await dbQ.set("mapUserId_" + interaction.member.user.id, `${userId}`);
     // console.log(db)
      

      let emblemas = `${db.perfil.emblema.conhecedor ? "<:map_critic:1197164969154838578>" : ""}${db.perfil.emblema.dev ? "<:dev:1197164721330212865>" : ""}${db.perfil.emblema.yt ? "🎥" : ""}`;

      if (userId === "890320875142930462") emblemas += "👑";

      if (Date.now() < db.premium) emblemas += `<:premium:1197164849113862195>`;

      

      let mapas = db.perfil.mapas;
      let ver = true
      let select;

      if (!mapas || mapas.length === 0) ver = false;

      if (ver){

        let x = 0

        let options = []
        mapas.map(map => {
          options.push({
            label: `${map.name}`,
            description: "Click to view the map",
            value: `${x}`
          })

          x = x + 1
        })

        let i = "List of Maps"
        if (interaction.locale === "pt-BR") i = "Lista de Mapas"
        select = {
          "type": 1,
          "components": [{
            "type": 3,
            "custom_id": `mapas_${interaction.member.user.id}`,
            "options": options,
            "placeholder": i
          }]
        }
      }

      let data = {}

      if (ver) data.components = [select];

       await DiscordRequest(
  CALLBACK.guild.userGet(
    interaction.guild_id, 
    userId), {
      method: "GET"
  }).then(async(x) => {
  let userData = await x.json();

        let url = `https://cdn.discordapp.com/avatars/${userId}/${userData.user.avatar}.png?size=2048`;
     

      /*let embed = {
        title: `Profile of ${userData.user.bot ? `${userData.user.username}` : `${userData.user.global_name}`}`,
        description: `Uid: **\`${db.uid}\`**\n
Mini Beans: **${db.economia.moedas}**
Badges: ${emblemas}
AboutMe: **\`${db.perfil.sobremim}\`**`,
        thumbnail: {
          url: `${url}`
        },
        color: 65280
      }*/

         let embed = {
           title: `${language[`${interaction.locale}`] ? language[`${interaction.locale}`]["view"].embed_title.replace("(userName)", userData.user.bot ? `${userData.user.username}` : `${userData.user.username}`) : `Profile of ${userData.user.bot ? `${userData.user.username}` : `${userData.user.username}`}`}`,
           description: `${language[`${interaction.locale}`] ? language[`${interaction.locale}`]["view"].embed_description.replace("(uid)", db.uid).replace("(minibeans)", db.economia.moedas).replace("(badges)", emblemas).replace("(aboutme)", db.perfil.sobremim) : `Uid: **\`${db.uid}\`**\n
Mini Beans: **${db.economia.moedas}**
Badges: ${emblemas}
AboutMe: **\`${db.perfil.sobremim}\`**`}`,
           thumbnail: {
          url: `${url}`
        },
        color: 65280
         }

         
         

      data.embeds = [embed];
      data.content = `<@${interaction.member.user.id}>`;

         await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: data
      }
        })
       })
    }
  }
}

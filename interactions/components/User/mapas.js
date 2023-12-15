const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
let { userdb } = require("../../../mongodb/user.js")

const { QuickDB } = require("quick.db");
const dbQ = new QuickDB()

module.exports = {
  customId: "mapas_",
  run: async function(interaction, id) {
   // console.log(interaction)

    let verf = id.replace("mapas_", "");
    if (interaction.member.user.id !== verf){
     await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `Espere um minutinho... Você não é <@${verf}>! Sai daqui!`,
          flags: 64
        }
      }
      })
    }

    let userId = await dbQ.get("mapUserId_" + interaction.member.user.id);

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

          let value = Number(`${interaction.data.values[0]}`);

          let mapa = db.perfil.mapas[value];

          let embed = {
            title: `${mapa.name}`,
            description: `${mapa.description}`,
            image: {
              url: `${mapa.image}`
            },
          }

          await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          embeds: [embed],
          flags: 64
        }
      }
        })
        }
}
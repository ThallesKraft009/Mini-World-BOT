 const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const { userdb } = require("../../../mongodb/user.js");

module.exports = {
  customId: "uid",
  run: async function(interaction, id){

    let uid = interaction.data.components[0].components[0].value;

  //  console.log(sobremim)

    let data = {
      response: `Your UID has been saved as ${uid}!`
    }

    if (interaction.locale === "pt-BR") data.response = `Seu uid foi salvo para ${uid}!`

    let db = await userdb.findOne({
         userID: interaction.member.user.id
     })
      
     if(!db){
         const newuser = new userdb({ userID: interaction.member.user.id })
         await newuser.save();
         
         db = await userdb.findOne({ userID: interaction.member.user.id })
     }

    await userdb.updateOne({
         userID: interaction.member.user.id
     }, { $set: {
  "uid": uid
     }
     })

    await DiscordRequest(CALLBACK.interaction.response(
        interaction.id, interaction.token
      ), {
        method: 'POST',
        body: {
          type: 4,
          data: {
            content: `${data.response}`,
            flags: 64
          }
        }
      })
    
  }
                               }
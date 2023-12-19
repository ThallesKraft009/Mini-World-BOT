 const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const { userdb } = require("../../../mongodb/user.js");
const language = require("../../../language/commands/uid.js")
module.exports = {
  customId: "uid",
  run: async function(interaction, id){

    let uid = interaction.data.components[0].components[0].value;

  //  console.log(sobremim)

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
            content: `${language[`${interaction.locale}`]["modal"].response ? language[`${interaction.locale}`]["modal"].response.replace("(uid)", uid) : `Your UID has been saved as ${uid}!`}`,
            flags: 64
          }
        }
      })
    
  }
                               }
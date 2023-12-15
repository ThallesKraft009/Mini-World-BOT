 const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const { userdb } = require("../../../mongodb/user.js");

module.exports = {
  customId: "sobremim",
  run: async function(interaction, id){

    let sobremim = interaction.data.components[0].components[0].value;

  //  console.log(sobremim)

    let data = {
      response: `Your About Me has been saved to: ${sobremim}`
    }

    if (interaction.locale === "pt-BR") data.response = `Seu Sobremim fou alterado para: ${sobremim}`

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
  "perfil.sobremim": sobremim
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
const language = require("../../../language/commands/bot.js")

const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");

module.exports = {
  customId: "commands",
  run: async function(interaction, id) {
    let value = interaction.data.values[0];

    if (value === "0"){
      let embed = language[interaction.locale]["help"]["embed_0"] ? language[interaction.locale]["help"]["embed_0"] : {
        title: "Information Commands",
        fields: [{
          name: "</bot help:12345>",
          value: "`See my list of commands`"
        },{
          name: "</bot info:12345>",
          value: "`See my current information`"
        },{
          name: "</servers:12345>",
          value: "`See all official Mini World servers`"
        }],
        color: 16776960
      };

      await DiscordRequest(CALLBACK.interaction.response(
      interaction.id, interaction.token
      ), {
         method: "POST",
         body: {
           type: 7,
           data: {
             content: `<@${interaction.member.user.id}>`,
             embeds: [embed]
           }
         }
      })
    } else if (value === "1"){
      let embed = language[interaction.locale]["help"]["embed_1"] ? language[interaction.locale]["help"]["embed_1"] : {
        title: "Economy Commands",
        fields: [{
          name: "</minibeans daily:12345>",
          value: "`Redeem your daily Mini Beans`"
        },{
          name: "</minibeans atm:13345>",
          value: "`See how many Mini Beans you or another user has!`"
        },{
          name: "</minibeans pay:12345>",
          value: "`Send Mini Beans to another user!`"
        },{
          name: "</minibeans work:12345>",
          value: "`Do projects and earn Mini Beans`"
        },{
          name: "</minibeans rank:12345>",
          value: "``"
        }],
        color: 65280
      };

      await DiscordRequest(CALLBACK.interaction.response(
      interaction.id, interaction.token
      ), {
         method: "POST",
         body: {
           type: 7,
           data: {
             content: `<@${interaction.member.user.id}>`,
             embeds: [embed]
           }
         }
      })
    } else if (value === "2"){
      let embed = language[interaction.locale]["help"]["embed_2"] ? language[interaction.locale]["help"]["embed_2"] : {
        title: "Social Commands",
        fields: [{
          name: "</profile view:12345>",
          value: "`View the profile of a user`"
        },{
          name: "</profile about-me:12345>",
          value: "`Change your About Me`"
        },{
          name: "</profile maps send:12345>",
          value: "`Submit your maps to appear on your profile`"
        },{
          name: "</profile maps delete:12345>",
          value: "`Delete the maps that appear on your profile`"
        },{
          name: "</uid save:12345>",
          value: "`Save your UID on Discord`"
        },{
          name: "</uid search:12345>",
          value: "`View the UID of another member`"
        }],
        color: 16753152
      };

      await DiscordRequest(CALLBACK.interaction.response(
      interaction.id, interaction.token
      ), {
         method: "POST",
         body: {
           type: 7,
           data: {
             content: `<@${interaction.member.user.id}>`,
             embeds: [embed]
           }
         }
      })
    }
  }
}
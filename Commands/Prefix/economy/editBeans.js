const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const {userdb} = require("../../../mongodb/user.js")

module.exports = {
  name: "beans",
  run: async(message, args) => {

    if (message.author.id !== "890320875142930462") return;

    let cmd = args[0];
    let userId = args[1];
    let total = Number(`${args[2]}`);

    let db = await userdb.findOne({
      userID: userId
    });

    if (!db){
      let newUser = new userdb({
      userID: userId
    });
      await newUser.save();

      db = await userdb.findOne({
      userID: userId
    });
    }
    
    if (cmd === "add") db.economia.moedas += total;

    if (cmd === "remove") db.economia.moedas -= total;

    await DiscordRequest(CALLBACK.message.response(message.channel_id),{
      method: "POST",
      body: {
        content: `<@${message.author.id}> | Mini Feijões atualizadas!`
      }
    })

    await db.save();

  }
}
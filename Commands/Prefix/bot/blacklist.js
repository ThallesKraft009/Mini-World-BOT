const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const {userdb} = require("../../../mongodb/user.js")

module.exports = {
  name: "blacklist",
  run: async function(message, args){

    
    if (message.author.id !== "890320875142930462") return;

    

    let cmd = args[0];
    let userId = args[1];
    let reason = args.slice(2).join(" ");

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
  let text;

    if (cmd === "set"){
      db.blacklist = true;
      db.blacklist_reason = reason;
      text = "Usuário entrou na Blacklist.";

      await db.save();

      await DiscordRequest(CALLBACK.message.response(message.channel_id),{
        method: "POST",
        body: {
          content: text
        }
      })
    } else if (cmd === "remove"){
      db.blacklist = false;
      db.blacklist_reason = "Undefined.";
      text = "Usuário saiu da blacklist.";

      await db.save();

      await DiscordRequest(CALLBACK.message.response(message.channel_id),{
        method: "POST",
        body: {
          content: text
        }
      })
    }

      
  }
}
  
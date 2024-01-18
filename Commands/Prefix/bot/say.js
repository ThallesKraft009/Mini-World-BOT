const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");

module.exports = {
  name: "say",
  run: async(message, args) => {
   // console.log(true)
    if (message.author.id !== "890320875142930462") return;

    let msg = args.join(" ");

    await DiscordRequest(CALLBACK.message.response(message.channel_id), {
      method: "POST",
      body: {
        content: msg
      }
    })
  }
}
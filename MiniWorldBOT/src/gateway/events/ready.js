const client = require("../MiniWorldBOT.js");
const config = require("../../config/secret.js")
client.once("ready", async() => {

  require("mongoose").connect(config.mongo)
  console.log(require("colors").cyan(client.user.username + " online!"))
})
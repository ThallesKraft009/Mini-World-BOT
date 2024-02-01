const client = require("../MiniWorldBOT.js");
const c= require("colors");

client.on("shardReady", (shardId) => {
  console.log(c.red("Shard " + shardId + " iniciada."))
})
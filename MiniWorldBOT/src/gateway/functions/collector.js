const client = require("../MiniWorldBOT.js");

async function collector(func) {
  client.on("interactionCreate", (i) => {
    try {
      func(i);
    } catch (e) {
      console.log(e);
    }
  });
}

module.exports = { collector };
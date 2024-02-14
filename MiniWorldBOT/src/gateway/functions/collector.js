const client = require("../MiniWorldBOT.js");

async function collector(func) {
  client.on("interactionCreate", (i) => {
    try {
      func(i);
    } catch (e) {
      console.log(e);

       i.reply({
        content: `Ocorreu um erro ao executar a interação....\`\`\`\n${e}\n\`\`\``
      })
    }
  });
}

module.exports = { collector };
const MiniWorldBOT = require("./MiniWorldBOT/manager.js");

new MiniWorldBOT().start()

process.on('uncaughtException', (err) => {
  console.error('Erro não capturado:', err);
});
const { Schema, model } = require('mongoose');
//console.log(Array)
const data = new Schema({
  userID: { type: String },
  uid: { type: String, default: "Não definido" },
  premium: { type: Number, default: 0 },
  blacklist: { type: Boolean, default: false },
  blacklist_reason: { type: String, default: "Undefined."},
  
  economia: {
    moedas: { type: Number, default: 0 },
    daily_time: { type: Number, default: 0 },
    work_time: { type: Number, default: 0 }
  },

  rpg: {
    item: {
      madeira: { type: Number, default: 0 },
      pedra: { type: Number, default: 0 },
    },

    blocks: {
      cooper: { type: Number, default: 0 },
      mithril: { type: Number, default: 0 },
      titanio: { type: Number, default: 0 }
    },

    picaretas: {
      stone: { type: Array, default: [] },
      cooper: { type: Array, default: [] },
      mithril: { type: Array, default: [] }
    }
  },

  perfil: {
    sobremim: { type: String, default: "Não definido "},
    mapasMw: { type: Array, default: [] },
    banners: { type: Array, default: [] },
    banner: { type: String, default: "profile.png" },
    badges: { type: Array, default: [] },
    personagem: { type: String, default: "<:kaka:1147585577298972745>"}
  }
});

const userdb = model('Users-Global-Mw', data);

module.exports = { userdb };

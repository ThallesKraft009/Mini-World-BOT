const { Schema, model } = require('mongoose');
console.log(Array)
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

  perfil: {
    sobremim: { type: String, default: "Não definido "},
    mapasMw: { type: Array, default: [] },
    banners: { type: Array, default: [] },
    banner: { type: String, default: "profile.png" },
    emblema: {
      dev: { type: Boolean, default: false },
      conhecedor: { type: Boolean, default: false },
      yt: { type: Boolean, default: false },
      staffBot: { type: Boolean, default: false },
      staffServer: { type: Boolean, default: false }
    }
  }
});

const userdb = model('Users-Global-Mw', data);

module.exports = { userdb };

const { Schema, model } = require('mongoose');

const data = new Schema({
  userID: { type: String },
  uid: { type: String, default: "Não definido" },

  economia: {
    moedas: { type: Number, default: 0 },
    daily_time: { type: Number, default: 0 }
  }
});

const userdb = model('Users-Global-Mw', data);

module.exports = { userdb };

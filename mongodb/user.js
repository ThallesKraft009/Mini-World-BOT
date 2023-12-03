const { Schema, model } = require('mongoose');

const data = new Schema({
  userID: { type: String },
  uid: { type: String, default: "Não definido" }
});

const userdb = model('Users-Global-Mw', data);

module.exports = { userdb };

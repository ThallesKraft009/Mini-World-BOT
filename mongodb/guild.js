const { Schema, model } = require('mongoose');

const data = new Schema({
  guildID: { type: String },

  bot: {
    prefix: { type: String, default: 'mw!' }
  }
});

const guilddb = model('Guilds', data);

module.exports = { guilddb };

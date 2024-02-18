const { Schema, model } = require('mongoose');

const data = new Schema({
  guildID: { type: String },
  channelId: { type: String },
  messageId: {type:String},

  category: { type: String },
   
  rolesView: { type: Array, default: [] },
  thread: { type: Boolean, default: false },
  
  ticketLog: { type: String, default: null },

  responseEmbed: { type: Array, default: [] }
});

const db = model('Mw-Guild-Ticket', data);

module.exports = { db };

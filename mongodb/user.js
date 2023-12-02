import { Schema, model } from 'mongoose';

const data = new Schema({
  userID: { type: String },
  uid: { type: Number, default: null }
});

const userdb = model('Users-Global-Mw', data);

export { userdb };

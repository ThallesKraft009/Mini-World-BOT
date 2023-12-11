require("dotenv").config();

module.exports = {
  token: process.env.token,
  clientId: "1183056545630662717",
  intents: 3276799,
  mongo: process.env.mongo
};
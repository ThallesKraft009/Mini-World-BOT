require("dotenv").config();

module.exports = {
  token: process.env.token,
  clientId: "1180550435464020028",
  intents: 3276799,
  mongo: process.env.mongo
};
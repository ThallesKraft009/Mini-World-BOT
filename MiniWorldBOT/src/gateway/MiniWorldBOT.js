const settings = require("../config/secret.js");
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
/** /
shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,*/
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  shards: getInfo().SHARD_LIST,
    shardCount: getInfo().TOTAL_SHARDS,
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
})

client.cluster = new ClusterClient(client);
client.commands = new Collection();
client.events = new Collection();
module.exports = client;

client.categories =  fs.readdirSync("./MiniWorldBOT/src/gateway/commands/");


["event_handler", "slash_handler"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});


client.login(settings.token)
import CALLBACK from '../../../settings/callback.js';
import DiscordRequest from '../../../settings/request.js';

export default {
  name: 'avatar',
  run: async function (message, args) {

    let user;
    let url;

    if (message.mentions.length === 0) {
      user = message.author;
      url = `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png?size=2048`;
      console.log('author');
    } else {
      user = message.mentions[0];
      url = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`;
    }

    let embed = {
      title: `Avatar de ${user.global_name}`,
      image: {
        url: url
      },
      color: 9384170
    };

    let button = [{
      type: 1,
      components: [{
        type: 2,
        label: 'Baixe o Avatar',
        style: 5,
        url: url
      }]
    }];

    await DiscordRequest(CALLBACK.message.response(message.channel_id), {
      method: 'POST',
      body: {
        content: `<@${message.author.id}>`,
        embeds: [embed],
        components: button,
        message_reference: {
          message_id: message.id,
          channel_id: message.channel_id,
          guild_id: message.guild_id
        }
      }
    });
  }
};


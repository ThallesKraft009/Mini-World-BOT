import CALLBACK from '../../../settings/callback.js';
import DiscordRequest from '../../../settings/request.js';

export default {
  data: {
    name: 'user',
    description: 'Comandos relacionados a Usuarios',
    type: 1,
    options: [{
      name: 'avatar',
      description: 'Veja o avatar de algum usuário',
      type: 1,
      options: [{
        name: 'membro',
        description: 'Mencione ou insira o ID',
        type: 6,
        required: false
      }]
    }]
  },

  run: async function (interaction) {
    let option = interaction.data.options[0].name;

    let userId;
    let url;

    if (option === 'avatar') {
      if (interaction.data.options[0].options.length === 0) {

        userId = interaction.member.user.id;

      } else {
        userId = interaction.data.options[0].options[0].value;

      }

      await DiscordRequest(
        CALLBACK.guild.userGet(
          interaction.guild_id,
          userId), {
        method: 'GET'
      }).then(async (x) => {
        let userData = await x.json();

        let url = `https://cdn.discordapp.com/avatars/${userId}/${userData.user.avatar}.png?size=2048`;

        let embed = {
          title: `Avatar de ${userData.global_name || userData.user.username}`,
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

        await DiscordRequest(
          CALLBACK.interaction.response(
            interaction.id, interaction.token
          ), {
          method: 'POST',
          body: {
            type: 4,
            data: {
              content: `<@${interaction.member.user.id}>`,
              embeds: [embed],
              components: button
            }
          }
        });
      });
    }
  }
};


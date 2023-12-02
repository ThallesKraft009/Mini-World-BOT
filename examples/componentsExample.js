import CALLBACK from '../../../settings/callback.js';
import DiscordRequest from '../../../settings/request.js';

export default {
  customId: '',
  run: async function (interaction, id) {

    let verf = id.replace('', '');
    if (interaction.member.user.id !== verf) {
      await DiscordRequest(
        CALLBACK.interaction.response(interaction.id, interaction.token),
        {
          method: 'POST',
          body: {
            type: 4,
            data: {
              content: `Espere um minutinho... Você não é <@${verf}>! Sai daqui!`,
              flags: 64
            }
          }
        }
      );
    }

    // Codigo
  }
};
  
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder , StringSelectMenuOptionBuilder, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const language = require("../../language/commands/embed.js")
const { collector } = require("../../functions/collector.js");

module.exports = {
  name: "embed",
  description: "Grupo de Comandos",
  type: 1,
  default_member_permissions: "ManageMessages",
  options: [{
    name: "create",
    name_localizations: {
      "pt-BR": "criar"
    },
    description: "Create a fully customized embed",
    description_localizations: {
      "pt-BR": "Crie uma embed totalmente personalizada"
    },
    type: 1
  }],

  run: async(client, interaction) => {

    

    if (interaction.options.getSubcommand() === "create"){

      let embed = new EmbedBuilder();

      embed.setDescription("Description of your embed");

      
      let buttons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel(`${language[interaction.locale] ? language[interaction.locale].buttons.title : "Title"}`)
        .setCustomId(`title_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel(`${language[interaction.locale] ? language[interaction.locale].buttons.description : "Description"}`)
        .setCustomId(`description_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel(`${language[interaction.locale] ? language[interaction.locale].buttons.thumbnail : "Thumbnail"}`)
        .setCustomId(`thumbnail_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel(`${language[interaction.locale] ? language[interaction.locale].buttons.image : "Image"}`)
        .setCustomId(`image_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary)
      )

      let menu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId(`color_${interaction.id}`)
        .setPlaceholder(`${language[interaction.locale] ? language[interaction.locale].buttons.color : "Color"}`)
        .addOptions(
          new StringSelectMenuOptionBuilder()
					.setLabel('Blue')
					.setDescription('Click to select')
					.setValue('Blue'),
			new StringSelectMenuOptionBuilder()
					.setLabel('Red')
					.setDescription('Click to select')
					.setValue('Red'),
          new StringSelectMenuOptionBuilder()
          .setLabel('Yellow')
          .setDescription('Click to select')
          .setValue('Yellow'),
          new StringSelectMenuOptionBuilder()
          .setLabel('Green')
          .setDescription('Click to select')
          .setValue('Green'),
          new StringSelectMenuOptionBuilder()
          .setLabel('Purple')
          .setDescription('Click to select')
          .setValue('Purple'),
        )
      );

      let sendButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel(`${language[interaction.locale] ? language[interaction.locale].buttons.send : "Send"}`)
        .setStyle(ButtonStyle.Success)
        .setCustomId(`send_${interaction.id}`),
        new ButtonBuilder()
        .setLabel(`${language[interaction.locale] ? language[interaction.locale].buttons.json : "Get Json"}`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId(`json_${interaction.id}`)
      )

      await interaction.editReply({
        embeds: [embed],
        components: [buttons,sendButtons,menu]
      })



      collector(async(i) => {

        if (i.isModalSubmit()){
          try {
          if (i.customId === "title_embed"){

            embed.setTitle(`${i.fields.getTextInputValue("x")}`);

            await i.deferUpdate();
            await i.editReply({
              embeds: [embed]
            })
          }
          if (i.customId === "description_embed"){

            embed.setDescription(`${i.fields.getTextInputValue("x")}`);

            await i.deferUpdate();
            await i.editReply({
              embeds: [embed]
            })
          }
          if (i.customId === "thumbnail_embed"){

            embed.setThumbnail(`${i.fields.getTextInputValue("x")}`);

            await i.deferUpdate();
            await i.editReply({
              embeds: [embed]
            })
          }

          if (i.customId === "image_embed"){

            embed.setImage(`${i.fields.getTextInputValue("x")}`);

            await i.deferUpdate();
            await i.editReply({
              embeds: [embed]
            })
          }
          } catch (err) {
            await i.reply({
              content: `${err}`,
              ephemeral: true
            })
          }
        }

        if (i.isButton()){
          if (i.customId === `json_${interaction.id}`){

            await i.reply({
              content: `\`\`\`js\n${JSON.stringify(embed)}\n\`\`\``,
              ephemeral: true
            })
          }
          if (i.customId === `title_${interaction.id}`){

            let modal = new ModalBuilder()
            .setCustomId(`title_embed`)
            .setTitle(`${language[interaction.locale] ? language[interaction.locale].modal.title : "Embed Configuration"}`)
            

            modal.addComponents(
              new ActionRowBuilder()
              .addComponents(
                new TextInputBuilder()
                .setCustomId("x")
                .setLabel(`${language[interaction.locale] ? language[interaction.locale].modal.conteudo : "Write the content"}`)
                .setStyle(TextInputStyle.Paragraph)
                .setValue(`${embed.data.title ? embed.data.title : "Title"}`)
              )
            )

            await i.showModal(modal);
          }


                    if (i.customId === `description_${interaction.id}`){

            let modal = new ModalBuilder()
            .setCustomId(`description_embed`)
            .setTitle(`${language[interaction.locale] ? language[interaction.locale].modal.title : "Embed Configuration"}`)
            

            modal.addComponents(
              new ActionRowBuilder()
              .addComponents(
                new TextInputBuilder()
                .setCustomId("x")
                .setLabel(`${language[interaction.locale] ? language[interaction.locale].modal.conteudo : "Write the content"}`)
                .setStyle(TextInputStyle.Paragraph)
                .setValue(`${embed.data.description ? embed.data.description : "Description"}`)
              )
            )

            await i.showModal(modal);
                    }

          if (i.customId === `thumbnail_${interaction.id}`){

            let modal = new ModalBuilder()
            .setCustomId(`thumbnail_embed`)
            .setTitle(`${language[interaction.locale] ? language[interaction.locale].modal.title : "Embed Configuration"}`)


            modal.addComponents(
              new ActionRowBuilder()
              .addComponents(
                new TextInputBuilder()
                .setCustomId("x")
                .setLabel(`${language[interaction.locale] ? language[interaction.locale].modal.conteudo_url : "Enter the Image URL"}`)
                .setStyle(TextInputStyle.Paragraph)
                .setValue(`${embed.data.thumbnail ? embed.data.thumbnail.url : "Thumbnail"}`)
              )
            )

            await i.showModal(modal);
          }

                    if (i.customId === `image_${interaction.id}`){

            let modal = new ModalBuilder()
            .setCustomId(`image_embed`)
            .setTitle(`${language[interaction.locale] ? language[interaction.locale].modal.title : "Embed Configuration"}`)


            modal.addComponents(
              new ActionRowBuilder()
              .addComponents(
                new TextInputBuilder()
                .setCustomId("x")
                .setLabel(`${language[interaction.locale] ? language[interaction.locale].modal.conteudo_url : "Enter the Image URL"}`)
                .setStyle(TextInputStyle.Paragraph)
                .setValue(`${embed.data.image ? embed.data.image.url : "Image Url"}`)
              )
            )

            await i.showModal(modal);
          }

          if (i.customId === `send_${interaction.id}`){

            let msg = await i.reply({
              content: `${language[interaction.locale] ? language[interaction.locale].send : "Mention a text channel."}`,
              ephemeral: true
            })

            const collector = interaction.channel.createMessageCollector({time: 15_000 });

            collector.on("collect", async(m) => {

              if (m.mentions.channels.first()){
                let channel = m.mentions.channels.first();
                await m.delete()
                //await msg.delete();

                try {
                channel.send({
                  embeds: [embed]
                });

                collector.stop();
                  
                await i.editReply({
                  content: "✅"
                })
                } catch (err) {
                  await i.editReply({
                    content: `${err}`
                  })
                }
              }
            })
            
          }
        }

        if (i.isStringSelectMenu()){
          if (i.customId === `color_${interaction.id}`){
            let color = i.values[0];

            embed.setColor(`${color}`);

            await i.update({
              embeds: [embed]
            })
          }
        }
      })
    }
  }
}
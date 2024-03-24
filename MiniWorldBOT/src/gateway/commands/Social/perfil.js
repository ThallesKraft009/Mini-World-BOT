const { userdb } = require("../../mongodb/user.js");
const { ProfileImage } = require("../../functions/profile.js");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, AttachmentBuilder } = require("discord.js");
const language = require("../../language/commands/profile.js")
const { collector } = require("../../functions/collector.js");

module.exports = {
  name: "profile",
  name_localizations: { "pt-BR": "perfil", "es-ES": "perfil" },
  description: "Grupo de Comandos",
  type: 1,
  options: [{
    name: "view",
    name_localizations: {
      "pt-BR": "ver",
      "es-ES": "ver"
    },
    description: "View your profile or that of another member",
    description_localizations: {
      "pt-BR": "Veja seu perfil ou de algum outro membro",
      "es-ES": "Muestra tu perfil o el perfil de otro usuario"
    },
    type: 1,
    options: [{
        name: "user",
        description: "Mention or enter the ID",
        type: 6,
        required: false
      }]
  },{
    name: "edit",
    name_localizations: {
      "pt-BR": "editar",
      "es-ES": "editar"
    },
    description: "Edit your Profile",
    description_localizations: {
      'pt-BR': "Edite o seu perfil",
      "es-ES": "Edita tu perfil"
    },
    type: 1
  },{
    name: "maps",
    name_localizations: {
      "pt-BR": "mapas",
      "es-ES": "mapas"
    },

    description: "Edit the display of your maps",
    description_localizations: {
      "pt-BR": "Edite a exibição de seus mapas",
      "es-ES": "Edita la presentación de tus mapas"
    },
    type: 1
  }],

  run: async(client, interaction) => {
    let cmd = interaction.options.getSubcommand();

    if (cmd === "maps"){
      let user = interaction.user;
      
      let db = await userdb.findOne({
          userID: user.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: user.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: user.id
        })
        }
     //db.perfil.mapasMw = []
    // await db.save()

      //userdb.perfil.mapas;

      


      collector(async(i) => {

        if (i.isStringSelectMenu()){
          if (i.customId === `mapas_${interaction.id}`){

            let value = i.values[0];

            

              let number = Number(`${value}`)

              let index = db.perfil.mapasMw.indexOf(number);

            db.perfil.mapasMw.splice(index, 1);

              await db.save();

              await i.update({
                content: "Map removed."
              })
            
          }
        }

        if (i.isButton()){
          
          if (i.customId === `addMap_${interaction.id}`){

          
            await i.reply({
              content: `${language[interaction.locale] ? language[interaction.locale].mapas.dm : "See your DM (Private)"}`,
              ephemeral: true
            })

            let msg = await interaction.user.send({
              content: `${language[interaction.locale] ? language[interaction.locale].mapas._1 : "What is the name of your map?"}`
            })

            let data = {
              nome: null,
              description: null
            };

            let collector = msg.channel.createMessageCollector({ time: 15_000 });

collector.on('collect', async(m) => {

  if (m.author.bot) return;

  data.nome = m.content;

  let msg_2 = await m.reply({
    content: `${language[interaction.locale] ? language[interaction.locale].mapas._2 : "Provide a brief description of your map."}`
  })
                    await collector.stop();

  let collector_2 = msg_2.channel.createMessageCollector({ time: 15_000 });

  collector_2.on("collect", async(m_2)=>{

    if (m_2.author.bot) return;
    data.description = m_2.content;

    await collector_2.stop();

    db.perfil.mapasMw.push(data);

    await db.save();
    await interaction.user.send({
      content: `${language[interaction.locale] ? language[interaction.locale].mapas._3 : "Saved."}`
    })
  })
  
});
          }
        }
      })

            if (db.perfil.mapasMw.length === 0){
        return interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale].mapas.nenhum : "You don't have any maps in the list, do you want to add them?"}`,
          components: [new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setLabel("✅")
            .setCustomId(`addMap_${interaction.id}`)
            .setStyle(ButtonStyle.Secondary)
          )]
        })
      } else {

        let options = [];

        let i = 0;

        db.perfil.mapasMw.map(map => {
          console.log(map)
          options.push({
            label: map.nome,
            description: "Click to select",
            value: `${i}`
          })

          i++;
        })

        let menu = new ActionRowBuilder()
        .addComponents(
          new StringSelectMenuBuilder()
          .setCustomId(`mapas_${interaction.id}`)
          .setPlaceholder(`${language[interaction.locale] ? language[interaction.locale].mapas.select : "Map List"}`)
          .addOptions(options)
        );

        await interaction.editReply({
          components: [menu, new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                        .setLabel("✅")
                        .setCustomId(`addMap_${interaction.id}`)
                        .setStyle(ButtonStyle.Secondary)
                      )],
          content: `${language[interaction.locale] ? language[interaction.locale].mapas.text : "Select the map below to edit!"}`
        })
            }
            
    }

    
    if (cmd === "view"){
      let user = interaction.options.getUser("user") || interaction.user;

      let db = await userdb.findOne({
          userID: user.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: user.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: user.id
        })
        }

      
      return ProfileImage(user.displayAvatarURL({format: 'png'}), db.uid, user.username, db.economia.moedas, db.perfil.sobremim, `${language[interaction.locale] ? language[interaction.locale].ver.sobremim : "About me:"}`, interaction, db.perfil.banner, db.perfil.mapasMw);
    }

    if (cmd === "edit"){
      let db = await userdb.findOne({
          userID: interaction.user.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: interaction.user.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: interaction.user.id
        })
        }


      let banners = db.perfil.banners;

      let optionsMenu = [{
        label: "Image 0",
        value: "profile.png",
        description: `${language[interaction.locale] ? language[interaction.locale].edit.banners.description : "Click to select"}`
      }];
      let i = 0;
      banners.map(img => {
        optionsMenu.push({
          label: `Image ${i + 1}`,
          value: `${img.data}`,
          description: `${language[interaction.locale] ? language[interaction.locale].edit.banners.description : "Click to select"}`
        })

        i++;
      })

      let menu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
        .setCustomId(`bannerSelect_${interaction.user.id}_${interaction.id}`)
        .setPlaceholder(`${language[interaction.locale] ? language[interaction.locale].edit.banners.title : "Background Images"}`)
        .addOptions(optionsMenu)
      );

      let file = new AttachmentBuilder(`MiniWorldBOT/src/img/${db.perfil.banner}`);

      await interaction.editReply({
        files: [file],
        components: [menu, new ActionRowBuilder()
                    .addComponents(
                      new ButtonBuilder()
                      .setLabel(`${language[interaction.locale] ? language[interaction.locale].edit.sobremim : "About me"}`)
                      .setCustomId(`sobremim_${interaction.user.id}_${interaction.id}`)
                      .setStyle(ButtonStyle.Secondary)
                    )]
      })
       
      collector(async(msg) => {

        if (msg.isButton()){
          if (msg.customId.startsWith(`banner_click_${interaction.user.id}_${interaction.id}`)){

            let banner = msg.customId.replace(`banner_click_${interaction.user.id}_${interaction.id}_`, "");

            await msg.reply({
              content: `${language[interaction.locale] ? language[interaction.locale].edit.banners.response : "Background image equipped!"}`,
              ephemeral: true
            })

            db.perfil.banner = banner;

            await db.save();
          }

          if (msg.customId === `sobremim_${interaction.user.id}_${interaction.id}`){

            let data = {
            title: `${language[interaction.locale] ? language[interaction.locale]["aboutme"].modal_title : "About Me Changes"}`,
            option_name: `${language[interaction.locale] ? language[interaction.locale]["aboutme"].modal_option : "Insert your new About Me below"}}`
          }

      let modal = {
        title: `${data.title}`,
        custom_id: `sobremim_${interaction.user.id}`,
        components: [{
          type: 1,
          components: [{
            type: 4,
            custom_id: "x",
            label: `${data.option_name}`,
            style: 1,
            value: `${db.perfil.sobremim}`
          }]
        }]
      }

            await msg.showModal(modal);
          }
        }

        if (msg.isModalSubmit()){
          if (msg.customId === `sobremim_${msg.user.id}`){

            let sobremim = msg.fields.getTextInputValue('x');

            db.perfil.sobremim = sobremim;

            await db.save();

            await msg.reply({
              content: `${sobremim}`,
              ephemeral: true
            })
          }
        }

        if (msg.isStringSelectMenu()){

          if (msg.customId == `bannerSelect_${msg.user.id}_${interaction.id}`){

            
          
   let banner = msg.values[0];

            let img = new AttachmentBuilder(`MiniWorldBOT/src/img/${banner}`);

            await msg.update({
              files: [img],
              components: [new ActionRowBuilder()
                          .addComponents(
                            new ButtonBuilder()
                            .setLabel(`${language[interaction.locale] ? language[interaction.locale].edit.banners.click : "Select"}`)
                            .setCustomId(`banner_click_${interaction.user.id}_${interaction.id}_${banner}`)
                            .setStyle(ButtonStyle.Success)
                          ), menu]
            })

          }
        }
      })
    }
  }
}
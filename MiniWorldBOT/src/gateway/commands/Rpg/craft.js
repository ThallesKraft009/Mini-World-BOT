const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { collector } = require("../../functions/collector");
const { userdb } = require("../../mongodb/user.js");
const language = require("../../language/commands/rpg");

module.exports = {
  name: "create",
  name_localizations: {
    "pt-BR": "criar"
  },
  description: "Grupo de Comandos",
  type: 1,
  options: [{
    name: "pickaxe",
    name_localizations: {
      "pt-BR": "picareta"
    },
    description: "Craft a pickaxe",
    description_localizations: {
      "pt-BR": "Crie uma picareta"
    },
    type: 1,
    options: [{
      name: "choice",
      name_localizations: {
        "pt-BR": "escolha"
      },
      description: "Choose a pickaxe",
      type: 3,
      required: true,
      choices: [{
        name: "Stone",
        name_localizations: {
          "pt-BR": "Pedra"
        },
        value: "stone"
      },{
        name: "Copper",
        name_localizations: {
          "pt-BR": "Cobre"
        },
        value: "copper"
      }]
    }]
  }],
  run: async (client, interaction) => {
    const user = interaction.user;
    const db = await userdb.findOne({ userID: user.id });

    if (!db) {
      const newuser = new userdb({
        userID: user.id,
      });

      await newuser.save();
    }

    if (interaction.options.getSubcommand() === "pickaxe") {
      console.log(db.rpg.item);

      let picaretas = {
        stone: () => {
          return db.rpg.item.pedra >= 3 && db.rpg.item.madeira >= 3;
        },
        copper: () => {
          // Adicione a lógica para a picareta de cobre aqui
          return db.rpg.item.cobre >= 3 && db.rpg.item.madeira >= 3;
        }
      };

      const chosenPickaxe = interaction.options.getString("choice");

      if (!picaretas[chosenPickaxe]()) {
        return interaction.editReply({
          content: `${language[interaction.locale]?.material || "You don't have the necessary materials to craft the chosen pickaxe."}`
        });
      } else {
        if (chosenPickaxe === "stone") {
          db.rpg.item.pedra -= 3;
          db.rpg.item.madeira -= 3;
          db.rpg.picaretas.stone.push({
            durabilidade: 300
          });
        } else if (chosenPickaxe === "copper") {
          // Adicione a lógica para a picareta de cobre aqui
          db.rpg.item.cobre -= 3;
          db.rpg.item.madeira -= 3;
          db.rpg.picaretas.copper.push({
            durabilidade: 300
          });
        }

        await interaction.editReply({
          content: `${language[interaction.locale]?.success || "You crafted the chosen pickaxe."}`
        });

        await db.save();
        console.log(db);
      }
    }
  }
};

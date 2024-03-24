const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { collector } = require("../../functions/collector");
const { userdb } = require("../../mongodb/user.js");
const language = require("../../language/commands/rpg");

function generateMap(playerSymbol) {
  return Array(9).fill("⬛").map((cell, index) => (index === 0 ? playerSymbol : cell));
}

function generateRandomResources(map, numberOfResources, resourceSymbol) {
  const resources = [];

  while (resources.length < numberOfResources) {
    const randomNumber = Math.floor(Math.random() * 9);

    if (!resources.includes(randomNumber) && randomNumber !== 0) {
      resources.push(randomNumber);
    }
  }

  resources.forEach(resource => {
    map[resource] = resourceSymbol;
  });

  return resources;
}

module.exports = {
  name: "collect",
  name_localizations: {
    "pt-BR": "coletar",
  },
  description: "Grupo de Comandos",
  type: 1,
  options: [
    {
      name: "wood",
      description: "Collect woods",
      type: 1,
      name_localizations: {
        "pt-BR": "madeira",
      },
      description_localizations: {
        "pt-BR": "Colete madeiras",
      },
    },
    {
      name: "stone",
      description: "Collect stone",
      type: 1,
      name_localizations: {
        "pt-BR": "pedra",
      },
      description_localizations: {
        "pt-BR": "Colete rochas",
      },
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.user;
    const db = await userdb.findOne({ userID: user.id });

    if (!db) {
      const newuser = new userdb({
        userID: user.id,
      });

      await newuser.save();
    }

    const playerSymbol = `${db?.perfil?.personagem || "🏃"}`;
    let x = 0;
    let resourceCount = 0;
    let resourceName = "";
    let resourceSymbol = "";

    let map = generateMap(playerSymbol);
    let resources = [];

    if (interaction.options.getSubcommand() === "wood") {
      resourceName = "madeira";
      resourceSymbol = "🌲";
      resources = generateRandomResources(map, 3, resourceSymbol);
    } else if (interaction.options.getSubcommand() === "stone") {
      resourceName = "pedra";
      resourceSymbol = "🪨";
      resources = generateRandomResources(map, 3, resourceSymbol);
    }

    let embed = new EmbedBuilder().setDescription(`${language[interaction.locale]?.[resourceName] || `Total ${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}:`} ${resourceCount}\n${map.join('')}`)
      .setColor("Green");

    await interaction.editReply({
      embeds: [embed],
      content: `${interaction.user}`,
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel("➡️")
            .setCustomId(`${resourceName}Frente_${interaction.id}`)
            .setStyle(ButtonStyle.Secondary)
        ),
      ],
    });

    collector(async (i) => {
      if (i.isButton()) {
        if (i.customId === `${resourceName}Frente_${interaction.id}`) {
          x++;

          if (x === 9) {
            x = 0;
            map = generateMap(playerSymbol);
            resources = generateRandomResources(map, 3, resourceSymbol);
          }

          if (map[x] === resourceSymbol) {
            resourceCount++;
            db.rpg.item[resourceName]++;
            await db.save();
            let index = resources.indexOf(x);
            resources.splice(index, 1);
          }

          map[x] = playerSymbol;
          map[x - 1] = "⬛";

          embed.setDescription(`${language[interaction.locale]?.[resourceName] || `Total ${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}:`} ${resourceCount}\n${map.join('')}`);

          await i.deferUpdate()
          i.editReply({
            embeds: [embed]
          });
        }
      }
    });
  },
};

const language = require("../../language/commands/kaka.js");
const {EmbedBuilder} = require("discord.js")
module.exports = {
  name: "kaká",
  description: "Ask Kaká questions and get a response.",
  description_localizations: {
    "pt-BR": "Faça alguma pergunta pra Kaká e tenha uma resposta",
    "es-ES": "Preguntale algo a Kaká y te respondera"
  },
  type: 1,
  options: [{
    name: "question",
    name_localizations: {
      "pt-BR": "pergunta",
      "es-ES": "pregunta"
    },
    description: "Enter your question for Kaká",
    type: 3,
    required: true
  }],
  run: async(client, interaction)=>{
    let respostas = language[interaction.locale] ? language[interaction.locale] : ["Yes.", "Of course.", "Certainly!", "I don't know, I don't want to know, I'm angry with those who know.", "Maybe?", "I don't know what to say...", "No.", "Go bother someone else!", "Maybe my creator knows....", "Of course not!", "Probably."];

    let indiceAleatorio = Math.floor(Math.random() * respostas.length);

let respostaAleatoria = respostas[indiceAleatorio];

let embed = new EmbedBuilder()
    .setAuthor({
      name: "Kaká",
      iconURL: "https://cdn.discordapp.com/attachments/1174084824135376966/1221473871018856529/kaka.png?ex=6612b530&is=66004030&hm=c3a6aed2a5b01673d2d9ae8d4cd6ea8406c693a157b46a49660300769725a56b&"
    })
    .setDescription(`${respostaAleatoria}`)

    await interaction.editReply({
      embeds: [embed]
    })
  }
}
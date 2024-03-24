const { TicTacToe } = require('discord-gamecord');
const language = require("../../language/commands/bet.js");
const {userdb} = require("../../mongodb/user.js")

module.exports = {
  name: "bet",
  name_localizations: {
    "pt-BR": "apostar"
  },
  description: "Grupo de Comandos",
  type: 1,
  options: [{
    name: "tictactoe",
    name_localizations: {
      "pt-BR": "jogo-da-velha"
    },
    type: 1,
    description: "Bet minibeans on Tic-tac-toe",
    description_localizations: {
      "pt-BR": "Aposte Minifeijões no jogo da velha",
      "es-ES": "Apuesta minifrijoles en Tic-Tac-Toe"
    },
    options: [{
      name: "user",
      name_localizations: {
        "pt-BR": "usuário"
      },
      description: "Mention a user or enter their ID",
      type: 6,
      required: true
    },{
      name: "amount",
      description: "Enter the amount",
      type: 10,
      name_localizations: {
        "pt-BR": "quantidade"
      },
      required: true
    }]
  }],
  run: async(client, interaction) => {

    if (interaction.options.getSubcommand() === "tictactoe"){

      let user_1Db = await userdb.findOne({
        userID: interaction.user.id
      })

      if (!user_1Db) {
        let newUser = new userdb({
          userID: interaction.user.id
        })

        await newUser.save();

        user_1Db = await userdb.findOne({
        userID: interaction.user.id
      })
      }

      let user_2Db = await userdb.findOne({
        userID: interaction.options.getUser("user").id
      })

      if (!user_2Db) {
        let newUser = new userdb({
          userID: interaction.options.getUser("user").id
        })

        await newUser.save();

        user_2Db = await userdb.findOne({
        userID: interaction.options.getUser("user").id
      })
      }

      if (user_1Db.economia.moedas < interaction.options.getNumber("amount") && user_2Db.economia.moedas < interaction.options.getNumber("amount")){

        return interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale].game_1.noMoney : "You or your opponent do not have enough mini beans to bet."}`
        })
      }

const Game = new TicTacToe({
  message: interaction,
  isSlashGame: true,
  opponent: interaction.options.getUser("user"),
  embed: {
    title: `${language[interaction.locale] ? language[interaction.locale].game_1.title : "Tic Tac Toe"}`,
    color: '#5865F2',
    statusTitle: 'Status',
    overTitle: 'Game Over'
  },
  emojis: {
    xButton: '❌',
    oButton: '🔵',
    blankButton: '➖'
  },
  mentionUser: true,
  timeoutTime: 60000,
  xButtonStyle: 'DANGER',
  oButtonStyle: 'PRIMARY',
  turnMessage: `${language[interaction.locale] ? language[interaction.locale].game_1.turnMessage : '{emoji} | Its turn of player **{player}**.'}`,
  winMessage: `${language[interaction.locale] ? language[interaction.locale].game_1.win : '{emoji} | **{player}** won the TicTacToe Game.'}`,
  tieMessage: `${language[interaction.locale] ? language[interaction.locale].game_1.tie : 'The Game tied! No one won the Game!'}`,
  timeoutMessage: `${language[interaction.locale] ? language[interaction.locale].game_1.timeout : 'The Game went unfinished! No one won the Game.'}`,
  playerOnlyMessage: `${language[interaction.locale] ? language[interaction.locale].game_1.onlyMessage : 'Only {player} and {opponent} can use these buttons.'}`
});

Game.startGame();
Game.on('gameOver', async(result) => {
 // console.log(result);  // =>  { result... }

  if (result.status === "win"){
    let userId = result.winner;

    
    if (userId === interaction.user.id){
      user_1Db.economia.moedas += interaction.options.getNumber("amount");

      user_2Db.economia.moedas -= interaction.options.getNumber("amount");

      await user_1Db.save();
      await user_2Db.save();
    } else if (userId === interaction.options.getUser("user").id){
      user_1Db.economia.moedas -= interaction.options.getNumber("amount");

      user_2Db.economia.moedas += interaction.options.getNumber("amount");

      await user_1Db.save();
      await user_2Db.save();
    }
  }
});
    }
  }
}
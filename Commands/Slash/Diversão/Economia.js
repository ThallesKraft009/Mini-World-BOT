const CALLBACK = require("../../../settings/callback.js");
const DiscordRequest = require("../../../settings/request.js");
const {userdb} = require("../../../mongodb/user.js")
const tempo = require("ms")
module.exports = {
  data: {
    name: "minibeans",
    name_localizations: {
      "pt-BR": "minifeijões"
    },
    description: "Comandos relacionados a Economia",
    type: 1,
    options: [{
      name: "daily",
      name_localizations: {
        "pt-BR": "diárias"
      },
      description: "Redeem your Daily Mini Beans!",
      description_localizations: {
        "pt-BR": "Resgate seus Mini Feijões diários!"
      },
      type: 1
    },{
      name: "atm",
      description: "Check how many Mini Beans a member has!",
      description_localizations: {
        "pt-BR": "Veja quantos Minifeijoes algum membro tem!"
      },
      type: 1,
      options: [{
        name: "member",
        name_localizations: {
          "pt-BR": "membro"
        },
        description: "Mention a member to check his Mini Beans!",
        type: 6,
        required: false
      }]
    },{
      name: "pay",
      name_localizations: {
        "pt-BR": "pagar"
      },
      description: "Send mini beans to a member!",
      description_localizations: {
        "pt-BR": "Envie mini feijões para um membro!"
      },
      type: 1,
      options: [{
        name: "member",
        name_localizations: {
          "pt-BR": "membro"
        },
        description: "Mention a member",
        type: 6,
        required: true
      },{
        name: "quantity",
        name_localizations: {
          "pt-BR": "quantidade"
        },
        description: "Enter how many mini beans you want to send",
        description_localizations: {
          "pt-BR": "Insira quantos mini feijões você quer enviar"
        },
        type: 10,
        required: true
      }]
    }]
  },
  run: async function(interaction) {

    let subCmd = interaction.data.options[0].name;

    if (subCmd === "pay"){

      let userId = interaction.data.options[0].options[0].value;

      let quantidade = interaction.data.options[0].options[1].value;

      let userIsAuthor = `You cannot send mini beans to yourself`

      if (interaction.locale == "pt-BR") userIsAuthor = `Você não pode enviar Mini Feijões para você mesmo!`

      if (userId === interaction.member.user.id) return await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${userIsAuthor}`,
          flags: 64
        }
      }
        })


      let db_1 = await userdb.findOne({
        userID: interaction.member.user.id
      })

      if (!db_1){
        let newuser = new userdb({ userID: interaction.member.user.id })

        newuser.save()

        db_1 = await userdb.findOne({ userID: interaction.member.user.id
                                    })
      }

      let db_2= await userdb.findOne({
        userID: userId
      })

      if (!db_2){
        let newuser = new userdb({ userID: userId })

        newuser.save()

        db_2 = await userdb.findOne({ userID: userId
                                    })
      }

      let money_1 = db_1.economia.moedas
      let money_2 = db_2.economia.moedas

      if (quantidade > money_1 || quantidade < 0){

        let responseIf = `You don't have that many Mini Beans!`

        if (interaction.locale === "pt-BR") responseIf = "Você não tem tudo isso de Mini Feijões!"

        return await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${responseIf}`,
          flags: 64
        }
      }
        })
      } else {

        db_1.economia.moedas = db_1.economia.moedas - quantidade;
        db_1.save()

        db_2.economia.moedas = db_2.economia.moedas + quantidade;
        db_2.save()

        let response = `You sent ${quantidade} Mini Beans to <@${userId}>`

        if (interaction.locale === "pt-BR") response = `Você enviou ${quantidade} Mini Feijões para <@${userId}>`

        await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${response}`
        }
      }
        })
      }
    }

      if (subCmd === "atm"){

        let userId;

        if (interaction.data.options[0].options.length == 0){

        userId = interaction.member.user.id;
        
      } else {
        userId = interaction.data.options[0].options[0].value;
        
        }

        let db = await userdb.findOne({
          userID: userId
        })

        if (!db) {
          let newUser = new userdb({
            userID: userId
          })

          await newUser.save();

          
        }


        const rankedUsers = await userdb.find({
              "economia.moedas": { 
                $gt: 0 
              }
            })
                .sort({ 
                  "economia.moedas": -1 
                })
                .exec();
    
            let userPosition = rankedUsers.findIndex(user => user.userID === db.userID) + 1;

            if (db.economia.moedas === 0) {
           userPosition = rankedUsers.length + 1;
            }

        let data = {
            response_author: `<:minifeijao:1180909398223245452> | You have **\`${db.economia.moedas}\`** mini beans and are in position **#${userPosition}** on the leaderboard!`,
            response_mention: `<:minifeijao:1180909398223245452> | <@${userId}> has **\`${db.economia.moedas}\`** mini beans and is in position **#${userPosition}** on the leaderboard!`
          };

        

        if (interaction.locale === "pt-BR") data = {
          response_author: `<:minifeijao:1180909398223245452> | Você tem **\`${db.economia.moedas}\`** mini feijões e está na posição **#${userPosition}** do rank!`,
          response_mention: `<:minifeijao:1180909398223245452> | <@${userId}> tem **\`${db.economia.moedas}\`** mini feijõese está na posição **#${userPosition}** do rank!`
        }

let mention;

        if (userId === interaction.member.user.id){
          mention = false
        } else {
          mention = true
        }

        
        await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${mention ? `${data.response_mention}` : `${data.response_author}` }`
        }
      }
        })
        
      }

    if (subCmd === "daily"){

      let money = getRandomNumberBetween(1000, 10000);
      // Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

      let db = await userdb.findOne({ userID: interaction.member.user.id })

      if (!db){
        let newuser = new userdb({ userID: interaction.member.user.id })

        await newuser.save();

        db = await userdb.findObe({ userID: interaction.member.user.id })
      }

      if(Date.now() < db.economia.daily_time){
      const calc = db.economia.daily_time - Date.now()
      let response = `You can only claim your daily again in ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s ! `


        
        if (interaction.locale === "pt-BR") response = `🚫 | Você só pode pegar seu daily novamente em ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s !`


          await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${response}`,
          flags: 64
        }
      }
        })
        
        
      }
      
       let response = `Today you received <:minifeijao:1180909398223245452> ${money} mini beans!!!`

      if (interaction.locale === "pt-BR") response = `Você hoje recebeu <:minifeijao:1180909398223245452> ${money} mini feijões!!!`

      await userdb.updateOne({
        userID: interaction.member.user.id
      }, { $set: {
        "economia.moedas": db.economia.moedas + money,
        "economia.daily_time": Date.now() + tempo("24h")
      }})

         await DiscordRequest(
        CALLBACK.interaction.response(
          interaction.id, interaction.token
        ), { 
      method: 'POST',
      body: {
        type: 4,
        data: {
          content: `${response}`
        }
      }
        })

      
    }
  }
}
  

function getRandomNumberBetween(x, y) {
  if (x >= y) {
    throw new Error("O valor de 'x' deve ser menor que 'y'");
  }
  const randomNumber = Math.floor(Math.random() * (y - x + 1)) + x;
  return randomNumber;
}

      function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
}

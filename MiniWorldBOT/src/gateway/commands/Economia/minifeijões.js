const shop = require("../../../config/shop.json")
const {userdb} = require("../../mongodb/user.js")
const tempo = require("ms")
const language = require("../../language/commands/economia.js")
const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");
const { collector } = require("../../functions/collector.js");

module.exports = {
  
    name: "minibeans",
    name_localizations: {
      "pt-BR": "minifeijões",
      "es-ES": "minifrijoles"
    },
    description: "Comandos relacionados a Economia",
    type: 1,
    options: [{
      name: "daily",
      name_localizations: {
        "pt-BR": "diárias",
        "es-ES": "diarios"
      },
      description: "Redeem your Daily Mini Beans!",
      description_localizations: {
        "pt-BR": "Resgate seus Mini Feijões diários!",
        "es-ES": "Reclama tus Mini Frijoles diarios"
      },
      type: 1
    },{
      name: "atm",
      name_localizations: {
        "es-ES": 'balance'
      },
      description: "Check how many Mini Beans a member has!",
      description_localizations: {
        "pt-BR": "Veja quantos Minifeijoes algum membro tem!",
        "es-ES": "Muestra cuantos mini frijoles tienes"
      },
      type: 1,
      options: [{
        name: "member",
        name_localizations: {
          "pt-BR": "membro",
          "es-ES": "usuario"
        },
        description: "Mention a member to check his Mini Beans!",
        description_localizations: {
          "es-ES": "Menciona a un usuario o utiliza su ID"
        },
        type: 6,
        required: false
      }]
    },{
      name: "pay",
      name_localizations: {
        "pt-BR": "pagar",
        "es-ES": "pagar"
      },
      description: "Send mini beans to a member!",
      description_localizations: {
        "pt-BR": "Envie mini feijões para um membro!",
        "es-ES": "Págale Mini Frijoles a un usuario"
      },
      type: 1,
      options: [{
        name: "member",
        name_localizations: {
          "pt-BR": "membro",
          "es-ES": "usuario"
        },
        description: "Mention a member",
        description_localizations: {
          "es-ES": "Menciona a un usuario o utiliza su ID"
        },
        type: 6,
        required: true
      },{
        name: "quantity",
        name_localizations: {
          "pt-BR": "quantidade",
          "es-ES": "cantidad"
        },
        description: "Enter how many mini beans you want to send",
        description_localizations: {
          "pt-BR": "Insira quantos mini feijões você quer enviar",
          "es-ES": "Coloca la cantidad de Mini Frijoles que quieres pagar"
        },
        type: 10,
        required: true,
        min_value: 1
      }]
    },{
      name: "rank",
      name_localizations: {
        "es-ES": "rango"
      },
      description: "Check the current rank",
      description_localizations: {
        "pt-BR": "Veja o rank atual",
        "es-ES": "Muestra tu rango actual"
      },
      type: 1
    },{ 
      name: "work",
      name_localizations: {
        "pt-BR": "trabalhar",
        "es-ES": "trabajo"
      },
      description: "Do projects and earn Mini Beans",
      description_localizations: {
        "pt-BR": "Crie projetos e ganhe Mini Feijões",
        "es-ES": "Trabaja para conseguir mini frijoles"
      },
      type: 1
    },{
      name: "shop",
      
      description: "See the daily store",
      type: 1,
      name_localizations: {
        'pt-BR': "loja",
        "es-ES": "tienda"
      },
      description_localizations: {
        "pt-BR": "Veja a loja diária",
        "es-ES": "Mira la tienda diaria"
      }
    },{
      name: "guessnumber",
      
      description: "Guess the number from 1 to 10 that I'm thinking of and win a quantity of mini beans",
      type: 1,
      name_localizations: {
        "pt-BR": "adivinheonumero",
        "es-ES": "adivina-el-nombre"
      },
      description_localizations: {
        "pt-BR": "Adivinhe o número de 1 a 10 que estou pensando e ganhe uma quantidade de mini feijões",
        "es-ES": "Adivina el numero del 1-10 que estoy pensando y gana una cantidad de mini frijoles"
      },
      options: [{
        name: "number",
        description: "Enter a number from 1 to 10",
        type: 10,
        max_value: 10,
        required: true
      }]
    },{
      name: "bug",
      description: "Bug....",
      type: 1
    }],
  run: async function(client, interaction) {

    let subCmd = interaction.options.getSubcommand();

    if (subCmd === "bug"){

      let l = {
        "pt-BR": [
          "Iniciando bug....",
          `Bugando mini moedas de ${interaction.user}...\nStatus: 2%`,
          `Jogando Mini World por enquanto...\nStatus: 10%`,
          `Colocando ID de erro ${interaction.user.id}....\nStatus: 20%`, 
          `Assistindo "Homem araha sem volta pra casa"...\nStatus: 30%`,
        `Impedindo o bug de ser cancelado...\nStatus: 49%`,
        `Pensando sobre a vida...\nStatus: 60%`,
        `Não existe um espelho que nunca foi usado...\nStatus: 79%`,
        `Fugindo de ThallesKraft pra você bugar....\nStatus: 85%`,
        `Pensando como passar nas provas de matemática....\nStatus: 90%`,
        `Finalizando bug...\nStatus: 99%`],

        "es-ES": [
  "Iniciando error....",
  `Bugando mini monedas de ${interaction.user}...\nEstado: 2%`,
  `Jugando Mini World por el momento...\nEstado: 10%`,
  `Estableciendo ID de error ${interaction.user.id}....\nEstado: 20%`, 
  `Viendo "Spider-Man No Way Home"...\nEstado: 30%`,
  `Evitando que el error sea cancelado...\nEstado: 67%`,
  `Contemplando la vida...\nEstado: 78%`,
  `No hay espejo que nunca haya sido usado...\nEstado: 79%`,
          `Escapando de ThallesKraft para que puedas fallar....\nEstado: 85%`,
`Pensando cómo pasar los exámenes de matemáticas....\nEstado: 90%`,
  `Finalizando error...\nEstado: 99%`
],

        "en": [
  "Initiating bug....",
  `Bugging mini coins from ${interaction.user}...\nStatus: 2%`,
  `Playing Mini World for now...\nStatus: 10%`,
  `Setting error ID ${interaction.user.id}....\nStatus: 20%`, 
  `Watching "Spider-Man No Way Home"...\nStatus: 30%`,
  `Preventing bug from being canceled...\nStatus: 67%`,
  `Contemplating life...\nStatus: 78%`,
  `There's no mirror that has never been used...\nStatus: 79%`,
          `Escaping from ThallesKraft so you can bug....\nStatus: 85%`,
`Thinking about how to pass math exams....\nStatus: 90%`,
  `Finalizing bug...\nStatus: 99%`
]
        
        
      }

      let array = l[interaction.locale] ? l[interaction.locale] : l["en"];

     await interaction.editReply({
        content: `${array[0]}`
      })

      let i = 0;
      
        setTimeout(async() => {
          await interaction.editReply({
            content: `${array[1]}`
          })

          setTimeout(async() => {
          await interaction.editReply({
            content: `${array[2]}`
          })

            setTimeout(async() => {
          await interaction.editReply({
            content: `${array[3]}`
          })

              setTimeout(async() => {
          await interaction.editReply({
            content: `${array[4]}`
          })

                setTimeout(async() => {
          await interaction.editReply({
            content: `${array[5]}`
          })

                  setTimeout(async() => {
          await interaction.editReply({
            content: `${array[6]}`
          })

                    setTimeout(async() => {
          await interaction.editReply({
            content: `${array[7]}`
          })


                      setTimeout(async() => {
          await interaction.editReply({
            content: `${array[8]}`
          })

setTimeout(async() => {
          await interaction.editReply({
            content: `${array[9]}`
          })

setTimeout(async() => {
          await interaction.editReply({
            content: `${array[10]}`
          })


                          setTimeout(async() => {
          await interaction.editReply({
            content: `https://tenor.com/view/rickroll-roll-rick-never-gonna-give-you-up-never-gonna-gif-22954713`
          })
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
        }, 5000)
      
    }

    if (subCmd === "guessnumber"){
      let db = await userdb.findOne({ userID: interaction.user.id })

      if (!db){
        let newuser = new userdb({ userID: interaction.user.id })

        await newuser.save();

        db = await userdb.findOne({ userID: interaction.user.id })
      }

      let numeroAleatorio = Math.floor(Math.random() * 10) + 1;

      if (numeroAleatorio === interaction.options.getNumber("number")){

        let moedas = Math.floor(Math.random() * 100) + 1;

        db.economia.moedas += moedas;
        await db.save();

        await interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale].guessnumber : "You guessed the number and won a quantity of Mini beans!"}`
        })
      } else {

                await interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale].guessnumber_no : "You didn't guess the number!"}`
        })
      }

    }

    if (subCmd === "shop"){

      let embeds = [];
      let i = 0;
      for (let page = 0; page < shop.length; page++){

        

        if (shop[page].type === "banner"){

          embeds.push(new EmbedBuilder().setTitle(`${language[interaction.locale] ? language[interaction.locale].shop.banner : "Background image for Profile"}`).setImage(`${shop[page].url}`).setColor("Yellow"))
        
      }

        if (shop[page].type === "badge"){
          embeds.push(new EmbedBuilder().setTitle(`${language[interaction.locale] ? language[interaction.locale].shop.badge : "Badge"}`).setImage(`${shop[page].url}`).setColor("Blue"));
        }

        continue;

      }
      //console.clear()
      

      let button = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("⬅️")
        .setCustomId(`left_${interaction.user.id}_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
      .setEmoji("<:minifeijao:1180909398223245452>")
      .setLabel(`${shop[i].value}`)
      .setStyle(ButtonStyle.Success)
      .setCustomId(`buy_${interaction.user.id}_${interaction.id}`),
        new ButtonBuilder()
        .setLabel("➡️")
        .setCustomId(`next_${interaction.user.id}_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary),
      )

     let response = await interaction.editReply({
        embeds: [embeds[i]],
        components: [button]
      })
     // console.log(response)
      
      collector(async(message) => {
        if (message.isButton()){


          if (message.customId === `next_${message.user.id}_${interaction.id}`){

          

            await message.deferUpdate();

            i++;

            if (i === embeds.length) i = 0;

            await message.editReply({
              embeds: [embeds[i]],
              components: [new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("⬅️")
        .setCustomId(`left_${interaction.user.id}_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
      .setEmoji("<:minifeijao:1180909398223245452>")
      .setLabel(`${shop[i].value}`)
      .setStyle(ButtonStyle.Success)
      .setCustomId(`buy_${interaction.user.id}_${interaction.id}`),
        new ButtonBuilder()
        .setLabel("➡️")
        .setCustomId(`next_${interaction.user.id}_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary)
        )
        ]
            })
            
          } else if (message.customId === `left_${message.user.id}_${interaction.id}`){

            

            await message.deferUpdate();
            i--;
            if (i < 0) i = embeds.length;

            await message.editReply({
              embeds: [embeds[i]],
              components: [new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
        .setLabel("⬅️")
        .setCustomId(`left_${interaction.user.id}_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
      .setEmoji("<:minifeijao:1180909398223245452>")
      .setLabel(`${shop[i].value}`)
      .setStyle(ButtonStyle.Success)
      .setCustomId(`buy_${interaction.user.id}_${interaction.id}`),
        new ButtonBuilder()
        .setLabel("➡️")
        .setCustomId(`next_${interaction.user.id}_${interaction.id}`)
        .setStyle(ButtonStyle.Secondary)
        )
        ]
            })
          } else if (message.customId === `buy_${message.user.id}_${interaction.id}`){

            
            let item = shop[i];

            let db = await userdb.findOne({ userID: interaction.user.id })

      if (!db){
        let newuser = new userdb({ userID: interaction.user.id })

        await newuser.save();

        db = await userdb.findOne({ userID: interaction.user.id })
      }

            //console.log(1)

        if (db.economia.moedas >= item.value){

              if (item.type === "banner"){

//console.log(2)
                if (db.perfil.banners.some(img => img.data === item.data)){

//console.log(4)
                  return message.reply({
                    content: `${language[interaction.locale] ? language[interaction.locale].shop.banner_tem : "You already have this item!"}`,
                    ephemeral: true
                  })
                } else {
             db.economia.moedas -= item.value;

                db.perfil.banners.push(item);

            //  console.log(3)
                  await message.reply({
                    content: `${language[interaction.locale] ? language[interaction.locale].shop.banner_buy : "You purchased the Profile Background Image! Use </profile edit:12345> to equip the profile image!"}`,
                    ephemeral: true
                  })

                  await db.save();

                }
              }
            } else {

               await message.reply({
                  content: `You don't have Mini beans`,
                  ephemeral: true
               })
          
            }
          }
        }
      })
    }

    if (subCmd === "work"){

      let db = await userdb.findOne({ userID: interaction.user.id })

      if (!db){
        let newuser = new userdb({ userID: interaction.user.id })

        await newuser.save();

        db = await userdb.findOne({ userID: interaction.user.id })
      }

      let Array = language[interaction.locale] ? language[interaction.locale].work.msg : ["You created a map and earned Mini Beans!",
 "You made a Mini World video on Youtube and gained Mini Beans!",
 "You created a thumbnail and earned Mini Beans!",
 "You collaborated on a map with some players and earned Mini Beans!",
 "You earned Mini Beans at your map's store!"];

      
   Array = textoAleatorio(Array);

      let quantia = getRandomNumberBetween(100, 500)

            if(Date.now() < db.economia.work_time){
      const calc = db.economia.work_time - Date.now()
      let response = `You can only work again in: ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s ! `


          return await interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale]["work"].time.replace("(time)", `${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s`) : response}`,
          ephemeral: true
        })

            } else {


db.economia.work_time = Date.now() + tempo("1h");
db.economia.moedas += quantia;

              await db.save();
      await interaction.editReply({
            content: `${Array.replace("(beans)", quantia)}`
          })
        
      
            }
    }
    if (subCmd === "rank"){
      let db = await userdb.find({})

  db.sort((a,b) => (b.economia.moedas + b.economia.moedas) - (a.economia.moedas + a.economia.moedas))

      db = db.slice(0, 10);

      let embed = {
        title: `${language[interaction.locale] ? language[interaction.locale].rank.title : "Mini Beans Rank"}`,
        description: `${db.map((user, i) => `#${i+1} | **${`<@${user.userID}>` || `sumido#0000`}** (${user.economia.moedas})`).join("\n ")}`,
        color: 16776960
      };

      await interaction.editReply({
        embeds: [embed]
      })
    }
    if (subCmd === "pay"){

      let userId = interaction.options.getUser("member").id

      let quantidade = interaction.options.getNumber("quantity");

      let userIsAuthor = `You cannot send mini beans to yourself`

      if (interaction.locale == "pt-BR") userIsAuthor = `Você não pode enviar Mini Feijões para você mesmo!`

      if (userId === interaction.user.id) return await interaction.editReply({
          content: `${userIsAuthor}`,
          ephemeral: true
        })
      
        


      let db_1 = await userdb.findOne({
        userID: interaction.user.id
      })

      if (!db_1){
        let newuser = new userdb({ userID: interaction.user.id })

        newuser.save()

        db_1 = await userdb.findOne({ userID: interaction.user.id
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

      if (quantidade > money_1 || quantidade < 0 || quantidade === 0){

        let responseIf = `You don't have that many Mini Beans!`

        

        return await interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale]["pay"].beans : responseIf}`,
          flags: 64
        })
    
      } else {

        db_1.economia.moedas = db_1.economia.moedas - quantidade;
        db_1.save()

        db_2.economia.moedas = db_2.economia.moedas + quantidade;
        db_2.save()

        let response = `You sent ${quantidade} Mini Beans to <@${userId}>`

        

        await interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale]["pay"].response.replace("(beans)", quantidade).replace("(user)", `<@${userId}>`) : response}`
        })
      
        
      }
    }

      if (subCmd === "atm"){

        let userId = interaction.options.getUser("member") || interaction.user

        let db = await userdb.findOne({
          userID: userId.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: userId.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: userId.id
        })
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
    //console.log(db.userID)
            let userPosition = rankedUsers.findIndex(user => user.userID === db.userID) + 1;

            if (db.economia.moedas === 0) {
           userPosition = rankedUsers.length + 1;
            }

        let data = {
            response_author: `${language[interaction.locale] ? language[interaction.locale]["atm"].response_author.replace("(beans)", db.economia.moedas).replace("(user)", `${userId}`).replace("(userPosition)", userPosition):`<:minifeijao:1180909398223245452> | You have **\`${db.economia.moedas}\`** mini beans and are in position **#${userPosition}** on the leaderboard!`}`,
            response_mention: `${language[interaction.locale] ? language[interaction.locale]["atm"].response_mention.replace("(beans)", db.economia.moedas).replace("(user)", `${userId}`).replace("(userPosition)", userPosition) : `<:minifeijao:1180909398223245452> | ${userId} has **\`${db.economia.moedas}\`** mini beans and is in position **#${userPosition}** on the leaderboard!`}`
          };

        

        

let mention;

        if (userId === interaction.user.id){
          mention = false
        } else {
          mention = true
        }

        
        await interaction.editReply({
          content: `${mention ? `${data.response_mention}` : `${data.response_author}` }`
        })
      
        
      }

    if (subCmd === "daily"){

      let money = getRandomNumberBetween(1000, 10000);
      // Math.floor(Math.random() * (2000 - 500 + 1)) + 500;

      let db = await userdb.findOne({ userID: interaction.user.id })

      if (!db){
        let newuser = new userdb({ userID: interaction.user.id })

        await newuser.save();

        db = await userdb.findOne({ userID: interaction.user.id })
      }

      if(Date.now() < db.economia.daily_time){
      const calc = db.economia.daily_time - Date.now()
      let response = `You can only claim your daily again in ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s ! `
        
        


          await interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale]["daily"].time.replace("(time)", `${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s`) : response}`,
          ephemeral: true
        })
      
        
        
      } else {
      
       let response = `Today you received <:minifeijao:1180909398223245452> ${money} mini beans!!!`

      await userdb.updateOne({
        userID: interaction.member.user.id
      }, { $set: {
        "economia.moedas": db.economia.moedas + money,
        "economia.daily_time": Date.now() + tempo("24h")
      }})

         await interaction.editReply({
          content: `${language[interaction.locale] ? language[interaction.locale]["daily"].response.replace("(beans)", money) : response}`
        })
      
        

      }
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

function textoAleatorio(array) {
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
}
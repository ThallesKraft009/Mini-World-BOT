const fs = require("fs");
const { userdb } = require("../../mongodb/user.js")
const CALLBACK = require("../../settings/callback.js");
const DiscordRequest = require("../../settings/request.js");
const components = [];
fs.readdirSync(`./interactions/components/`).forEach(dir => {
    const files = fs.readdirSync(`./interactions/components/${dir}/`).filter(file => file.endsWith('.js'));

    files.forEach((file) => {
        let i = require(`../../interactions/components/${dir}/${file}`)

        if (i) {
            components.push(i);
        }
    })
})

const modals = [];
fs.readdirSync(`./interactions/modals/`).forEach(dir => {
    const files = fs.readdirSync(`./interactions/modals/${dir}/`).filter(file => file.endsWith('.js'));

    files.forEach((file) => {
        let modal = require(`../../interactions/modals/${dir}/${file}`)

        if (modal) {
            modals.push(modal);
        }
    })
})


const Interaction = async (data, commands) => {

  //console.log(data.d.type)

    if (data.d.type === 3) {

        let id = data.d.data.custom_id;

        let component = components.find(i => id.startsWith(i.customId));

       component.run(data.d, id)

    } else if (data.d.type === 5){
      let id = data.d.data.custom_id;

      let modal = modals.find(i => id.startsWith(i.customId));

      modal.run(data.d, id)
    } else if (data.d.type === 2){

  //    console.log(data.d)

      
let cmd = commands[data.d.data.name];
let command = []
let options = []

try {
    cmd.run(data.d);
} catch (err) {
    console.log(err);
}

    command.push(data.d.data.name)

if(data.d.data.options[0]) {

  if (data.d.data.options[0].type === 1 || data.d.data.options[0].type === 2){
 command.push(data.d.data.options[0].name);
  

  if (data.d.data.options[0].options[0]){

    if (data.d.data.options[0].options[0] === 1){
    command.push(data.d.data.options[0].options[0].name)

      if (data.d.data.options[0].options[0].options){
    data.d.data.options[0].options[0].options.map(x => {

      options.push({
        name: x.name,
        value: x.value,
        type: x.type
      })
    
    })
      }
      
    }

    
  }
    
  }

  //console.log(data.d.data.options[0].options)
  if (data.d.data.options[0].options){
    data.d.data.options[0].options.map(x => {

      options.push({
        name: x.name,
        value: x.value,
        type: x.type
      })
    
    })
  }
}

      

    //  console.log(command, options)

      let optionsResultado = [{
        name: "Lista de Opções",
        value: "Todas as opções do comando disponível."
      }]
      options.map(o => {
        let type = {
          "3": "Texto",
          "6": "Usuário",
          "10": "Número",
          "11": "Imagem"
        };

   //     console.log(o.type)
        
        optionsResultado.push({
          name: `Opcão de ${type[`${o.type}`]}`,
          value: `Nome da opção: \`${o.name}\`\nValor da opção: \`${o.value}\``
        })
      })


await DiscordRequest(
  CALLBACK.guild.userGet(
    data.d.guild_id, 
    data.d.member.user.id
    ), {
      method: "GET"
  }).then(async(x) => {
  let userData = await x.json();

        let url = `https://cdn.discordapp.com/avatars/${data.d.member.user.id}/${userData.user.avatar}.png?size=2048`;

      let embed = {
        title: "Logs de Comandos",
        description: `**Comando utilizado:** </${command.join(" ")}:12345>`,
        fields: optionsResultado,
        author: {
          name: `${userData.user.bot ? `${userData.user.username}` : `${userData.user.global_name}`}`,
          iconURL: `${url}`
        },
        color: 255
      }

    await DiscordRequest(CALLBACK.message.response("1180840099789934682"), { 
      method: 'POST',
      body: {
        embeds: [embed],
        content: "ID do usuário: " + data.d.member.user.id
      }
    });

})

      
      
    } else if (data.d.type === 4){

 // console.log(data.d)

       // let interaction = data.d;
        

        let db = await userdb.findOne({
          userID: data.d.member.user.id
        })

        if (!db) {
          let newUser = new userdb({
            userID: data.d.member.user.id
          })

          await newUser.save();

          db = await userdb.findOne({
          userID: data.d.member.user.id
        })
        }

        let dataI = [];
        let i = 1;
       // console.log(db)

        db.perfil.mapas.map(map => {
          dataI.push({
            name: `${map.name}`,
            value: `${map.name}`
          })

          i++
        })

      if (!db.perfil.mapas || db.perfil.mapas.length === 0) dataI = [{
        name: "Nenhum mapa encontrado",
        value: "semMapa"
      }]

        //console.log(dataI)
        await DiscordRequest(
        CALLBACK.interaction.response(
          data.d.id, data.d.token
        ), { 
      method: 'POST',
      body: {
        type: 8,
        data: {
        choices: dataI
        }
      }
        })
      }
    
}

module.exports = { Interaction };
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

      try {
        cmd.run(data.d);
      } catch (err) {
        console.log(err)
      }
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
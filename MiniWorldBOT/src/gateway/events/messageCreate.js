const client = require("../MiniWorldBOT.js");
const {userdb} = require("../mongodb/user.js")
const ms = require("ms")
client.on("messageCreate", async(message) => {
  let db = await userdb.findOne({
    userID: message.author.id
  })

  if (!db){
    let newuser = new userdb({
      userID: message.author.id
    })

    await newuser.save();

    db = await userdb.findOne({
    userID: message.author.id
  })
  }

  

  if(Date.now() < db.premium){
    db.economia.moedas += 1;
    //console.log(true)
    await db.save();
  }

  if (!message.content.startsWith("mw!") || message.author.bot) return;
  let prefixoPadrao = "mw!"

  const args = message.content.slice(prefixoPadrao.length).split(/ +/);
  const comando = args.shift().toLowerCase();

  if (comando === "premium"){
    let userId = args[0];
    let time = args[1];
    time = ms(`${time}`);

    db = await userdb.findOne({
    userID: userId
  })

  if (!db){
    let newuser = new userdb({
      userID: userId
    })

    await newuser.save();

    db = await userdb.findOne({
    userID: userId
  })
  }

    db.premium = Date.now() + time;

    if (message.author.id !== "890320875142930462") return;
    
    await db.save();

    message.react("✅")
  }
})
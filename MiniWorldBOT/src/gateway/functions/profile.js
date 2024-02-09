const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');

registerFont('MiniWorldBOT/src/fonts/oswald.ttf', {
  family: 'Oswald'
})

const { AttachmentBuilder } = require("discord.js");


async function ProfileImage(userAvatar, uid, userName, minibeans, sobremim_, sobremimIdioma, interaction, banner, isAuthor){
let data = {
  userAvatar: userAvatar.replace("webp", "png"),
  uid: uid,
  userName: userName,
  minifeijoes: minibeans,
  sobremim: sobremim_,

  lingua: {
    sobremim: sobremimIdioma
  }
}
  

let sobremim = adicionarQuebrasDeLinha(data.sobremim, 60)

const canvas = createCanvas(1280, 720);
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

loadImage(`MiniWorldBOT/src/img/${banner}`).then((background) => {
  
  context.drawImage(background, 0, 0, width, height);

  loadImage(data.userAvatar).then(async(avatar) => {

    const avatarX = 70;
    const avatarY = 145;

    const avatarSize = 280;

    context.save();
    context.beginPath();
    context.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, 2 * Math.PI);
    context.closePath();
    context.clip();
    
    context.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
    
    context.restore(); 

    context.font = '80px Oswald'; 
    context.fillStyle = 'white'; 
    context.fillText(data.userName, 370, 440);

    context.font = '50px Oswald'; 
    context.fillStyle = 'white'; 
    context.fillText(data.minifeijoes, 145, 560);

    context.font = '50px Oswald'; 
    context.fillStyle = 'white'; 
    context.fillText(data.lingua.sobremim, 10, 650);

    context.font = '40px Oswald'; 
    context.fillStyle = 'white'; 
    context.fillText(sobremim, 10, 700);
    
    
    context.font = '60px Oswald'; 
    context.fillStyle = 'white'; 
    context.fillText(data.uid, 930, 120);

    
 let file = new AttachmentBuilder(await canvas.toBuffer(), { name: 'profile-image.png' });

    

await interaction.editReply({
  files: [file]
})

  
});
})

// Função para adicionar quebras de linha a cada 60 palavras
function adicionarQuebrasDeLinha(texto, palavrasPorLinha) {
  const palavras = texto.split(/\s+/); // Divide o texto em palavras
  let resultado = '';

  for (let i = 0; i < palavras.length; i++) {
    resultado += palavras[i] + ' ';

    // Adiciona uma quebra de linha a cada 60 palavras
    if ((i + 1) % palavrasPorLinha === 0 && i !== 0) {
      resultado += '\n';
    }
  }

  return resultado;

  
}
}

module.exports = { ProfileImage }
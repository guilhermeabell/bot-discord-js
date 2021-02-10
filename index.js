const { Client } = require('discord.js');
const { config } = require('dotenv');
//  Bot discord;
const bot = new Client({ disableEveryone: true });

config({
  path: __dirname + "/.env" //TOKEN
})

bot.on('ready', () => {
  // console.log('Hello World'); 
  console.log(
    `o ${bot.user.username} foi iniciado com sucesso!
    Com ${bot.users.size} usuários,
    ${bot.channels.size} canais e 
    '${bot.guilds.size} servidores`);


  bot.user.setPresence({
    status: "online",
    game: { name: "Hello World", type: "PLAYING" }
  });
})

bot.login(process.env.TOKEN);

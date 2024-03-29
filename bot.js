//  Discord Bot Config
const { Client, RichEmbed } = require('discord.js');
const { config } = require('dotenv');

const bot = new Client({ disableEveryone: true });

config({
  path: __dirname + "/.env" //TOKEN/ bot.js
})

bot.on('ready', () => {
  console.log(`O ${bot.user.username} foi iniciado com sucesso! Com ${bot.users.cache.size} usuários, ${bot.channels.size} canais e ${bot.guilds.size} servidores.`);
  let status = [
    { name: `Hello World!`, type: 'PLAYING' },
    { name: `Subscribe for channel!`, type: 'WATCHING' },
    { name: `${bot.users.cache.size} pessoas!`, type: 'LISTENING' },
    { name: `Bot development.`, type: 'STREAMING', url: 'https://twitch.tv/SuaTwitch' }
  ]
  function setStatus() { // Function para mudar status do bot aleatoriamente;
    let randomStatus = status[Math.floor(Math.random() * status.length)]
    bot.user.setPresence({ activity: randomStatus }) // game: randomStatus offline;
  }
  setStatus();
  setInterval(() => setStatus(), 5000)
})

bot.on('message', async message => {
  let prefix = "!";

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();

  // Ping Command;
  if (cmd == "ping") {
    let embed1 = new RichEmbed()
      .setTimestamp()
      .setTitle(`Ping?`)
      .setColor('#ee3434')
      .setFooter(`Ping`, bot.user.displayAvatarURL);
    let msg = await message.channel.send(embed1);

    let embed2 = new RichEmbed()
      .setTimestamp()
      .setTitle(`Pong!`)
      .setColor('#ee3434')
      .setDescription(`A Latência é ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms.\nA Latência da API é ${Math.round(bot.ping)}ms.`)
      .setFooter(`Ping`, bot.user.displayAvatarURL);
    msg.edit(embed2);
  }

  //Comando Say
  if (cmd == "say") {
    if (message.deletable) message.delete();

    if (args.length < 0) return message.reply(`Não tem nada para falar?`).then(m => m.delete(5000));

    let roleColor = message.guild.me.displayHexColor;

    if (args[0].toLowerCase() === "embed") {
      let embed = new RichEmbed()
        .setTimestamp()
        .setTitle(`${message.author.username}`)
        .setDescription(args.slice(1).join(" "))
        .setColor(roleColor === "#000000" ? "#ffffff" : roleColor)

      message.channel.send(embed);
    } else {
      message.channel.send(args.join(" "));
    }
  }
});

bot.login(process.env.TOKEN);
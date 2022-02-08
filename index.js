const keepAlive = require("./server.js")
const api = require("imageapi.js");
const Discord = require('discord.js'),
client = new Discord.Client(),
config = {
  //prefix
  prefix: "m",
  //token
  token: process.env.TOKEN 
};
const fsLibrary  = require('fs') 
const list = [1, 2, 3, 4, 5]
function getRandomColor() {
  var color = '#' + Number(Math.floor(Math.random() * 16777215)).toString(16)
  console.log(color)
  return color;
}
//random number
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
keepAlive()
client.once('ready', () => {
  
  console.log(`Logged in as ${client.user.tag}!`);
  //Tell the bot is ready
	console.log('Ready!');
  //How many servers is the bot in
  console.log('In ' + client.guilds.cache.size + ' servers')
  
  //new embed
  const restartlog = new Discord.MessageEmbed()
    restartlog.setTitle('Moder bot has been restarted')
    restartlog.setColor('#ffff00')
    restartlog.setTimestamp()
  client.channels.cache.get('838264759899652137').send(restartlog)
  //Set status and activity
  client.user.setPresence({
   status: "online"
  });
  //shows how many servers and uses he bot has the uses is not spot on to true amount
	client.user.setActivity('"m! help"', { type: 'STREAMING', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' });
  //shows stats on my bot on my server
});

client.on('message', async (message) => {
  
  used = false
  if ((message.channel.type) === 'dm') {
   
    
    if ((message.content.toLowerCase()) == 'help') {
      const Help = new Discord.MessageEmbed()
      Help.setTitle('(For help in using Moder use "m! help")')
      message.reply(Help);
      var used = true
    }
  }
  if ((message.content) == 'can i kick?'){
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      const kick = new Discord.MessageEmbed()
      kick.setColor('red')
      kick.setDescription('you can\'t kick people lol!!!')
	    message.channel.send(kick)
    } else {
      const kick = new Discord.MessageEmbed()
      kick.setColor('green')
      kick.setDescription('u can kick people on this server. Why don\'t you try it on some mean people.')
	    message.channel.send(kick)
    }
  }

  if ((message.content) == '!help') {
    
    const Help = new Discord.MessageEmbed()
    Help.setTitle('(For help in using Moder use "m! help")')
    message.reply(Help);
    var used = true
  }
  
  if (!message.content.toLowerCase().startsWith("m!")) return
  //Makes times used not change every message
  used = false
  //Bot doesn't trigger it's self and other bots don't also
  if (message.author.bot) {
    return
  }
  if (message.content.slice(1).toLowerCase().includes("!mute")) {
    if(!message.guild.roles.cache.find(r => r.name === "Muted")) {
      const nomuterole = new Discord.MessageEmbed()
      nomuterole.setTitle('No Mute Role')
      nomuterole.setDescription('Pls make a role called "Muted" over the roles that can be muted and in channel permissions make the channels you dont want the muted person to talk in muted role not allowed to use permisions of talking')
      message.channel.send(nomuterole)
    }
    if(message.member.roles.cache.some(r => r.name === "Mod")){
      if (message.mentions.members.first()) {
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        let member = message.mentions.members.first();
        member.roles.add(role)
        message.channel.send(member + ' was Muted. LOL. The reason is: '+ message.content.slice(7))
      } else {
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        let userID = message.content.slice(12).split(' ?')[0]
        message.guild.members.cache.get(userID).roles.add(role)
        message.channel.send(userID + ' was Muted. LOL. The reason is: '+ message.content.slice(7))
      }
    } else {
      message.channel.send(`Nope, noppers, nadda.`);
    }
  }
  if (message.content.slice(1).toLowerCase().includes("!ban")) {
    if (message.member.roles.cache.some(r => r.name === "Mod")){
      if (message.mentions.members.first()) {
        let member = message.mentions.members.first();
        message.mentions.members.first().ban();
        console.log(message.mentions.members.first())
        message.channel.send(member + ' was banned. LOL. The reason is: '+ message.content.slice(7))
      }
    } else {
      message.channel.send(`Nope, noppers, nadda.`);
    }
  } 
  if (message.content.slice(1).toLowerCase().includes("!unban")) {
    if (message.member.roles.cache.some(r => r.name === "Mod")){
      if (message.mentions.members.first()) {
        let member = message.mentions.members.first();
        message.guild.members.unban(member);
        message.channel.send(member + ' was unbanned. LOL. The reason is: '+ message.content.slice(7))
      }
    } else {
      message.channel.send(`Nope, noppers, nadda.`);
    }
  } 
  if (message.content.slice(2).toLowerCase().includes("unmute")) {
    if(message.member.roles.cache.some(r => r.name === "Mod")){
      if (message.mentions.members.first()) {
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        let member = message.mentions.members.first();
        member.roles.remove(role)
        message.channel.send(member + ' was UnMuted. So sad. The reason is: '+ message.content.slice(8))
      } else {
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        let userID = message.content.slice(14).split(' ?')[0]
        message.guild.members.cache.get(userID).roles.remove(role)
        message.channel.send(member + ' was UnMuted. So sad. The reason is: '+ message.content.slice(8))
      }
    } else {
      message.channel.send(`Sry bud you don't have the "Mod" role. You can't do that.`);
    }
  }
  //Help
  if ((message.content.slice(2).toLowerCase()) == 'help') {
    
    message.delete()
    const help = new Discord.MessageEmbed()
    //send list of things bot can do
    help.setTitle('Help List:')
    help.setColor('#5cf000')
    help.setDescription('m!mute \'@ user\' = Mute that user \n m!unmute \'@ user\' = Unmute that user \n(only people with the \'Mod\' role can use moder commands)\n m!ban \'@ user\' to ban a user')
    message.channel.send(help)
    //set used to true so it adds one more to true
    var used = true
  }
  if (message.content.slice(2).toLowerCase().includes("reply")) {
    //reply k
    message.reply('Hello...')
    var used = true
  }
  if ((message.content.slice(2).toLowerCase()) == 'nsfw') {
    //This is the wrong bot bro
    message.reply('I\'m not a NSFW bot!!!! I\'m a mod bot' );
    var used = true
  }
  //suggest command
  if (message.content.slice(2).startsWith('suggestion ')) {
    const suggest = new Discord.MessageEmbed()
    suggest.setTitle('Suggestion made by: ' + message.author.username)
    suggest.setColor('#5cf000')
    suggest.setDescription(message.content.slice(17))
    suggest.setTimestamp()
    var used = true
    //send to bot suggestions channel
    client.channels.cache.get('846452836615061564').send(suggest)
  }
  //button test
  
  if (used = true) {
    //add used
    var usedtimes = 0
    usedtimes = Number(fsLibrary.readFileSync('times_used.int','utf8'))
    console.log(usedtimes)
    usedtimes +=1
    fsLibrary.writeFileSync('times_used.int',usedtimes)
  };
  if ((message.content.slice(2)) == 'hmthybu'){
    var used = true
    const timesused = new Discord.MessageEmbed()
    timesused.setDescription('I have been used ' + fsLibrary.readFileSync('times_used.int','utf8') + ' times')
    message.reply(timesused)
  }
});
client.login(process.env.TOKEN)
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
  client.channels.cache.get('862152384238845982').send(restartlog)
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
	    message.channel.send('you can\'t kick people lol!!!')
    } else {
      message.channel.send('u can')
    }
  }
  if (message.content.startsWith('user')) {
    let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
    message.channel.send(rMember)
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
  if (message.content.slice(2).toLowerCase().includes("mute")) {
    if(message.member.roles.cache.some(r => r.name === "Mod")){
      if (message.mentions.members.first()) {
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        let member = message.mentions.members.first();
        member.roles.add(role)
        message.channel.send(member +  'was Muted. LOL')
      } else {
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        let userID = message.content.slice(12).split(' ?')[0]
        message.guild.members.cache.get(userID).roles.add(role)
        message.channel.send(userID + ' was Muted. LOL')
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
        message.channel.send(member + ' was UnMuted. )-:')
      } else {
        let role = message.guild.roles.cache.find(r => r.name === "Muted");
        let userID = message.content.slice(14).split(' ?')[0]
        message.guild.members.cache.get(userID).roles.remove(role)
        message.channel.send(userID + ' was UnMuted. )-:')
      }
    } else {
      message.channel.send(`Nope, noppers, nadda.`);
    }
  }
  //Help
  if ((message.content.slice(2).toLowerCase()) == 'help') {
    
    message.delete()
    const help = new Discord.MessageEmbed()
    //send list of things bot can do
    help.setTitle('Help List:')
    help.setColor('#5cf000')
    help.setDescription('m!mute \'@ user or user ID\' = Mute that user \n m!unmute \'@ user or user ID\' = Unmute that user \n(only people with the \'Mod\' role can use moder commands)')
    message.channel.send(help)
    //set used to true so it adds one more to true
    var used = true
  }
  if (message.content.slice(2).toLowerCase().includes("reply")) {
    //reply k
    message.reply('Hello...')
    var used = true
  }
  if ((message.content.slice(2).toLowerCase()) == 'NSFW') {
    //This is the wrong bot bro
    message.reply('I\'m not a NSFW bot!!!! I\'m a mod bot' );
    var used = true
  }
  //suggest command
  if (message.content.slice(2).startsWith('suggestion')) {
    const suggest = new Discord.MessageEmbed()
    suggest.setTitle('Suggestion made by: ' + message.author.username)
    suggest.setColor('#5cf000')
    suggest.setDescription(message.content.slice(17))
    suggest.setTimestamp()
    var used = true
    //send to bot suggestions channel
    client.channels.cache.get('862150641065656360').send(suggest)
  }
  //button test
  
  if (used) {
    //add used
    var usedtimes = 0
    usedtimes = Number(fsLibrary.readFileSync('times_used.int','utf8'))
    console.log(usedtimes)
    usedtimes +=1
    fsLibrary.writeFileSync('times_used.int',usedtimes)
    
  };
  if ((message.content.slice(2)) == 'how many times have you been used?'){
    var used = true
    const timesused = new Discord.MessageEmbed()
    timesused.setDescription('I have been used ' + fsLibrary.readFileSync('times_used.int','utf8') + ' times')
    message.reply(timesused)
  }
});



client.login(process.env.TOKEN)
const db = require('quick.db')
const chalk = require('chalk')

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.get('*', (req, res) => {
  res.send('404 page not found!')
});

app.listen(3001, () => {
  console.log('server started');
});

const Discord = require('discord.js')
const client = new Discord.Client({ intents: 32767, ws: { properties: { $browser: "Discord iOS" }}})

client.on('ready', async () => {
  console.log(chalk.green('Online!'))
  client.user.setPresence({ activities: 
      [{ 
          name: `CodeMark on Youtube` , 
          type: 'WATCHING'
      }],
      status: "online"
    })
})
const config = require('./config.js')
const prefix = config.prefix

//Main
client.on("messageCreate", async message => {
  if(message.author.bot) return;
  if (!message.guild) return;
  if(message.channel.id === "961683567379894295") {
  if(message.content) {
    message.channel.send(`**${message.author.username} Said:** ${message.content}`)
    message.delete()
  }
  }else{
    return;
  }
})


client.on("messageCreate", async message => {
  if(message.author.bot) return;
  //close command
  if(message.content.toLowerCase() === prefix + "close") {
    if(message.author.id === "563911178678435865") {
      if(isNaN(message.channel.name)) return message.channel.send('This is not a dm')
      db.delete(message.channel.name + '_dm')
      message.channel.delete()
    }else{
      return message.channel.send('You cannot use this command!')
    }
  }
  if(message.channel.id === "964599468349612104") {
    if(!message.content.startsWith(".")) {
      return message.delete()
    }
  }else{
    return;
  }

  if(message.content.toLowerCase() === prefix + "pm"||message.content.toLowerCase() === prefix + "dm") {
    let test = await db.get(message.author.id + '_dm')
    if(test === null) {
    let channel1 = await message.guild.channels.create(message.author.id, {
        type: "text",
        parent: "961684287218921513",
        topic: `Dm with ${message.author.id}`
      })
 channel1.permissionOverwrites.create(message.author.id, {
 VIEW_CHANNEL: true,
 SEND_MESSAGES: true,
 READ_MESSAGE_HISTORY: true
 });
 channel1.permissionOverwrites.create("961678737215209482", {
 VIEW_CHANNEL: false
 })
     await db.set(message.author.id + '_dm', true)
    let announce = channel1.send(`<@563911178678435865>, <@${message.author.id}> just opened a dm`)
    message.channel.send(`${message.author}, your direct message is ready in <#${channel1.id}>`)
  }else {
      return message.channel.send('You already have dm open')
  }
  }
})

client.login(process.env.token)
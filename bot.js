const Discord = require('discord.js');
const client = new Discord.Client();

var request = require('request');

let prefix = '^-apex '

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: 'Message', type: 0 } });
});

client.on('message', message => {
    if (message.content.startsWith(prefix + 'help')) {
        message.author.send("test help message");
    }
});

client.login(process.env.BOT_TOKEN);

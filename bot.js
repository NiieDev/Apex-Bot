const Discord = require('discord.js');
const client = new Discord.Client();

var request = require('request');

let prefix = '^-'

client.on('ready', () => {
    console.log('I am ready!');
    client.user.setPresence({ game: { name: '^-help', type: 0 } });
});

client.on('message', message => {
    if (message.content.startsWith(prefix + 'help')) {
        message.channel.send("```\nコマンド:\n^-apex <User> (PCユーザー)```");
    }
    else if (message.content.startsWith(prefix + 'apex')) {
        let user = message.content.split(" ").slice(1);
        var options = {
            url: 'https://public-api.tracker.gg/apex/v1/standard/profile/5/' + user,
            headers: {
                'TRN-Api-Key': '0379bb22-bba4-4f6a-873d-1cdf05b0a847'
            }
        };
        request.get(options, function(error, response, body) {
            const jsonobj = JSON.parse(body);
            console.log("Body: " + jsonobj.data.id);
        });
    }
});

client.login(process.env.BOT_TOKEN);

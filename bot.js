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
            if(jsonobj.hasOwnProperty('data')){
                if(jsonobj.data.hasOwnProperty('children')){
                    if(jsonobj.data.children.length > 0){
                        if(jsonobj.data.children[0].hasOwnProperty('metadata') && jsonobj.data.children[0].hasOwnProperty('stats')){
                            if(jsonobj.data.children[0].metadata.hasOwnProperty('legend_name')){
                                let s1 = "存在しません";
                                let s1_v = "存在しません";
                                let s2 = "存在しません";
                                let s2_v = "存在しません";
                                let s3 = "存在しません";
                                let s3_v = "存在しません";
                                if(jsonobj.data.children[0].stats.length > 0){
                                    if(jsonobj.data.children[0].stats.length >= 3){
                                        s1 = jsonobj.data.children[0].stats[0].metadata.name
                                        s1_v = jsonobj.data.children[0].stats[0].value
                                        s2 = jsonobj.data.children[0].stats[1].metadata.name
                                        s2_v = jsonobj.data.children[0].stats[1].value
                                        s3 = jsonobj.data.children[0].stats[2].metadata.name
                                        s3_v = jsonobj.data.children[0].stats[2].value
                                    }else if(jsonobj.data.children[0].stats.length >= 2){
                                        s1 = jsonobj.data.children[0].stats[0].metadata.name
                                        s1_v = jsonobj.data.children[0].stats[0].value
                                        s2 = jsonobj.data.children[0].stats[1].metadata.name
                                        s2_v = jsonobj.data.children[0].stats[1].value
                                    }else{
                                        s1 = jsonobj.data.children[0].stats[0].metadata.name
                                        s1_v = jsonobj.data.children[0].stats[0].value
                                    }
                                }
                                message.channel.send(
                                  {embed: {
                                    title: user + "のステータス",
                                    url: "https://apex.tracker.gg/profile/pc/" + user,
                                    description: "キャラクター: " + jsonobj.data.children[0].metadata.legend_name,
                                    color: 7506394,
                                    timestamp: new Date(),
                                    footer: {
                                      icon_url: client.user.avatarURL,
                                      text: "API: https://apex.tracker.gg/"
                                    },
                                    thumbnail: {
                                      url: jsonobj.data.children[0].metadata.icon
                                    },
                                    image: {
                                    url: jsonobj.data.children[0].metadata.bgimage
                                    },
                                    fields: [
                                      {
                                        name: s1,
                                        value: "数値: " + s1_v
                                      },
                                      {
                                        name: s2,
                                        value: "数値: " + s2_v
                                      },
                                      {
                                        name: s3,
                                        value: "数値: " + s3_v
                                      }
                                    ]
                                  }}
                                );
                                return;
                            }
                        }
                    }
                }
            }
            if(jsonobj.hasOwnProperty('errors')){
                if(jsonobj.errors.length > 0){
                    if(jsonobj.errors[0].hasOwnProperty('message')){
                        message.channel.send("```\nエラーが発生しました: " + jsonobj.errors[0].message + "```");
                        return;
                    }
                }
            }
            message.channel.send("```\nそのプレイヤーが存在しない、もしくはエラーが発生しました。```");
        });
    }
});

client.login(process.env.BOT_TOKEN);

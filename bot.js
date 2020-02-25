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
                message.channel.send(
                  {embed: {
                    title: "タイトル",
                    url: "https://discordapp.com", // titleプロパティのテキストに紐付けられるURL
                    description: "This is description. [URLを埋め込むことも出来る](https://discordapp.com)\n" +
                                 "***embedの中でもMarkDownを利用できます***",
                    color: 7506394,
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "©️ example | footer text"
                    },
                    thumbnail: {
                      url: "https://trackercdn.com/cdn/apex.tracker.gg/legends/pathfinder-tile.png"
                    },
                    image: {
                    url: "https://trackercdn.com/cdn/apex.tracker.gg/legends/pathfinder-concept-bg-small.jpg"
                    },
                    fields: [
                      {
                        name: "field :one:",
                        value: "*ここはfield 1の内容だよ*"
                      },
                      {
                        name: "field :two:",
                        value: "~~ここはfield 2の内容だよ~~"
                      },
                      {
                        name: "field :three:",
                        value: "__ここはfield 3の内容だよ__"
                      },
                      {
                        name: "inline field :cat:",
                        value: "`これはinlineのfieldだよ`",
                        inline: true
                      },
                      {
                        name: "inline field :dog:",
                        value: "[これもinlineのfieldだよ](https://discordapp.com)",
                        inline: true
                      }
                    ]
                  }}
                );
                const array = JSON.stringify(jsonobj.data.children);
                console.log("Body: " + array);
            }else{
                console.log("error: not exists");
            }
        });
    }
});

client.login(process.env.BOT_TOKEN);

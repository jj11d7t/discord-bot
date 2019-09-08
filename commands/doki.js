// require the discord.js module
const Discord = require('discord.js');
// gets the bot's prefix
const {prefix} = require('../config.json');
// gets node's XML request
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

module.exports = {
     name: 'doki',
     description: "Sends a random doki fanart.",
     cooldown: 3,
     usage: `\`${prefix}doki\``,
     execute(message, args) {
          var data = null;
          var url = "https://api.imgur.com/3/album/ilHTg";

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;

          xhr.addEventListener("readystatechange", function () {
               if (this.readyState === 4) {
                    var arr = JSON.parse(this.responseText).data;
                    var rand = Math.floor(Math.random() * arr.images_count);
                    var img = arr.images[rand];
                    message.channel.send(new Discord.RichEmbed()
                         .setImage(img.link)
                         .addField("Title", img.title, true)
                         .addField("Views", img.views, true)
                         .setDescription(img.description)
                    );
               }
          });

          xhr.open("GET", url);
          xhr.setRequestHeader("Authorization", "Client-ID 723620f0c4b829e");

          xhr.send(data);
     }
}

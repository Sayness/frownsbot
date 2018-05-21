const Discord = require('discord.js')
const bot = new Discord.Client()
var fs = require("fs")
var prefix = (".") //Prefix
bot.on('message', function(message) {      //Détection de message
    
    if (message.author.equals(bot.user)) return
    if (message.guild === null) return
    if (!message.content.startsWith(prefix)) return
    var args = message.content.substring(prefix.length).split(" ")
    
    switch (args[0].toLowerCase()) { //Ont regarde tout les message començant par le préfix
        case "help": //Première commande
            message.delete() //Pour supprimer le message de l'envoyant
            var embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setDescription("`.pin for create a pin `")
                .setFooter("Frown LLC, 2018")
            message.channel.sendEmbed(embed)
        break;
        case "new-pin": //Commande
            message.delete()
            if(message.content === prefix + "new-pin") {message.reply("Merci de mettre un code valide"); return;}
            fs.readFile("code.txt", function(err, data){
                fs.writeFile("code.txt", data + "|" + args.slice(1).join(" "))
            })
            message.reply("Vous have been added a pin !") //Réponds au message
        break;
        case "pin":
            message.delete()
            var text = fs.readFileSync("code.txt", "utf8");
            var words = text.split('|')
            words = words.map(function (word) { return word.trim() });
            words = words.filter(function (word) { return word.length > 0 })
            var render = words[Math.floor(Math.random() * words.length)]
            console.log(render)
            if (render === undefined) {
                fs.writeFile("code.txt", "")
                message.reply("Not pin !")
                break;
            }
            message.author.send(render)
            fs.readFile("code.txt", function(err, data){
                var sd = text.replace(render, '');
                fs.writeFile("code.txt", sd)
            })
            message.reply("Your PIN its send in MP !")
        break;
}
})

bot.login(`NDQ4MDg0MDQxNjc0MTI5NDA4.DeRACQ.3MbzjknQzAF2w45ItSKbKQfHAS4`)

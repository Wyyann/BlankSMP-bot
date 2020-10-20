var discord = require("discord.js");
var client = new discord.Client();

client.on("ready", function() {

    console.log(client.user.tag + " | Connection to Discord established.");

    client.user.setActivity("port 25565", {type: "LISTENING"});

});

client.on("message", function(msg) {

    var args = msg.content.split(" ");
    var cmd = args.shift().toLowerCase();
    
    require("./bumpReminder.js").message(discord, client, msg, args, cmd);


});

client.on("guildMemberAdd", function(member) {

    require("./memberLog.js").guildMemberAdd(discord, client, member);

});

client.on("guildMemberRemove", function(member) {

    require("./memberLog.js").guildMemberRemove(discord, client, member);

});

client.login(process.env.BOT_TOKEN);

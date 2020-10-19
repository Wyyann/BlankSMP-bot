var discord = require("discord.js");
var client = new discord.Client();

client.on("ready", function() {

    console.log(client.user.tag + " | Connection to Discord established.");

    client.user.setActivity("port 25565", {type: "LISTENING"});

});

client.on("message", function(msg) {

    var args = msg.content.split(" ");
    var cmd = args.shift().toLowerCase();

    require("./commands/help.js").message(discord, client, msg, args, cmd);

    require("./commands/information/apply.js").message(discord, client, msg, args, cmd);
    require("./commands/information/discord.js").message(discord, client, msg, args, cmd);
    require("./commands/information/ip.js").message(discord, client, msg, args, cmd);
    require("./commands/information/twitter.js").message(discord, client, msg, args, cmd);
    require("./commands/information/website.js").message(discord, client, msg, args, cmd);
    require("./commands/information/youtube.js").message(discord, client, msg, args, cmd);

    require("./commands/staff/ban.js").message(discord, client, msg, args, cmd);
    require("./commands/staff/kick.js").message(discord, client, msg, args, cmd);
    require("./commands/staff/purge.js").message(discord, client, msg, args, cmd);
    require("./commands/staff/mute.js").message(discord, client, msg, args, cmd);
    require("./commands/staff/unmute.js").message(discord, client, msg, args, cmd);

    require("./commands/staff/accept.js").message(discord, client, msg, args, cmd);
    require("./commands/staff/decline.js").message(discord, client, msg, args, cmd);

    require("./features/bumpReminder.js").message(discord, client, msg, args, cmd);


});

client.on("guildMemberAdd", function(member) {

    require("./features/memberLog.js").guildMemberAdd(discord, client, member);

});

client.on("guildMemberRemove", function(member) {

    require("./features/memberLog.js").guildMemberRemove(discord, client, member);

});

client.login(require("./config.json").token);

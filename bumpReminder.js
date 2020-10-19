var botInteractionsChannel = "751062855880802324";

module.exports = {message: function(discord, client, msg, args, cmd) {

    if(msg.author.id == "302050872383242240") { // DISBOARD
        if(msg.embeds[0]) {
            if(msg.embeds[0].description) {
                if(msg.embeds[0].description.includes("Bump done")) {
                    setTimeout(function() {
                        // ping
                        client.channels.cache.get(botInteractionsChannel).send("<@271910522058702850>, <@319456708495802369>").then(function(pingMsg) {
                            pingMsg.delete();
                        });

                        // reminder
                        client.channels.cache.get(botInteractionsChannel).send(new discord.MessageEmbed()
                            .setTitle("Bump Reminder")
                            .setDescription("This server can now be bumped again.")
                            .setTimestamp());
                    }, 1000 * 60 * 60 * 2);
                }
            }
        }
    }

}}

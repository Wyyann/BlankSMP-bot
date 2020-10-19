var memberLogChannel = "726534995069632522";

module.exports = {guildMemberAdd: function(discord, client, member) {

    client.channels.cache.get(memberLogChannel).send("<@" + member.id + "> has joined. :open_hands:");

}, guildMemberRemove: function(discord, client, member) {

    client.channels.cache.get(memberLogChannel).send("<@" + member.id + "> has left. :wave:");

}}
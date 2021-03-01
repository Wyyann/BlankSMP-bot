var memberLogChannel = "815902581083734066";

module.exports = {guildMemberAdd: function(discord, client, member) {

    client.channels.cache.get(memberLogChannel).send("Welcome <@" + member.id + ">! If you wish to join our server, please check #<#751059378722832404> and search for our application!");

}, guildMemberRemove: function(discord, client, member) {

    client.channels.cache.get(memberLogChannel).send("<@" + member.id + "> has left. :wave:");

}}

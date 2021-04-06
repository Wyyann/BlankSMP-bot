const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const client = new Discord.Client();
const moment = require('moment')

client.once('ready', () => {
    let statuses = [
        `with ${client.users.size} users!`,
        `with the A320.`,
        `at Lertos Regional Airport!`
    ]
    
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "PLAYING"});
    }, 10000)
        console.log('Ready!')

})


client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    // ADMINISTRATION COMMANDS

    //!purge

    if(message.content.startsWith(`${prefix}purge`)) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You do not have the correct permission to use this command ${message.author}.`)
        if(!args[1]) return message.channel.send(`You must supply an amount of messages to delete.`)
        message.delete()
        message.channel.bulkDelete(args[1]).then(() => {
            message.channel.send(`🗄 Purged ${args[1]} messages!`).then(message => message.delete(3000))

            let purgeEmbed = new Discord.RichEmbed()
            .setTitle("Purge Case #")
            .setColor("#666666")
            .addField("Purged Messages", `${args[1]}`)
            .addField("Purged By", `${message.author}`)
            .addField("Purged In", `${message.channel}`)
            .setTimestamp(new Date())
            .setFooter(`Prefix: ${prefix}`, client.user.avatarURL)
    
            let purgeChannel = message.guild.channels.get("589500366261846017")
            if(!purgeChannel) return message.channel.send("Cannot find logs channel.")
    
            message.delete().catch(O_o=> {})
            purgeChannel.send(purgeEmbed)
        })

    }

    //!report
    if(message.content.startsWith(`${prefix}report`)) {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
        if(!rUser) return message.reply(`Cannot find the user.`)
        let rReason = args.join(" ").slice(29)
        if(!rReason) return message.reply("You must supply a reason.")
        
        let reportEmbed = new Discord.RichEmbed()
        .setTitle("Report Case #")
        .setColor("#666666")
        .addField("Reported User", `${rUser}`)
        .addField("Reported By", `${message.author}`)
        .addField("Reported In", `${message.channel}`)
        .addField("Reason", `${rReason}`)
        .setTimestamp(new Date())
        .setFooter(`Prefix: ${prefix}`, client.user.avatarURL)

        let reportsChannel = message.guild.channels.get("589500366261846017")
        if(!reportsChannel) return message.channel.send("Cannot find logs channel.")

        message.delete().catch(O_o=> {})
        reportsChannel.send(reportEmbed)


    }

    //!links
    if(message.content.startsWith(`${prefix}links`)) {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.delete()
            message.channel.send(`**Links**\n\nRoblox Group: https://www.roblox.com/groups/4438931/Hewo-Air/\nDiscord Guild: https://discord.gg/h2QsSss`)
        }
        else {
            message.delete()
            message.channel.send(`You do not have permission to use ${prefix}links.`)
        }
    }

    //!slinks
    if(message.content.startsWith(`${prefix}slinks`)) {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.delete()
            message.channel.send(`**Staff Links**\n\nROBLOX Group: https://web.roblox.com/groups/4438931/Hewo-Air\nStaff Discord Guild: https://discord.gg/v2USUbt`)
        }   
        else {
            message.delete()
            message.channel.send(`You do not have permission to use ${prefix}slinks.`)
        }
    }

    //!partners
    if(message.content.startsWith(`${prefix}partners`)) {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.delete()
            message.channel.send(`**Zenxa**\nA technology group.\n\nFounder: <@348853688179359746>\nDiscord: https://zenxa.tech/discord/`)
        }
        else {
            message.delete()
            message.channel.send(`You do not have permission to use ${prefix}slinks.`)
        }
    }

  //!rules
    if(message.content.startsWith(`${prefix}rules`)) {
        if(message.member.hasPermission("ADMINISTRATOR")) {
            message.delete()
        message.channel.send(`<:hewo:516658885352882196> **- Hewo.Air Server Guidlines**\n    If you do not abide by these guidelines you may be muted, kicked or banned. \n\n**Spamming**\nNo copy paste on any of our channels it may be annoying for some and it will result in a warning.\n\n**Racism or offensive jokes**\nRacism or offensive jokes are not tolerated at all in the server. If you are caught then you will be kicked.\n\n**Respect** \nAlways be respectful. If you are caught not being respectful you will be warned.\n\n**Advertising** \nAdvertising is not permitted in this server. This will result in an immediate kick.\n\n**Channels**\nKeep everything on their respective channel. If you are caught not using the correct channels you will be warned.\n\n**Tagging users**\nOnly tag users with a valid reason. Without one you will be warned.\n\n**Cold tagging**\nDo not tag someone and delete the tag. Cold tagging will result in a warning.\n\nReact with :white_check_mark: if you understand these rules.`)
        .then(message => {
            message.react("✅")
        }) 
    }
    else {
        message.delete()
        message.channel.send(`You cannot use ${prefix}rules.`)
    }
}

    //!announce
    if(message.content.startsWith(`${prefix}announce`)) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            message.delete()
            message.channel.send(`${message.content.substring(9)}\n\nGlowing Regards,\n<@${message.member.user.id}>`)
        }
        else {
            message.delete()
            
            let embed = new Discord.RichEmbed()
            .setTitle(":x: Error ")
            .setDescription(`You do not have the correct permission to use ${prefix}announce.`)
            .setTimestamp(`` + new Date())
            .setFooter(`Prefix: ${prefix}`, client.user.avatarURL)
            message.author.send(embed)
            }
        }
    //!newflight
    if(message.content.startsWith(`${prefix}newflight`)) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
                message.delete()
                message.guild.channels.get('579776412811264000').send(`**Flight**\nHost: <@${message.author.id}> \nDate: ` + args[1] + `\nTime: ` + args[2] + `\nAirport: ` + args[3] + `\nGate: ` + args[4] + `\nAircraft: ` + args[5] + `\nFlight Number: ` + args[6] + `\nNotes: ` + args.slice(7).join(" "))
                message.author.send(`I send this in <#579776412811264000>!\n\n**Flight**\nHost: <@${message.author.id}> \nDate: ` + args[1] + `\nTime: ` + args[2] + `\nAirport: ` + args[3] + `\nGate: ` + args[4] + `\nAircraft: ` + args[5] + `\nFlight Number: ` + args[6] + `\nNotes: ` + args.slice(7).join(" "))
        }
        else {
            message.delete()
    
         let embed = new Discord.RichEmbed()
        .setTitle(":x: Error ")
        .setDescription(`You do not have the correct permission to use ${prefix}newflight.`)
        .setTimestamp(`` + new Date())
        .setFooter(`Prefix: ${prefix}`, client.user.avatarURL)
        message.author.send(embed)
        }
    }

    // USER COMMANDS

    //!help
    if(message.content.startsWith(`${prefix}help`)) {

        const hEmbed = new Discord.RichEmbed()
        .setColor("#666666")
        .setTitle(`Hewo.Air Help`)
        .addField(`Moderation Commands [7]`, "`!newflight`, `!rules`, `!slinks`, `!links`, `!announce`, `!purge`, `!partners`")
        .addField("Utility Commands [2]", "`!report`, `!uptime`")
        .addField("Information Commands [1]", "`!userinfo`")
        .addField("Fun Commands [2]", "`!flip`, `!breakbot`")
        .addField("Verification Commands [1]", "`!verify`")
        .setTimestamp(new Date())
        .setFooter(`Prefix: ${prefix}`, client.user.avatarURL)
    
        message.channel.send(hEmbed)
    }

    //!userinfo
    if(message.content.startsWith(`${prefix}userinfo`)) {
    let user;
    if(message.mentions.users.first()) {
        user = message.mentions.users.first()

    } else {
        user = message.author
    }

    const member = message.guild.member(user);

    const uiEmbed = new Discord.RichEmbed()
    .setColor("#666666")
    .setThumbnail(member.avatarURL)
    .setTitle(`User Information for ${user.username}`)
    .addField(`Nickname`, `${member.displayName ? member.displayName : 'None'}`)
    .addField(`Joined At`,`${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`)
    .addField(`Tag`, `#${user.discriminator}`)
    .addField(`Bot`, `${user.bot}`)
    .addField("Status", `${user.presence.status}`)
    .addField("Game", `${user.presence.game ? user.presense.game.name : 'None'}`)
    .addField("Roles", member.roles.map(roles => `${roles.name}`).join(", "))
    .setTimestamp(new Date())
    .setFooter(`Prefix: ${prefix}`, client.user.avatarURL)

    message.channel.send(uiEmbed)
}

    //!verify
        if(message.content.startsWith(`${prefix}verify`)) {
                if(message.channel.name === "verify") {
                    const verifyRole = message.guild.roles.find(`name`, `Verified`);
                    var role = message.guild.roles.find(`name`, `Non-Verified`);
                    message.member.addRole(verifyRole);
                    message.member.removeRole(role);
                    message.channel.send(`:white_check_mark: You have verified <@` + message.member.user.id + `>! :white_check_mark:`)
                }
                else {
                    message.delete();
                    message.author.send(`:x: Error H05 :x:\nYou must verify in <#584483123484426280>! `)
            }
        }
        //breakbot
        if(message.content.startsWith(`${prefix}breakbot`)) {
            message.channel.send("nah")
        }

        //!coinflip
        if (message.content.startsWith(`${prefix}flip`)) {
            coin = Math.floor(Math.random() * 2)
            if (coin == 0) {
                message.channel.send("Flipping...")
                .then(message => {
                    message.delete(100)
                message.channel.send("You flipped heads!")
                })
            } else {
                message.channel.send("Flipping...")
                .then(message => {
                    message.delete(100)
                message.channel.send("You flipped tails!")
                
            })
            }

        }
    
                //message.channel.send(`How to use ${prefix}newflight\n\nDate : *your first word*\nTime : *your second word*\nAirport : *your third word*\nGate : *your fourth word*\nAircraft : *your fifth word*\nFlight Number : *your sixth word*\n Notes : *your seventh and final word*`)

        //!uptime
    else if(message.content.startsWith(`${prefix}uptime`)) {
            let totalSeconds = client.uptime / 1000
            let days = Math.floor(totalSeconds / 86400)
            let hours = Math.floor(totalSeconds / 3600)
            totalSeconds % 3600
            let minutes = Math.floor(totalSeconds / 60)
            let seconds = Number.parseInt(totalSeconds % 60)
        
            let dDay = `${days} Day`
            let dHour = `${hours} Hour`
            let dMinute = `${minutes} Minute`
            let dSecond = `${seconds} Second`
            if (days == 0) dDay == ""
            else if (days > 1) dDay += "s, "
            else dDay += ", "
            if (hours == 0) dHour == ""
            else if (hours > 1) dHour += "s, "
            else dHour += ", "
            if (minutes == 0) dMinute == ""
            else if (minutes > 1) dMinute += "s, "
            else minutes += ", "
            if (seconds == 0) dSecond = 0
            else if (seconds > 1) dSecond += "s"
            
            message.channel.send(`:watch: **Bot Uptime : ** ${dDay} ${dHour} ${dMinute} ${dSecond}`)
    }
})

        client.on('guildMemberAdd', member => {
            member.guild.channels.get('579776185341444117').send("<@" + member.id + "> joined. :open_hands:")
        })

        client.on('guildMemberRemove', member => {
            member.guild.channels.get('579776185341444117').send("<@" + member.id + "> left. :wave:"); 
        })
    
client.login(token);

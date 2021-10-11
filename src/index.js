const dotenv = require('dotenv') ;
const {Client , MessageAttachment , MessageEmbed } = require('discord.js') ;
const express = require('express') ;

//helper functions
const getVirtual = require('./getVirtual') ;
const getInfo = require('./getInfo') ;
const graph = require('./graph') ;

dotenv.config() ;

const app = express() ;

app.listen(process.env.PORT , () => {
    const client = new Client() ;

client.login(process.env.DISCORD_BOT_TOKEN) ; 

const pref = "!" ;

client.on('ready', () => {
    console.log(`${client.user.username} logged in !!`) ;
});

client.on('message', async (message) => {

    if(message.author.bot)  return ;

    if(message.content.startsWith(pref)){

        const [CMD, ...args] = message.content.trim().split(" ") ;
        if(CMD === '!getVirtual'){

            const contest = await getVirtual([...args]) ;
            const mess = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor('PolyCarp')
            .addFields(
                { name: 'Link ', value: `${contest}` },
            )
            .setTimestamp()
            .setFooter('Made by Sharan Swaroop' , `https://github.com/S-Swaroop`);
            message.channel.send(mess) ; 

        }else if(CMD === '!info'){

            const data = await getInfo(args[0]) ;
            const mess = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('User Info')
            .setAuthor('PolyCarp')
            .setImage(`${data.profilePic}`)
            .addFields(
                { name: 'Name ', value: `${data.Name}` },
                { name: 'Rating', value: `${data.Rating}` },
            )
            .setTimestamp()
            .setFooter('Made by Sharan Swaroop' , `https://github.com/S-Swaroop`);
            message.channel.send(mess) ; 

        }else if(CMD === '!graph'){
            const g = await graph(args[0]) ;
            message.channel.send(g) ;
        }else{
            const mess = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('COMMANDS')
            .setAuthor('PolyCarp')
            .addFields(
                { name: '!info <handle>', value: 'Gets the user\'s CodeForces Info.' },
                { name: '!graph <handle>', value: 'Shows the user\'s rating graph.' },
                { name: '!getVirtual div-<div no.> <handle1> <handle2> ...', value: 'Returns the link to a contest in which the user\'s haven\'t solved a problem.', inline: true },
            )
            .setTimestamp()
            .setFooter('Made by Sharan Swaroop' , `https://github.com/S-Swaroop`);

            message.channel.send(mess) ;
        }
    }
}) ;

}) ;




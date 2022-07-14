import discord, { Intents } from 'discord.js' ;
import consola from 'consola' ; 

//configs
import { BOT_TOKEN } from './config';
import connectDB from './config/db';

//constants
import {
    PREFIX , 
    GET_USER ,
    REGISTER ,
    GET_VIRTUAL ,
    REFRESH , 
    HELP
} from './utils/constants' ;

//utils
import parseMessage from './utils/parseMessage' ;
import { virtualContestsEmbed , userInfoEmbed } from './message_templates/embeds' ;

//actions
import getUser from './actions/GetUser' ;
import registerUser from './actions/RegisterUser' ;
import getVirtual from './actions/GetVirtual' ;

const client: any = new discord.Client({
    intents: [
        Intents.FLAGS.GUILDS , 
        Intents.FLAGS.GUILD_MESSAGES
    ]
}) ; 

client.login(BOT_TOKEN) ; 

client.on('ready' , () => {
    connectDB() ; 
    consola.success("Polycarp V2 is online") ;
}) ;

client.on("messageCreate" , async (userMessage: any): Promise<any> => {

    if(userMessage.author.bot)  return null ;

    if(userMessage.content.startsWith(PREFIX)) {
        let { 
            COMMAND ,
            ARGS , 
            FLAGS 
        } : { 
            COMMAND : string ; 
            ARGS : any ; 
            FLAGS : string[] 
        } = parseMessage(userMessage.content) ; 

        switch (COMMAND) {
            case GET_USER : {
                let { 
                    success , 
                    userData , 
                    message 
                } : {
                    success : boolean ; 
                    userData : any ; 
                    message : string
                } = await getUser(ARGS.username) ;

                if (success) {
                    userMessage.reply({embeds : [userInfoEmbed(userData)]}) ;
                } else {
                    userMessage.reply(message) ;
                }
                return ;
            }
            case REGISTER : {
                const author : any = userMessage.author ; 
                const handle : string = ARGS.handle ; 

                let {success , message } : { success : boolean ; message : string } = await registerUser(author , handle) ;
                
                if (success) {
                    userMessage.member.setNickname(handle) ;
                }
                userMessage.reply(message) ;
                return ;
            }
            case GET_VIRTUAL: {
                // userMessage.reply(`This action is under maintainance at the moment...`) ;
                // break ;
                let { success , contests , message } : { success : boolean ; contests : any ; message : string } = await getVirtual(ARGS.users) ;
                if ( success ) {
                    // consola.log(contests) ; 
                    userMessage.reply({embeds : [virtualContestsEmbed(contests)]}) ;
                } else {
                    userMessage.reply(message) ;
                }
                return ;
            }
            default :
                userMessage.reply("Hello world !") ;
        }
    }
});

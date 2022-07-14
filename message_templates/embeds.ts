import { MessageEmbed } from 'discord.js' ;

export const userInfoEmbed = (userData : any) : any => {
    const embededMessage = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${userData.handle}`)
        .setURL(`https://codeforces.com/profile/${userData.handle}`)
        .setAuthor({ name: 'PolyCarp', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://github.com/S-Swaroop/PolyCarp' })
        .setThumbnail(`${userData.titlePhoto}`)
        .addFields(
            { name: 'Name', value: `${userData.firstName} ${userData.lastName}` } ,
            { name: 'Country', value: `${userData.country}`, inline: true } ,
            { name: 'City', value: `${userData.city}`, inline: true } ,
            { name: 'Rank' , value: `${userData.rank}` , inline: true } , 
            { name: 'Contribution' , value: `${userData.contribution}` , inline: true } , 
            { name: 'Rating' , value: `${userData.rating}` , inline: true } ,
            { name: 'Max-Rating' , value: `${userData.maxRating}` , inline: true } ,
        )
        .setTimestamp() ;
    
    return embededMessage ;
}

export const virtualContestsEmbed = (contests : any) : any => {
    const embededMessage = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor({ name: 'PolyCarp', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://github.com/S-Swaroop/PolyCarp' })
        // .setThumbnail(`${userData.titlePhoto}`)
        .addFields(
            { name: 'Div. 1', value: `${contests.div1[0] || "Non Left !!"}`} ,
            { name: 'Div. 2', value: `${contests.div2[0] || "Non Left !!"}`} ,
            { name: 'Div. 3', value: `${contests.div3[0] || "Non Left !!"}`} ,
            { name: 'Div. 4', value: `${contests.div4[0] || "Non Left !!"}`} ,
            { name: 'Special', value: `${contests.special[0] || "Non Left !!"}`} 

        )
        .setTimestamp() ;
    
    return embededMessage ;
}
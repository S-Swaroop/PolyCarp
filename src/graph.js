const axios = require('axios') ;
const { MessageAttachment } = require('discord.js') ;
const { CanvasRenderService } = require('chartjs-node-canvas') ;

const graph = async (handle) => {
    const data = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`).then(res => res.data.result) ; 
    const rating = [] ;
    const contestId = [] ; 
    for(const item of data){
        rating.push(item.newRating) ; 
        contestId.push(item.contestId) ;
    }
    const width = 800 ; 
    const height = 600 ; 
    const chartCallBack = (ChartJS) => {
        ChartJS.plugins.register({
            beforeDraw : (chartInstance) => {
                const {ctx} = chartInstance.chart ; 
                ctx.fillStyle = 'white' ; 
                ctx.fillRect(0 , 0 , chartInstance.chart.width , chartInstance.chart.height) ; 
            }
        })

    } ;
    const canvas = new CanvasRenderService(
        width ,
        height ,
        chartCallBack
    )

    const configuration = {
        type : 'line' , 
        data : {
            labels : contestId ,
            datasets : [
                {
                    label : `${handle}'s rating` ,
                    data : rating , 
                    backGroundColor : 'rgb(225 , 225 , 225)',
                },
            ],
        },
    }

    const image = await canvas.renderToBuffer(configuration) ; 
    const attachment = new MessageAttachment(image) ;
    return attachment ; 
}

module.exports = graph ; 
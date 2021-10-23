const puppeteer = require('puppeteer') ;

const getVirtual = ([Div , ...handles]) => {
    let contest = "" ; 
    let n = Div[Div.length - 1] ;
    let div = `Div ${n}` ;
    contest = (async () => {
        const browser = await puppeteer.launch({
            headless: true ,
            args: ["--no-sandbox"]
        });
        const page = await browser.newPage() ;  
        await page.goto('https://cfvs.github.io/') ;
        await page.waitForSelector('#handleInp') ;
        for(var i = 0 ; i < handles.length ; i++){
            let handle = handles[i] ; 
            let inputField = await page.$('#handleInp') ;
            await inputField.type(handle) ;
            await page.click('button.ui.button') ;
            await page.waitForSelector('#handleTable td') ;
            await inputField.click({clickCount : 3}) ;
            await inputField.press('Backspace') ;
        } ;
        const [button] = await page.$x(`//button[contains(., '${div}')]`) ;
        await button.click() ; 
        await page.click('.ui.big.inverted.button.green') ;
        await page.waitForSelector('#contestTable td a') ;
        let href = await page.$eval("a", (elm) => elm.href);
        browser.close() ; 
        return href
    })() ;   
    return contest ; 
};



module.exports = getVirtual ; 
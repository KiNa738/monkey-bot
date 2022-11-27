const puppeteer = require('puppeteer')
require('dotenv').config()
const fs = require('fs')

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const text = [
    'idk',
    'I don\'t know',
    'I dont know',
    'i dont know',
    'i don\'t know',
    'IDK',
    'I have no idea',
    'i have no idea',
    'I don\'t have an idea',
    'i don\'t have an idea',
    'i have no clue',
    'I have no clue',
    'I don\'t have any idea',
    'i don\'t have any idea'
];

async function run() {
    const browser = await puppeteer.launch({
        args: [
            '--incognito',
          ],
        headless: true,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // Windows
     });

    const page = await browser.newPage()
    await page.goto('https://www.surveymonkey.com/r/XBXRFJT')
    
    const states = await page.evaluate(() => {
        const options = document.querySelector("#\\31 02873623").options;
        const random = Math.floor(Math.random() * options.length);
        return options[random].value;
    });
    await page.select('select[id="102873623"]', states)


    //Select gender
    const gender = Math.floor(Math.random() * 3) + 1;
    await page.click(`#question-field-102873624 > fieldset > div > div > div:nth-child(${gender}) > div`)

    //Select age
    const age = Math.floor(Math.random() * 6) + 1;
    await page.click(`#question-field-102873625 > fieldset > div > div > div:nth-child(${age}) > div`)

    //select income
    const income = Math.floor(Math.random() * 7) + 1;
    await page.click(`#question-field-102879510 > fieldset > div > div > div:nth-child(${income}) > div`)
    
    //click next
    await page.click('#patas > main > article > section > form > div > button')
    await sleep(600);
    
    //select gun
    const gun = Math.floor(Math.random() * 2) + 1;
    await page.click(`#question-field-102874804 > fieldset > div > div > div:nth-child(${gun}) > div`)

    //violence
    const violence = Math.floor(Math.random() * 2) + 1;
    await page.click(`#question-field-102874442 > fieldset > div > div > div:nth-child(${violence}) > div`)
    
    //click next
    await page.click('#patas > main > article > section > form > div > button.btn.small.next-button.survey-page-button.user-generated.notranslate')
    await sleep(600);

    if(violence == 2) {
        //random text for the violence
        const violence_text = text[Math.floor(Math.random() * text.length)];
        console.log(violence_text)
        await page.type('#question-field-102875812 > div > div > div', violence_text)
        
        //select continue
        const continue1 = Math.floor(Math.random() * 2) + 1;
        await page.click(`#question-field-102876007 > fieldset > div > div > div:nth-child(${continue1}) > div`)
        if(continue1 == 2){
            //screen shot
            // await page.screenshot({ path: 'screenshots/submit1.png' , fullPage: true})
            console.log("submited--1");
            await browser.close()
            return;
        }
    } else {
        //select resolve
        const resolve = Math.floor(Math.random() * 2) + 1; //edited
        await page.click(`#question-field-102876732 > fieldset > div > div > div:nth-child(${resolve}) > div`)

        //click next 
        await page.click('#patas > main > article > section > form > div > button.btn.small.next-button.survey-page-button.user-generated.notranslate')
        await sleep(600);
        
        if(resolve == 3) {
            //random text for the resolve
            const resolve_text = text[Math.floor(Math.random() * text.length)];
            console.log(resolve_text)
            await page.type('#question-field-102878417 > div > div > div', resolve_text)

            //click end
            await page.click('#question-field-102878586 > fieldset > div > div > div > div')

            //click done
            await page.click('#patas > main > article > section > form > div > button.btn.small.done-button.survey-page-button.user-generated.notranslate')
            console.log("submited--2");
            await browser.close()
            return;
        } else if( resolve == 1) {
            //select restriction 
            const gun = Math.floor(Math.random() * 6) + 1;
            await page.click(`#question-field-102877555 > fieldset > div > div > div:nth-child(${gun}) > div`)
            
            //click next
            await page.click('#patas > main > article > section > form > div > button.btn.small.next-button.survey-page-button.user-generated.notranslate')
            await sleep(600);

            // await page.screenshot({ path: 'screenshots/submit2.png' , fullPage: true})
            console.log("submited--3");
            await browser.close()
            return;
        } else {
            //select price
            const price = Math.floor(Math.random() * 5) + 1;
            await page.click(`#question-field-102878143 > fieldset > div > div > div:nth-child(${price}) > div`)

            //select glock
            const glock = Math.floor(Math.random() * 7) + 1;
            await page.click(`#question-field-102878302 > fieldset > div > div > div:nth-child(${glock}) > div`)

            //click next
            await page.click('#patas > main > article > section > form > div > button.btn.small.next-button.survey-page-button.user-generated.notranslate')
            await sleep(600);
        }
    }
    // await page.screenshot({ path: 'screenshots/submit3.png' , fullPage: true})
    console.log("submited--4");
    await browser.close()
    return;
}

async function excute(){
    for (let i = 0; i < 1000; i++) {
        try {
            await run()
        }
        catch (e) { console.log(e) }
    }
}
excute()

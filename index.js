const puppeteer = require('puppeteer');
const fs = require('fs');

(async function() {
    try {
        const browser = await puppeteer.launch({headless: "new"});
        const page = await browser.newPage();
        const content = fs.readFileSync("C:\\Users\\PC-Yusuf\\Downloads\\testt.html");
        await page.setContent(content.toString());
        await page.emulateMediaType('screen');
        await page.pdf({
            path: 'C:\\Users\\PC-Yusuf\\Downloads\\test.pdf', format: 'A4', printBackground: true
        });

        console.log('done');
        await browser.close();
        try {
            fs.unlinkSync("C:\\Users\\PC-Yusuf\\Downloads\\testt.html")
        } catch (err) {
            console.error(err);
        }
        process.exit();
    } catch (e) {
        console.log('our error', e)
    }
})();

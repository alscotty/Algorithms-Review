const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({headless: false});
    const page = await browser.newPage();

    let pagesQueue = ['https://playwright.dev/']

    while (pagesQueue.length > 0) {
        let url = pagesQueue.shift();
        await page.goto(url);
        // save current page html
        let ds = new Date().toISOString();
        let html = await page.content();
        console.log({ html })

        // collect current links
        // add to queue
    }

    await new Promise(res => setTimeout(res, 10000));
    await browser.close();
})();
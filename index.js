const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
 
app.get('/', (req, res) => {





  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] ,headless: true});
    const page = await browser.newPage();
  
    await page.goto('https://developers.google.com/web/');
  

    // Wait for suggest overlay to appear and click "show all results".
    const allResultsSelector = '#building-a-better-web-together';
    await page.waitForSelector(allResultsSelector);

  
    // Extract the results from the page.
    const data = await page.evaluate(resultsSelector => {
      return document.querySelectorAll(resultsSelector).innerHTML;
    }, resultsSelector);
  

    await browser.close();
  })();





  res
    .status(200)
    .send(data)
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
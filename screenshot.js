const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshot(url, browserOptions = {}, pageOptions = {}) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ...browserOptions
  });

  let page = await browser.newPage();

  await page.goto(url, {waitUntil: 'networkidle2'});

  await sleep(3000);

  let img = await page.screenshot({
    encoding: 'base64'
  });

  return img;
};

module.exports = takeScreenshot;
const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshot(url, browserOptions = {}, pageOptions = {}) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ...browserOptions
  });

  try {
    let page = await browser.newPage();

    await page.goto(url, {waitUntil: 'networkidle2'});

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    await page.evaluate(() => console.log(`url is ${location.href}`));

    let img = await page.screenshot({
      encoding: 'base64'
    });

    return img;

    await browser.close();
  } catch (err) {
    await browser.close();
    return {};
  }
};

module.exports = takeScreenshot;
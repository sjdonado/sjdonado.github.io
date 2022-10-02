const chromium = require('chrome-aws-lambda');
const { addExtra } = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');

const puppeteerExtra = addExtra(chromium.puppeteer);

// Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
puppeteerExtra.use(StealthPlugin());

const args = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certificate-errors',
  '--ignore-certificate-errors-spki-list',
];

const launch = async () => {
  const options = {
    defaultViewport: chromium.defaultViewport,
    headless: Boolean(process.env.SLS_DEBUG),
    executablePath: await chromium.executablePath,
    ignoreHTTPSErrors: true,
    args: chromium.args.concat(args),
  };

  const browser = await puppeteerExtra.launch(options);

  return browser;
};

module.exports = {
  launch,
};

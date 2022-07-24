const launchChrome = require('@serverless-chrome/lambda');
const request = require('superagent');

module.exports.getChrome = async () => {
  const chrome = await launchChrome({
    flags: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      "--proxy-server='direct://",
      '--proxy-bypass-list=*',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--disable-features=site-per-process',
      '--enable-features=NetworkService',
      '--allow-running-insecure-content',
      '--enable-automation',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-web-security',
      '--autoplay-policy=user-gesture-required',
      '--disable-background-networking',
      '--disable-breakpad',
      '--disable-client-side-phishing-detection',
      '--disable-component-update',
      '--disable-default-apps',
      '--disable-domain-reliability',
      '--disable-extensions',
      '--disable-features=AudioServiceOutOfProcess',
      '--disable-hang-monitor',
      '--disable-ipc-flooding-protection',
      '--disable-notifications',
      '--disable-offer-store-unmasked-wallet-cards',
      '--disable-popup-blocking',
      '--disable-print-preview',
      '--disable-prompt-on-repost',
      '--disable-speech-api',
      '--disable-sync',
      '--disk-cache-size=33554432',
      '--hide-scrollbars',
      '--ignore-gpu-blacklist',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-zygote',
      '--password-store=basic',
      '--use-gl=swiftshader',
      '--use-mock-keychain',
      '--disable-web-security',
      '--disable-features=site-per-process',
      '--headless',
    ],
  });

  const response = await request
    .get(`${chrome.url}/json/version`)
    .set('Content-Type', 'application/json');

  const endpoint = response.body.webSocketDebuggerUrl;

  return {
    endpoint,
    instance: chrome,
  };
};

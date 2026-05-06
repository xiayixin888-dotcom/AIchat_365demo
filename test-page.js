const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  const filePath = 'file://' + path.resolve('/Users/xia/Documents/trae_projects/私域助手0305/ai-0305/share.html');
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  await browser.close();
})();

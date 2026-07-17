import { chromium } from 'playwright';

const outDir = 'C:/Users/INFOFI~1/AppData/Local/Temp/claude/d--veermani-portfolio-portfolio-app/ecd876ba-b7ed-41dd-bc10-0e6b8bf9e7fc/scratchpad';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.addInitScript(() => {
  window.localStorage.setItem('portfolio-theme', 'light');
});
await page.goto('http://localhost:5185/', { waitUntil: 'networkidle' });
await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await page.waitForTimeout(800);

const sections = ['about', 'redesign', 'showcase', 'skills', 'experience', 'contact'];
for (const id of sections) {
  await page.evaluate((sid) => {
    const el = document.getElementById(sid);
    window.scrollTo(0, el.offsetTop - 90);
  }, id);
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/lt2-${id}.png` });
}

// open chatbot widget
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(300);
await page.click('.chatbot-trigger');
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}/lt2-chatbot.png` });

// open project modal
await page.click('.chatbot-trigger'); // close it
await page.waitForTimeout(300);
await page.evaluate(() => {
  const el = document.getElementById('showcase');
  window.scrollTo(0, el.offsetTop - 90);
});
await page.waitForTimeout(500);
await page.click('.project-card');
await page.waitForTimeout(500);
await page.screenshot({ path: `${outDir}/lt2-modal.png` });

await browser.close();
console.log('done');

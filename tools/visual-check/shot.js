const { chromium } = require('playwright');
const [url, outdir] = process.argv.slice(2);
require('fs').mkdirSync(outdir, { recursive: true });
(async () => {
const freeze = pg => pg.evaluate(async () => { await document.fonts.ready; document.getAnimations().forEach(a => { try { if (a.effect.getComputedTiming().iterations === Infinity) { a.pause(); a.currentTime = 0; } } catch (e) {} }); });
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' });
  const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await pg.addInitScript(() => { let s = 12345; Math.random = () => (s = (s * 16807) % 2147483647) / 2147483647; });
  await pg.clock.install({ time: new Date('2026-10-01T00:00:00+07:00') });
  await pg.goto(url); await pg.clock.runFor(3000);
  await pg.addStyleTag({ content: '[class*=heart]{display:none!important}*{caret-color:transparent!important}' + (process.env.EXTRA_CSS || '') });
  await pg.waitForTimeout(3500);
  await freeze(pg); await pg.screenshot({ path: outdir + '/00-intro.png' });
  await pg.locator('button.wd-seal').click({ force: true });
  await pg.clock.runFor(6000); await pg.waitForTimeout(4000);
  const sel = await pg.evaluate(() => { let best = null, bh = 0; document.querySelectorAll('*').forEach(e => { const st = getComputedStyle(e); if (/(auto|scroll)/.test(st.overflowY) && e.scrollHeight - e.clientHeight > bh) { bh = e.scrollHeight - e.clientHeight; best = e; } }); if (best) best.setAttribute('data-sc', '1'); return best ? best.tagName + '.' + best.className + ' ' + bh : 'window'; });
  console.log('scroller:', sel);
  const total = await pg.evaluate(() => { const e = document.querySelector('[data-sc]') || document.scrollingElement; return e.scrollHeight; });
  let i = 1;
  for (let y = 0; y < total; y += 600, i++) {
    await pg.evaluate(v => { const e = document.querySelector('[data-sc]') || document.scrollingElement; e.scrollTo(0, v); }, y);
    await pg.clock.runFor(1500); await pg.waitForTimeout(2800);
    await freeze(pg); await pg.screenshot({ path: outdir + '/' + String(i).padStart(2, '0') + '-y' + y + '.png' });
  }
  console.log('total', total, 'shots', i);
  await b.close();
})();

const { chromium } = require('playwright');
const fs = require('fs');
const [a, b] = process.argv.slice(2);
(async () => {
  const br = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/opt/pw-browsers/chromium' });
  const pg = await br.newPage();
  const files = fs.readdirSync(a).filter(f => f.endsWith('.png')).sort();
  let bad = 0;
  for (const f of files) {
    if (!fs.existsSync(b + '/' + f)) { console.log('MISSING', f); bad++; continue; }
    const r = await pg.evaluate(async ([x, y]) => {
      const load = s => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.src = 'data:image/png;base64,' + s; });
      const [i1, i2] = await Promise.all([load(x), load(y)]);
      if (i1.width !== i2.width || i1.height !== i2.height) return { size: true };
      const c = document.createElement('canvas'); c.width = i1.width; c.height = i1.height; const g = c.getContext('2d');
      g.drawImage(i1, 0, 0); const d1 = g.getImageData(0, 0, c.width, c.height).data;
      g.clearRect(0, 0, c.width, c.height); g.drawImage(i2, 0, 0); const d2 = g.getImageData(0, 0, c.width, c.height).data;
      let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
      for (let p = 0; p < d1.length; p += 4) { if (Math.abs(d1[p]-d2[p])+Math.abs(d1[p+1]-d2[p+1])+Math.abs(d1[p+2]-d2[p+2]) > 12) { n++; const px = (p/4) % c.width, py = Math.floor(p/4/c.width); x0=Math.min(x0,px); x1=Math.max(x1,px); y0=Math.min(y0,py); y1=Math.max(y1,py); } }
      return { n, box: n ? [x0, y0, x1, y1] : null, total: c.width * c.height };
    }, [fs.readFileSync(a + '/' + f, 'base64'), fs.readFileSync(b + '/' + f, 'base64')]);
    if (r.size || r.n > 0) { bad++; console.log('DIFF', f, JSON.stringify(r)); } else console.log('ok  ', f);
  }
  console.log(bad ? `${bad} differing` : 'ALL IDENTICAL');
  await br.close();
})();

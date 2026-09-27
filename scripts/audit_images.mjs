import fs from 'fs';

const files = [
  'src/data/canonicalInventory.ts',
  'src/data/destinations.ts',
  'src/data/collections.ts'
];

let urls = [];
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/[^"\s',]+/g) || [];
  urls.push(...matches);
}

urls = [...new Set(urls)];
console.log('Auditing', urls.length, 'unique image URLs...');

async function verifyAll() {
  let failed = 0;
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'HEAD' });
      if (res.status === 200) {
        console.log('✓ 200 OK:', u.split('?')[0]);
      } else {
        console.error('✗ FAIL (' + res.status + '):', u);
        failed++;
      }
    } catch (err) {
      console.error('✗ ERROR:', u, err.message);
      failed++;
    }
  }
  console.log('AUDIT RESULT:', failed === 0 ? 'ALL IMAGES 100% OK' : failed + ' FAILED');
  process.exit(failed === 0 ? 0 : 1);
}

verifyAll();

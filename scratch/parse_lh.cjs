const fs = require('fs');
const report = JSON.parse(fs.readFileSync('lighthouse report.json', 'utf8'));

console.log('=== Category Scores ===');
for (const [k, v] of Object.entries(report.categories)) {
  console.log(`${k}: ${Math.round(v.score * 100)}`);
}

const audits = report.audits;
console.log('\n=== Core Web Vitals & Metrics ===');
['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive', 'max-potential-fid'].forEach(id => {
  const a = audits[id];
  if (a) {
    console.log(`${id}: score=${a.score}, displayValue=${a.displayValue}, numericValue=${Math.round(a.numericValue || 0)}`);
  }
});

console.log('\n=== Performance Opportunities & Diagnostics (< 0.9) ===');
for (const ref of report.categories.performance.auditRefs) {
  const a = audits[ref.id];
  if (a && a.score !== null && a.score < 0.9) {
    console.log(`- ${ref.id} (weight=${ref.weight}): score=${a.score}, displayValue=${a.displayValue || ''}`);
    if (a.details && a.details.items && a.details.items.length > 0) {
      console.log('  Items preview:', JSON.stringify(a.details.items.slice(0, 3)).slice(0, 200));
    }
  }
}


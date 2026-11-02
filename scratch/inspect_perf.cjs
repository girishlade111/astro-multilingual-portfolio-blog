const fs = require('fs');
const report = JSON.parse(fs.readFileSync('lighthouse report.json', 'utf8'));
const audits = report.audits;

console.log('=== Long Tasks / Main Thread Work ===');
if (audits['long-tasks'] && audits['long-tasks'].details) {
  console.log('Long tasks:', audits['long-tasks'].details.items);
}

console.log('\n=== Bootup Time (Execution Time by Script) ===');
if (audits['bootup-time'] && audits['bootup-time'].details) {
  console.log('Bootup items:', audits['bootup-time'].details.items.slice(0, 10));
}

console.log('\n=== Third Party Summary ===');
if (audits['third-party-summary'] && audits['third-party-summary'].details) {
  console.log(audits['third-party-summary'].details.items);
}

console.log('\n=== Render Blocking Resources ===');
if (audits['render-blocking-resources'] && audits['render-blocking-resources'].details) {
  console.log(audits['render-blocking-resources'].details.items);
}

console.log('\n=== Unused CSS / JS ===');
['unused-css-rules', 'unused-javascript'].forEach(k => {
  if (audits[k] && audits[k].details) {
    console.log(k, audits[k].displayValue, audits[k].details.items.slice(0, 5));
  }
});


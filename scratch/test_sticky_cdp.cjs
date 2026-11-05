const { spawn } = require('child_process');
const WebSocket = require('ws');

async function testFix() {
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--window-size=1280,900',
    '--no-sandbox',
    'http://localhost:3000/en/blog/meet-girish-lade-builder-profile-story'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  
  try {
    const list = await (await fetch('http://localhost:9225/json')).json();
    const tab = list.find(t => t.url.includes('meet-girish-lade'));
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(r => ws.on('open', r));
    
    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const onMsg = (data) => {
          const res = JSON.parse(data);
          if (res.id === curId) {
            ws.off('message', onMsg);
            resolve(res.result);
          }
        };
        ws.on('message', onMsg);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    await send('Runtime.enable');

    // Remove overflow-x: hidden and use overflow-x: clip
    await send('Runtime.evaluate', {
      expression: `(() => {
        document.documentElement.style.overflowX = 'clip';
        document.body.style.overflowX = 'clip';
      })()`
    });

    // Scroll down 1000px
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, 1000)`
    });
    await new Promise(r => setTimeout(r, 500));

    // Check aside rect
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const aside = document.querySelector('aside');
        const rect = aside ? aside.getBoundingClientRect() : null;
        return {
          scrollY: window.scrollY,
          top: rect ? rect.top : null,
          bottom: rect ? rect.bottom : null,
          height: rect ? rect.height : null,
          htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
          htmlOverflowY: getComputedStyle(document.documentElement).overflowY,
          bodyOverflowX: getComputedStyle(document.body).overflowX,
          bodyOverflowY: getComputedStyle(document.body).overflowY
        };
      })()`,
      returnByValue: true
    });
    console.log('Result with overflow-x: clip after 1000px scroll:\n', res.result.value);

    ws.close();
  } finally {
    chrome.kill();
  }
}
testFix();

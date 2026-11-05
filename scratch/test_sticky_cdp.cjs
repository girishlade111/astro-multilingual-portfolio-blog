const { spawn } = require('child_process');
const http = require('http');

async function testSticky() {
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--window-size=1280,900',
    '--no-sandbox',
    'http://localhost:3000/en/blog/meet-girish-lade-builder-profile-story'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  
  try {
    const list = await (await fetch('http://localhost:9223/json')).json();
    const tab = list.find(t => t.url.includes('meet-girish-lade'));
    console.log('Found tab:', tab ? tab.title : 'none');
    
    // Connect WebSocket
    const ws = new (require('events').EventEmitter)();
    const WebSocket = require('ws') || null; // check if ws exists
  } catch (e) {
    console.error(e);
  } finally {
    chrome.kill();
  }
}
testSticky();

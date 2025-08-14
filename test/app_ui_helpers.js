const assert = require('assert');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Setup DOM environment
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.org/' });
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;

// Extract and evaluate helper functions from app.js
const code = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
function extract(name){
  const fn = code.match(new RegExp(`function\\s+${name}\\([^]*?\\n}`, 'm'));
  if(!fn) throw new Error(name + ' not found');
  vm.runInThisContext(fn[0]);
}
['el','sanitizeHtml','clamp','makeFog','escapeHtml','stripTags','cellStyle','pxToGrid','deepClone','addSay','addWhisper'].forEach(extract);

// ---- Tests ----

const input = el('input', { type: 'text', value: 'hello' });
assert.strictEqual(input.value, 'hello');

const cb = el('input', { type: 'checkbox', checked: true });
assert.strictEqual(cb.checked, true);

const sel = el('select', {}, [
  el('option', { value: 'a' }, 'A'),
  el('option', { value: 'b', selected: true }, 'B')
]);
assert.strictEqual(sel.value, 'b');
assert.strictEqual(sel.options[1].selected, true);

// Generic event and style/dataset support
let hovered=false;
const btn = el('button',{onmouseover:()=>hovered=true,style:{color:'red'},dataset:{id:'123'}},'hi');
btn.onmouseover();
assert.strictEqual(hovered,true);
assert.strictEqual(btn.style.color,'red');
assert.strictEqual(btn.dataset.id,'123');

// sanitizeHtml should remove dangerous tags/attrs
const dirty = '<div onclick="x()"><script>bad()</script><link /><meta /><a href="javascript:evil()">x</a></div>';
const clean = sanitizeHtml(dirty);
assert(!clean.includes('script'));
assert(!clean.includes('onclick'));
assert(!clean.includes('link'));
assert(!clean.includes('meta'));
assert(!clean.includes('javascript:'));

// clamp should handle swapped bounds and invalid inputs
assert.strictEqual(clamp('5','10','1'),5); // swaps
assert.strictEqual(clamp('bad',0,2),0); // invalid value
assert.strictEqual(clamp(7,'a','b'),7); // invalid bounds treated as open
assert.strictEqual(clamp(5,0,Infinity),5); // Infinity bound

// escapeHtml and stripTags should preserve numbers
assert.strictEqual(escapeHtml(0), '0');
assert.strictEqual(stripTags(0), '0');
assert.strictEqual(escapeHtml("<>&\"'"), '&lt;&gt;&amp;&quot;&#39;');

// deepClone should copy objects deeply and preserve Dates even without structuredClone
const savedSC = global.structuredClone;
global.structuredClone = undefined;
const obj = {a:1,b:{c:2},d:new Date(0)};
const copy = deepClone(obj);
global.structuredClone = savedSC;
copy.b.c=5;
assert.strictEqual(obj.b.c,2);
assert.ok(copy.d instanceof Date);
assert.notStrictEqual(copy.d,obj.d);

// makeFog should validate dimensions
const fog = makeFog(2.7,1.2,true);
assert.deepStrictEqual(fog, [[true,true]]);
const fog2 = makeFog(-3,2,false);
assert.deepStrictEqual(fog2, [[],[]]);

// cellStyle should clamp coordinates
global.GRID_W = 12; global.GRID_H = 8;
const cs = cellStyle(-5, 20);
const left = parseFloat(cs.match(/left:(\d+(?:\.\d+)?)%/)[1]);
const top = parseFloat(cs.match(/top:(\d+(?:\.\d+)?)%/)[1]);
assert(Math.abs(left - ((0.5/12)*100)) < 1e-6);
assert(Math.abs(top - ((7.5/8)*100)) < 1e-6);

// pxToGrid should handle zero dimensions without NaN
global.GRID_WPX = () => 120; global.GRID_HPX = () => 80;
let res = pxToGrid(60,40);
assert.deepStrictEqual(res,[6,4]);
global.GRID_WPX = () => 0; global.GRID_HPX = () => 0;
res = pxToGrid(50,50);
assert.deepStrictEqual(res,[11,7]);

// addSay and addWhisper should render apostrophes correctly
global.chatLog = document.createElement('div');
global.state = { settings:{autoScroll:false, ttsOn:false}, scenes:[{tokens:[]}], sceneIndex:0 };
global.speakerAvatar = () => '';
global.currentScene = () => state.scenes[state.sceneIndex];
global.timestampEl = () => null;
global.recordEvent = () => {};

addSay('Eve', "I'm fine.");
let content = chatLog.querySelector('.content');
assert.strictEqual(content.textContent, "I'm fine.");

chatLog.innerHTML = '';
addWhisper('Eve', "Don't panic.");
content = chatLog.querySelector('.content');
assert.strictEqual(content.textContent, "Don't panic.");

// el should accept NodeList children
document.body.innerHTML = '<span>A</span><span>B</span>';
const nodes = document.querySelectorAll('span');
const container = el('div', {}, nodes);
assert.strictEqual(container.childNodes.length, 2);

// sanitizeHtml should strip additional dangerous tags
const dirty2 = '<form action="/"><input></form><base href="http://evil.com/">x';
const clean2 = sanitizeHtml(dirty2);
assert(!clean2.includes('form'));
assert(!clean2.includes('base'));

// clamp should allow unspecified bounds
assert.strictEqual(clamp(5), 5);

// pxToGrid should handle negative dimensions
global.GRID_WPX = () => -120; global.GRID_HPX = () => -80;
res = pxToGrid(60,40);
assert.deepStrictEqual(res,[6,4]);

// deepClone should copy Maps and Sets
const m = new Map([['a',1]]);
const mCopy = deepClone(m);
assert(mCopy instanceof Map);
mCopy.set('b',2);
assert.strictEqual(m.size,1);
const s = new Set([{k:1}]);
const sCopy = deepClone(s);
assert(sCopy instanceof Set);
[...sCopy][0].k = 2;
assert.strictEqual([...s][0].k,1);

console.log('All UI helper tests passed.');

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
['el','sanitizeHtml','clamp','deepClone','makeFog'].forEach(extract);

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
assert.strictEqual(clamp(7,'a','b'),0); // invalid bounds default to 0

// deepClone should copy objects deeply and preserve Dates
const obj = {a:1,b:{c:2},d:new Date(0)};
const copy = deepClone(obj);
copy.b.c=5;
assert.strictEqual(obj.b.c,2);
assert.ok(copy.d instanceof Date);
assert.notStrictEqual(copy.d,obj.d);

// makeFog should validate dimensions
const fog = makeFog(2.7,1.2,true);
assert.deepStrictEqual(fog, [[true,true]]);
const fog2 = makeFog(-3,2,false);
assert.deepStrictEqual(fog2, [[],[]]);

console.log('All UI helper tests passed.');

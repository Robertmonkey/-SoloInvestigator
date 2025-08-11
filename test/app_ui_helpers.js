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

// Extract and evaluate only the `el` helper from app.js
const code = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
const match = code.match(/function\s+el\([^]*?return\s+e;\n}/);
if (!match) throw new Error('el helper not found');
vm.runInThisContext(match[0]);

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

console.log('All UI helper tests passed.');

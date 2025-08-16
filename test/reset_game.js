const assert = require('assert');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://example.org/' });
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;

const code = fs.readFileSync(path.join(__dirname, '../js/app.js'), 'utf8');
function extract(name){
  const fn = code.match(new RegExp(`function\\s+${name}\\([^]*?\n}`, 'm'));
  if(!fn) throw new Error(name + ' not found');
  vm.runInThisContext(fn[0]);
}
extract('makeFog');
extract('newScene');
extract('createState');
extract('resetForNewGame');

global.GRID_W = 12;
global.GRID_H = 8;
global.state = createState();
state.memory.summary = 'old';
state.chat.push({text:'hi'});
global.director = { memory:[{x:1}], conversations:{a:1} };

resetForNewGame();

assert.deepStrictEqual(state.memory, {summary:'', scenes:{}});
assert.deepStrictEqual(state.chat, []);
assert.strictEqual(director.memory.length, 0);
assert.deepStrictEqual(director.conversations, {});

console.log('reset game tests passed');

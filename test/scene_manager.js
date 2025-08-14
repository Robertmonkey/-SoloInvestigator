const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const LOCATION_WORDS = require('../js/locationWords.js');

const code = fs.readFileSync(path.join(__dirname, '../js/sceneManager.js'), 'utf8');
const sandbox = { LOCATION_WORDS };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const re = vm.runInContext('BG_LOC_RE', sandbox);

assert(re.test('The investigators explored a fjord before dusk.'));
assert(re.test('They gathered inside the armory to plan.'));
assert(re.test('The party marched toward the ancient castle at dawn.'));

console.log('Scene manager tests passed.');

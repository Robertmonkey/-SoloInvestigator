const assert = require('assert');
const {NarrationDirector} = require('../js/director.js');

// minimal state with one scene and tokens
const state = {
  scenes:[{name:'Test', tokens:[
    {id:'npc1', name:'Bob', type:'npc'},
    {id:'pc1', name:'You', type:'pc', sheet:{inventory:[{name:'Key',qty:1}]}}
  ]}],
  sceneIndex:0
};

const director = new NarrationDirector();
director.attachState(state);
const actor = state.scenes[0].tokens[1];

// validateAction rejects nonexistent targets
assert.strictEqual(director.validateAction(actor, {type:'talk', target:'Ghost'}).allowed, false);

// talk with persuade intent triggers roll request
const res = director.handleAction(actor, {type:'talk', target:'Bob', intent:'persuade'});
assert.ok(res.rollRequests && res.rollRequests[0].skill === 'Charm');

// hasItem should be case-insensitive and ignore non-strings
assert.strictEqual(director.hasItem(actor, 'key'), true);
assert.strictEqual(director.hasItem(actor, 123), false);

// memory tagging
const memBefore = director.memory.length;
director.remember('action', {type:'use', item:'Key'}, ['use','Key'], actor);
assert.strictEqual(director.memory.length, memBefore + 1);
assert.ok(director.getMemories('Key').length >= 1);

// findToken should handle out-of-range scene indices
state.sceneIndex = -5;
assert.strictEqual(director.findToken('Bob').name, 'Bob');
state.sceneIndex = 10;
assert.strictEqual(director.findToken('Bob').name, 'Bob');
// findToken should also locate by id
assert.strictEqual(director.findToken('npc1').name, 'Bob');

// getConversation should reject non-string targets
assert.strictEqual(director.getConversation(null), null);
assert.strictEqual(director.getConversation({}), null);

// talking without a target shouldn't throw
const res2 = director.handleAction(actor, {type:'talk', text:'Hello there'});
assert.strictEqual(res2.narration, 'Hello there');

console.log('director tests passed');

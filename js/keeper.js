/* ---------- KEEPER & AI HELPERS ---------- */
function buildAIPrompt(actor){
  const sc=currentScene();
  const party=sc.tokens.filter(t=>t.type==='pc').map(t=>`${t.name} at (${t.x},${t.y})`).join('; ');
  const npcs=sc.tokens.filter(t=>t.type==='npc').map(t=>`${t.name} at (${t.x},${t.y})`).join(', ');
  const recentChat = Array.from(chatLog.querySelectorAll('.line')).slice(-5).map(l=>l.innerText).join('\n');

  const notableSkills = Object
    .entries(actor.sheet?.skills || {})
    .filter(([k, v]) => v >= 50)
    .map(([k]) => k)
    .join(', ');

  const persona = `You are ${actor.name}, a ${actor.sheet?.archetype || 'character'}.
Backstory: ${actor.persona || actor.sheet?.persona || 'Unknown'}
Traits: ${actor.sheet?.traits || 'As defined by archetype.'}
You remember past events and companions.
Your current health is ${actor.sheet?.hp ?? '??'} HP and ${actor.sheet?.sanity ?? '??'} Sanity.
Your skills of note are: ${notableSkills || 'none'}.`;

  const instructions = `It's your turn in an encounter. You have ${state.encounter.movesLeft} movement tiles and 1 action.
The scene is: ${sc.name}.
Your allies are: ${party}. NPCs present: ${npcs}.
Story so far: ${state.memory || '(just beginning)'}
Recent events:\n${recentChat}\n
Speak as if you are a player guiding ${actor.name}; use a vivid, in-character voice and refer to allies by name when it makes sense.
Based on your persona and the situation, decide what to do. Your goals are to survive and solve the mystery.
Output ONLY a compact JSON object inside an <engine> tag.
The JSON can have three optional keys: "say" (a string of what you say), "move" (an object with a "to" key like {"to":[x,y]}), and "perform" (a string describing a physical action like "searches the dusty bookshelf").
Example: <engine>{"say": "I'll check over there!", "move": {"to":[${actor.x+1},${actor.y}]}, "perform": "shines their flashlight into the dark corner"}</engine>
Be brief but expressive. Do not narrate. Just provide the JSON for your action.`;

  return [{role:'system',content:persona},{role:'user',content:instructions}];
}

async function executeAITurn(actor){
  if(state.aiThinking) return;
  state.aiThinking=true;
  updateTurnBanner();
  renderInit();

  const messages=buildAIPrompt(actor);
  const model=state.settings.openaiModel||'gpt-4o-mini';
  const key=state.settings.openaiKey;

  try{
    let text;
    if(key && state.settings.keeperOn){
      const res=await fetch('https://api.openai.com/v1/chat/completions',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
        body:JSON.stringify({model, messages, temperature:0.8, max_tokens:200})
      });
      if(!res.ok) throw new Error(await res.text());
      const data=await res.json();
      text=data.choices?.[0]?.message?.content || '{}';
    }else{
      text=`<engine>{"say":"I'm thinking…", "perform":"recalls recent events and scans the room"}</engine>`;
    }

    const eng=parseEngine(text);
    if(eng) await applyEngineResponse(eng, actor);
    maybeSummarizeLocal();

  }catch(err){
    addSystemMessage(`The ether crackles... (${actor.name}'s AI failed).`);
    console.error('AI turn error:', err);
  }finally{
    state.aiThinking=false;
    updateTurnBanner();
    renderInit();
    setTimeout(advanceTurn,2000);
  }
}

async function applyEngineResponse(eng, actor){
  if(eng.perform){
    addActionLine(`* ${actor.name} ${eng.perform} *`);
    await new Promise(r=>setTimeout(r,700));
  }
  if(eng.move && eng.move.to){
    const [gx,gy]=eng.move.to;
    tryMoveCommand(actor, gx, gy, true);
    await new Promise(r=>setTimeout(r,700));
  }
  if(eng.say){
    addSay(actor.name, eng.say, actor.type);
    if(state.settings.ttsOn) speak(stripTags(eng.say), actor.name, actor.type);
  }
}

/* ---------- KEEPER AI (token‑frugal) ---------- */
function keeperSystem(){
  const sc=currentScene();
  const party=sc.tokens.filter(t=>t.type==='pc').map(t=>`${t.name} — persona: ${t.persona||t.sheet?.persona||'N/A'}`).join('; ');
  const npcs=sc.tokens.filter(t=>t.type==='npc').map(t=>t.name).join(', ');
  const you = sc.tokens.find(t=> t.id===state.youPCId);
  const enc = state.encounter.on ? `Encounter ON — ${getActiveToken()?.name||'n/a'} to act, moves ${state.encounter.movesLeft}.` : 'Free exploration';
  const style = state.settings.keeperStyle;
  const brevity = style==='brief' ? 'Use 1–3 sentences.' : (style==='verbose' ? 'Use 4–8 sentences.' : 'Use 2–5 sentences.');
  return `You are The Keeper (tutorial). Teach gently. ${brevity}
- Narrate a beat with personality then give a single clear choice or prompt; keep scenes varied.
- Use generic percentile checks (Success/Hard/Extreme). Avoid proprietary rule text.
- In Encounter mode, prompt the active investigator; ALSO add one short, persona-rich line for a companion and one NPC when present.
- Weave in past events and relationships from the Memory when it helps roleplay.
- Output compact markup + an <engine>{...}</engine> JSON:
  {"say":[{"speaker":string,"role":"pc"|"npc"|"keeper","text":string}...],
   "moves":[{"tokenId":string,"to":[x,y]}...],
   "rollRequests":[{"character":string,"skill":string,"mod":number}...]}

<campaign>
Title: ${state.campaign?.title||'Scenario'}
Acts: ${(state.campaign?.acts||[]).map(a=>a.name).join(' | ')}
Mode: ${enc}
Memory: ${state.memory||'(none)'}
</campaign>

Players (PCs): ${party||'none yet'}
NPCs on scene: ${npcs||'none'}
YOU are: ${you? you.name+' ('+(you.persona||you.sheet?.persona||'no persona')+')' : 'not yet chosen'}
Rules notes: """${state.settings.rulesPack||''}"""
`;
}
function parseEngine(text){ const m=text.match(/<engine>([\s\S]+?)<\/engine>/i); if(!m) return null; try{ return JSON.parse(m[1]); }catch{ return null; } }
function applyEngine(eng){
  if(eng.say){ eng.say.forEach(s=> addSay(s.speaker||'Someone', escapeHtml(s.text||''), s.role||'pc')); }
  if(eng.moves){ eng.moves.forEach(m=>{ const t=currentScene().tokens.find(x=>x.id===m.tokenId); if(t){ tryMoveCommand(t, m.to?.[0], m.to?.[1]); } }); }
  if(eng.rollRequests){ eng.rollRequests.forEach(r=> doRoll('1d100', {who:'keeper', note:`${r.character||'PC'} ${r.skill?`(${r.skill})`:''}`})); }
}
function demoKeeper(userText){
  const tips=[
   "You can move up to 4 tiles on your turn. Try <i>/endturn</i> when done.",
   "Try a careful search. Use <i>/roll 1d100</i> or <i>/check Spot 60</i>.",
   "Consider talking to an NPC; short questions reveal clues."
  ];
  return `A faint draft lifts the dust. ${tips[Math.floor(Math.random()*tips.length)]}
<engine>{"say":[{"speaker":"Local Clerk","role":"npc","text":"First time? Ask if you’re lost—people do."}]}</engine>`;
}
async function keeperReply(userText){
  const sys=keeperSystem(); const msgs=[{role:'system',content:sys},{role:'user',content:userText}];
  const model=state.settings.openaiModel||'gpt-4o-mini'; const key=state.settings.openaiKey;
  const maxTok = Number(state.settings.keeperMax)||450;
  try{
    let text;
    if(key){
      const res=await fetch('https://api.openai.com/v1/chat/completions',{
        method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
        body: JSON.stringify({model, messages:msgs, temperature:0.8, max_tokens:maxTok})
      });
      if(!res.ok) throw new Error(await res.text());
      const data=await res.json(); text=data.choices?.[0]?.message?.content || '…';
    }else{ text=demoKeeper(userText); }
    const narr = text.replace(/<engine>[\s\S]*<\/engine>/i,'').trim();
    if(narr) addLine(narr,'keeper',{speaker:'Keeper', role:'npc'});
    const eng=parseEngine(text); if(eng) applyEngine(eng);
    if(state.settings.ttsOn && narr) speak(stripTags(narr),'Keeper','npc');
    maybeSummarizeLocal(); // keep memory fresh without extra tokens
  }catch(err){
    addSystemMessage("The air stills… (AI call failed; offline demo).");
    const demo=demoKeeper(userText);
    const narr = demo.replace(/<engine>[\s\S]*<\/engine>/i, '').trim();
    if(narr) addLine(narr, 'keeper', { speaker: 'Keeper', role: 'npc' });
    const eng = parseEngine(demo);
    if(eng) applyEngine(eng);
  }
}

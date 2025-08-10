/* =========================================================
   SOLO INVESTIGATOR — Tutorial Solo VTT (client‑only)
   Token‑frugal, with Character Sheets + Inventory, stable chat scroll,
   asset‑full saves, auto Keeper trigger, stronger variety
   ========================================================= */

/* ---------- CONSTANTS ---------- */
const LS_SETTINGS = 'si_settings_v8';
const LS_SLOTS    = 'si_slots_v6';
const LS_WIZARD   = 'si_wizard_done_v6';
const LS_ARC_FP   = 'si_recent_arc_fps_v2';
const GRID_W = 12, GRID_H = 8;

/* Ten core investigators (as before) */
const INVESTIGATORS = [
  { archetype:"Journalist",   name:"Eleanor Shaw",             sex:"F", age:31, prompt:"1920s journalist portrait, trench coat, press badge, film-noir lighting", backstory:"Reporter chasing labor abuses to redeem a career-stalling misquote.", traits:"Observant, stubborn, empathetic." },
  { archetype:"Doctor",       name:"Thomas Greer, MD",         sex:"M", age:40, prompt:"1920s physician portrait, wireframe glasses, soft rim light", backstory:"War medic haunted by triage choices; volunteers at a charity clinic.", traits:"Calm, clinical, moral." },
  { archetype:"Professor",    name:"Miriam Kline",             sex:"F", age:37, prompt:"1920s academic portrait, tweed, library bokeh", backstory:"Folklore professor cataloging 'drowned saints' myths.", traits:"Curious, cautious, enthralled." },
  { archetype:"Detective",    name:"Silas Hart",               sex:"M", age:33, prompt:"1920s sleuth portrait, fedora, cigarette smoke", backstory:"Laid‑off Pinkerton with a code; hired off‑books to find the missing.", traits:"Dry wit, methodical, suspicious." },
  { archetype:"Occultist",    name:"Opal Reyes",               sex:"F", age:26, prompt:"1920s medium portrait, candlelight, ectoplasmic haze", backstory:"Spiritualist who lost a sibling to the unknown; drawn to thin places.", traits:"Intense, intuitive, brittle." },
  { archetype:"Photographer", name:"Beatrice “Bea” Hollis",     sex:"F", age:28, prompt:"1920s field photographer, Graflex camera, raincoat", backstory:"Stringer who captured something impossible on a glass plate.", traits:"Composed, daring, curious." },
  { archetype:"Sailor",       name:"Franklin “Finn” MacReady", sex:"M", age:35, prompt:"1920s sailor portrait, peacoat, stormy backdrop", backstory:"Knows hidden inlets; talks in his sleep—answers back, too.", traits:"Superstitious, brave, practical." },
  { archetype:"Psychiatrist", name:"Dr. Anjali Rao",            sex:"F", age:34, prompt:"1920s psychiatrist, tidy bob, notebook", backstory:"Researching mass suggestion; her mentor vanished here.", traits:"Analytical, patient, fearless." },
  { archetype:"Ex‑Priest",    name:"Father Declan Byrne",      sex:"M", age:45, prompt:"1920s clerical portrait, worn collar, hard eyes", backstory:"Left the cloth after a catastrophe; now studies apocrypha.", traits:"Grim, protective, resolute." },
  { archetype:"Radio Operator",name:"Dorothy “Dot” Pennington", sex:"F", age:24, prompt:"1920s radio operator, headphones, desk lamp glow", backstory:"Intercepted a coded transmission about 'the Chapel Below'.", traits:"Wry, quick, technical." }
];

/* Demo arcs (varied) */
const DEMO_ARCS = [
  {
    title:"Dust on the Stacks",
    logline:"At a university archive, a sealed collection keeps re-shelving itself. The cataloger who found it now speaks in someone else’s voice.",
    tone:"Scholarly dread; whispering stacks; sudden breaks of mania.",
    setting:"1926, Inland university library complex.",
    acts:[
      {name:"Act I — The Moved Books",beats:["Night staff hear reshelving in a locked room.","A call number line repeats a date that hasn't happened."]},
      {name:"Act II — The Deed Box",beats:["A sealed donor box smells like ozone.","A marginalia cipher points to an off‑limits sub‑basement."]},
      {name:"Act III — The Reading",beats:["An index card tray forms a sigil.","Stop a reading that writes itself into the audience."]}
    ],
    imagePrompts:[
      "Dusty archive stacks at night, beams of light, painterly, cinematic",
      "Sub-basement with pipes and index card cabinets, moody chiaroscuro",
      "Reading room with scattered papers and an ozone glow, 1920s"
    ],
    pcOptions: INVESTIGATORS,
    npcs:["Head Librarian with ink-stained fingers","Night Watchman who forgets his own name","Graduate Assistant with shaking hands","Archivist with a bandaged ear"]
  },
  {
    title:"Salt Less Taken",
    logline:"A mountain mining town reports echoes that answer back. The last surveyor’s maps keep changing when no one looks.",
    tone:"Lonely alpine dread; rumbling earth; lamps flicker in gusts.",
    setting:"1927, Mountain mining town and shafts.",
    acts:[
      {name:"Act I — The Second Echo",beats:["A voice repeats questions in the tunnels—wrong answers.","A drift wall is warm to the touch."]},
      {name:"Act II — Collapse of Names",beats:["Census records swap surnames overnight.","A surveyor’s map shows a tunnel that doesn’t exist—yet."]},
      {name:"Act III — The Hollow Men",beats:["Miners accuse each other of being 'wrong copies'.","A cavern roof pulses like a lung."]}
    ],
    imagePrompts:[
      "1920s mountain mine adit, lantern light, dust motes, painterly",
      "Town census office with scattered ledgers, twilight through window",
      "Large cavern with timber supports, unsettling organic textures"
    ],
    pcOptions: INVESTIGATORS,
    npcs:["Foreman with a crushed hat","Nurse running a tiny clinic","Geology professor on sabbatical","Local preacher who refuses to ring the bell"]
  },
  {
    title:"Mirrors for a Carnival",
    logline:"A travelling fair’s mirror maze shows late arrivals in the reflections. Someone’s collecting the wrong versions.",
    tone:"Gaudy lights; cheerful music detuned; sudden silence.",
    setting:"1925, Rural fairground off a dirt road.",
    acts:[
      {name:"Act I — Tickets at Twilight",beats:["Photographs show extra faces.","A mirror cart is heavier than it should be."]},
      {name:"Act II — The Owner’s Ledger",beats:["Payments to names nobody recognizes.","A cracked mirror whispers in daylight."]},
      {name:"Act III — The Hall of Others",beats:["Reflections lag by minutes.","Something steps out of the wrong pane."]}
    ],
    imagePrompts:[
      "1920s carnival midway at dusk, string lights, painterly",
      "Old ledger and ticket stubs on a wooden desk, moody",
      "Mirror maze interior with warped reflections, eerie"
    ],
    pcOptions: INVESTIGATORS,
    npcs:["Ringmaster with a velvet voice","Fortune-teller who looks past you","Mechanic with mercury stains","Deputy uneasy around mirrors"]
  },
  {
    title:"White Silence",
    logline:"An arctic outpost logs radio messages from a station that never existed. The snow remembers footprints.",
    tone:"White-out isolation; radio hiss; restrained panic.",
    setting:"1928, Arctic research camp.",
    acts:[
      {name:"Act I — The Station on 6.3 MHz",beats:["Morse code contains a plea for help from 'Station K‑Null'.","Maps of the pack ice misalign hours apart."]},
      {name:"Act II — The Memory Snow",beats:["Footprints persist despite wind—until they start walking again.","A missing researcher returns with blank eyes."]},
      {name:"Act III — Below the Drift",beats:["An ice cave hums in a human cadence.","Shut down the transmitter no one brought."]}
    ],
    imagePrompts:[
      "1920s arctic camp, radio mast in snow, painterly",
      "Ice cave with blue light and rope, cinematic",
      "Snowfield with repeating footprints, eerie minimal"
    ],
    pcOptions: INVESTIGATORS,
    npcs:["Radio tech with frostbitten ears","Pilot grounded by weather","Meteorologist who refuses to sleep","Surgeon counting backwards in Russian"]
  }
];

const RANDOM_OMENS = [
  "A distant scream echoes, then cuts off.",
  "A chill wind carries the scent of brine.",
  "Somewhere nearby, a door slams though none are open."
];

/* ---------- STATE ---------- */
function newScene(name){
  return { id:'scn_'+Math.random().toString(36).slice(2,8), name:name||'Untitled Scene',
    bg:'', tokens:[], fog:makeFog(GRID_W,GRID_H,true), fogUndo:[] };
}
function makeFog(w,h,hidden){ const f=[]; for(let y=0;y<h;y++){const row=[]; for(let x=0;x<w;x++) row.push(!!hidden); f.push(row)} return f; }

const state = {
  settings:{
    openaiKey:'', openaiModel:'gpt-4o-mini', keeperOn:true,
    useImages:false, imageModel:'dall-e-3',
    ttsOn:false, ttsQueue:true, ttsProviderDefault:'browser',
    elevenKey:'', voiceId:'',
    rulesPack:'',
    keeperTrigger:'auto',
    keeperStyle:'normal',
    keeperMax:450,
    voiceMap:{} // { name: {provider:'browser'|'eleven'|'none', id:'VoiceNameOrId'} }
  },
  campaign:null,
  npcCatalog:[],
  youPCId:null,
  sceneIndex:0,
  scenes:[newScene('Intro')],
  chat:[],
  initOrder:[],
  activeTurn:0,
  encounter:{on:false, movesLeft:0, actionsLeft:0, bonusLeft:0},
  browserVoices:[],
  memory:'', // local summary to keep prompts small (no extra tokens)
  aiThinking:false // prevent concurrent AI calls
};
function currentScene(){ return state.scenes[state.sceneIndex]; }

/* ---------- UI HELPERS ---------- */
const byId=id=>document.getElementById(id);
function el(tag,attrs={},children=[]){ const e=document.createElement(tag);
  for(const k in attrs){ if(k==='class') e.className=attrs[k]; else if(k==='html') e.innerHTML=attrs[k]; else if(k==='onclick') e.onclick=attrs[k]; else e.setAttribute(k,attrs[k]); }
  if(!Array.isArray(children)) children=[children];
  children.filter(Boolean).forEach(c=> e.appendChild(typeof c==='string'? document.createTextNode(c): c));
  return e;
}
function toast(msg){ const t=byId('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function stripTags(s){ const d=document.createElement('div'); d.innerHTML=s||''; return d.textContent||d.innerText||''; }
function clamp(v,a,b){ return Math.max(a, Math.min(b,v)); }
function deepClone(o){ return JSON.parse(JSON.stringify(o)); }

/* ---------- PERSISTENCE ---------- */
function saveSettings(){ localStorage.setItem(LS_SETTINGS, JSON.stringify(state.settings)); toast('Settings saved'); }
function loadSettings(){
  const raw=localStorage.getItem(LS_SETTINGS); if(raw){ try{ Object.assign(state.settings, JSON.parse(raw)); }catch{} }
  byId('openaiKey').value = state.settings.openaiKey;
  byId('openaiModel').value = state.settings.openaiModel;
  byId('keeperOn').checked = state.settings.keeperOn;
  byId('useImages').checked = state.settings.useImages;
  byId('imageModel').value = state.settings.imageModel;
  byId('elevenKey').value = state.settings.elevenKey;
  byId('voiceId').value = state.settings.voiceId;
  byId('ttsOn').checked = state.settings.ttsOn;
  byId('ttsQueue').checked = state.settings.ttsQueue;
  byId('ttsProviderDefault').value = state.settings.ttsProviderDefault || 'browser';
  byId('rulesPack').value = state.settings.rulesPack;
  byId('keeperTrigger').value = state.settings.keeperTrigger || 'auto';
  byId('keeperStyle').value = state.settings.keeperStyle || 'normal';
  byId('keeperMax').value = state.settings.keeperMax || 450;
}

/* ---------- MAP RENDER ---------- */
const mapEl=byId('map'), bgEl=byId('mapBg'), fogCv=byId('fog'), reachCv=byId('reach');
function GRID_WPX(){ return mapEl.clientWidth }
function GRID_HPX(){ return mapEl.clientHeight }
function renderAll(){ renderSceneName(); renderBackground(); renderFog(); renderReach(); renderTokens(); renderTokenList(); renderInit(); updateSlots(); updateTurnBanner(); }
function renderSceneName(){ byId('sceneName').textContent=currentScene().name; }
function renderBackground(){ const sc=currentScene(); bgEl.style.backgroundImage=sc.bg?`url(${sc.bg})`:'none'; }
function cellStyle(x,y){ return `left:${((x+0.5)/GRID_W)*100}%; top:${((y+0.5)/GRID_H)*100}%`; }
function initials(n){ return (n||'??').split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()||'').join(''); }
function renderTokens(){
  [...mapEl.querySelectorAll('.token')].forEach(n=>n.remove());
  const sc=currentScene();
  const activeToken=getActiveToken();
  sc.tokens.forEach(t=>{
    const n=el('div',{class:`token ${t.type}`,'data-id':t.id, style:cellStyle(t.x,t.y)});
    if(activeToken && activeToken.id===t.id) n.classList.add('active-turn');
    const bubble=el('div',{class:'bubble'});
    if(t.portraitData) bubble.appendChild(el('img',{src:t.portraitData,alt:t.name}));
    else bubble.appendChild(el('div',{class:'letters'}, initials(t.name|| (t.type==='pc'?'PC':'NPC'))));
    n.appendChild(bubble);
    n.appendChild(el('div',{class:'cap'}, t.name|| (t.type==='pc'?'PC':'NPC')));
    mapEl.appendChild(n);
  });
}
function renderTokenList(){
  const list=byId('tokenList'); list.innerHTML='';
  currentScene().tokens.forEach(t=>{
    const row=el('div',{class:'row',style:'justify-content:space-between;margin:.25rem 0;align-items:center;'},
      [el('div',{}, `${t.type.toUpperCase()} • ${t.name||'Unnamed'} @ ${t.x},${t.y}`),
       el('div',{class:'row'},[
         el('button',{class:'ghost',onclick:()=> spawnFXAt(t.x,t.y)},'Ping'),
         el('button',{class:'ghost',onclick:()=> openSheet(t)},'Open Sheet'),
         el('button',{class:'ghost',onclick:()=> editTokenPrompt(t)},'Edit'),
         el('button',{class:'danger',onclick:()=> removeToken(t.id)},'Remove')
       ])]);
    list.appendChild(row);
  });
}

/* ---------- FOG ---------- */
function pxToGrid(px,py){ return [Math.floor((px/GRID_WPX())*GRID_W), Math.floor((py/GRID_HPX())*GRID_H)]; }
function renderFog(){ const cv=fogCv, sc=currentScene(), ctx=cv.getContext('2d'); cv.width=GRID_WPX(); cv.height=GRID_HPX(); ctx.clearRect(0,0,cv.width,cv.height);
  const cw=cv.width/GRID_W, ch=cv.height/GRID_H; ctx.fillStyle='rgba(4,6,10,.82)';
  for(let y=0;y<GRID_H;y++) for(let x=0;x<GRID_W;x++) if(sc.fog[y][x]) ctx.fillRect(Math.floor(x*cw),Math.floor(y*ch),Math.ceil(cw),Math.ceil(ch));
}
function fogStroke(gx,gy,hide){ const sc=currentScene(), before=deepClone(sc.fog), r=Number(byId('brush').value||2);
  for(let y=-r;y<=r;y++) for(let x=-r;x<=r;x++){ const ix=gx+x,iy=gy+y; if(ix<0||iy<0||ix>=GRID_W||iy>=GRID_H) continue; sc.fog[iy][ix]=!!hide; }
  sc.fogUndo.push(before); if(sc.fogUndo.length>50) sc.fogUndo.shift(); renderFog();
}
function fogUndo(){ const sc=currentScene(); const last=sc.fogUndo.pop(); if(last){ sc.fog=last; renderFog(); } }
function fogAll(flag){ const sc=currentScene(); for(let y=0;y<GRID_H;y++) for(let x=0;x<GRID_W;x++) sc.fog[y][x]=!!flag; renderFog(); }

/* ---------- REACHABLE / MOVEMENT ---------- */
const reachCvCtx = reachCv.getContext('2d');
function renderReach(){
  const cv=reachCv, ctx=reachCvCtx; cv.width=GRID_WPX(); cv.height=GRID_HPX(); ctx.clearRect(0,0,cv.width,cv.height);
  if(!state.encounter.on) return;
  const active=getActiveToken(); if(!active) return;
  const cw=cv.width/GRID_W, ch=cv.height/GRID_H;
  ctx.fillStyle='rgba(122,162,255,.18)'; ctx.strokeStyle='rgba(122,162,255,.35)';
  for(let y=0;y<GRID_H;y++) for(let x=0;x<GRID_W;x++){
    const d=chebyshev(active.x,active.y,x,y);
    if(d<=state.encounter.movesLeft){
      ctx.fillRect(Math.floor(x*cw),Math.floor(y*ch),Math.ceil(cw),Math.ceil(ch));
      ctx.strokeRect(Math.floor(x*cw),Math.floor(y*ch),Math.ceil(cw),Math.ceil(ch));
    }
  }
}
function chebyshev(ax,ay,bx,by){ return Math.max(Math.abs(ax-bx),Math.abs(ay-by)); }
function canMoveTo(t,gx,gy,orig){
  if(!state.encounter.on) return {ok:true,to:{x:clamp(gx,0,GRID_W-1),y:clamp(gy,0,GRID_H-1)}};
  // During an encounter, only the player's token can be dragged. AI moves are programmatic.
  if(t.id !== state.youPCId) return {ok:false,to:{x:t.x,y:t.y}};
  const d=chebyshev(orig.x,orig.y,gx,gy); if(d>state.encounter.movesLeft) return {ok:false,to:{x:t.x,y:t.y}};
  return {ok:true,to:{x:clamp(gx,0,GRID_W-1),y:clamp(gy,0,GRID_H-1)}};
}

/* ---------- POINTER TOOLS ---------- */
let tool='select'; let brush=2; let measureEl=null; let pointer={down:false,start:[0,0],cur:[0,0]}, draggingToken=null, dragOrig=null;
mapEl.addEventListener('pointerdown',(e)=>{
  const rect=mapEl.getBoundingClientRect(); pointer.down=true; pointer.start=[e.clientX-rect.left, e.clientY-rect.top]; pointer.cur=pointer.start.slice();
  const [gx,gy]=pxToGrid(pointer.start[0], pointer.start[1]);
  if(tool==='select'){ const t=tokenAt(gx,gy); if(t){ draggingToken=t; dragOrig={x:t.x,y:t.y}; } }
  else if(tool==='ruler'){ startMeasure(pointer.start); }
  else if(tool==='reveal' || tool==='hide'){ fogStroke(gx,gy, tool==='hide'); }
});
mapEl.addEventListener('pointermove',(e)=>{
  if(!pointer.down) return;
  const rect=mapEl.getBoundingClientRect(); pointer.cur=[e.clientX-rect.left, e.clientY-rect.top];
  const [gx,gy]=pxToGrid(pointer.cur[0], pointer.cur[1]);
  if(tool==='select' && draggingToken){ const can=canMoveTo(draggingToken,gx,gy,dragOrig); if(can.ok){ draggingToken.x=can.to.x; draggingToken.y=can.to.y; renderTokens(); renderReach(); } }
  else if(tool==='ruler'){ updateMeasure(pointer.start,pointer.cur); }
  else if(tool==='reveal' || tool==='hide'){ fogStroke(gx,gy, tool==='hide'); }
});
mapEl.addEventListener('pointerup', ()=>{
  pointer.down=false;
  if(draggingToken && state.encounter.on){
    const d=chebyshev(dragOrig.x,dragOrig.y, draggingToken.x, draggingToken.y);
    if(!isActiveToken(draggingToken) || d>state.encounter.movesLeft){ draggingToken.x=dragOrig.x; draggingToken.y=dragOrig.y; renderTokens(); }
    else{ state.encounter.movesLeft -= d; renderReach(); updateTurnBanner(); }
  }
  draggingToken=null; dragOrig=null; endMeasure();
});
window.addEventListener('resize', ()=>{ renderFog(); renderReach(); });

function tokenAt(gx,gy){ return currentScene().tokens.find(t=>t.x===gx && t.y===gy); }
function startMeasure(start){ if(measureEl) measureEl.remove(); measureEl=el('div',{class:'measure'}); measureEl.appendChild(el('div',{class:'label'})); mapEl.appendChild(measureEl); updateMeasure(start,start); }
function updateMeasure(a,b){ if(!measureEl) return; const dx=b[0]-a[0], dy=b[1]-a[1], dist=Math.hypot(dx,dy), ang=Math.atan2(dy,dx)*180/Math.PI; Object.assign(measureEl.style,{left:`${a[0]}px`,top:`${a[1]}px`,width:`${dist}px`,transform:`rotate(${ang}deg)`}); measureEl.querySelector('.label').textContent=`${gridDistance(a,b)} u`; }
function endMeasure(){ if(measureEl){ measureEl.remove(); measureEl=null; } }
function gridDistance(a,b){ const [ax,ay]=pxToGrid(a[0],a[1]), [bx,by]=pxToGrid(b[0],b[1]); return Math.max(Math.abs(ax-bx),Math.abs(ay-by)); }

/* ---------- TOKENS ---------- */
function addToken(t){ const sc=currentScene(); t.id=t.id||('t_'+Math.random().toString(36).slice(2,8)); t.x=clamp(t.x ?? 1,0,GRID_W-1); t.y=clamp(t.y ?? 1,0,GRID_H-1); t.type=t.type||'pc'; t.speed=t.speed ?? 4; t.sheet = t.sheet||defaultSheet(t); sc.tokens.push(t); renderTokens(); renderTokenList(); }
function removeToken(id){ const sc=currentScene(); sc.tokens=sc.tokens.filter(x=>x.id!==id); renderTokens(); renderTokenList(); renderReach(); }
function editTokenPrompt(t){ const name=prompt('Name:', t.name||''); if(name===null) return; const type=prompt('Type (pc|npc):', t.type||'pc'); if(type===null) return; t.name=name.trim(); t.type=(type==='npc')?'npc':'pc'; renderTokens(); renderTokenList(); }

/* ---------- INITIATIVE & TURN MANAGEMENT ---------- */
function isAI(tokenId){
  if(!tokenId) return false;
  return tokenId !== state.youPCId;
}

function rollAllInit(){
  const order = currentScene().tokens.map(t=>({
    id:t.id,
    name:t.name||t.id,
    roll:(Math.floor(Math.random()*20)+1)+(t.sheet?.attrs?.Nerve||0)
  }));
  order.sort((a,b)=>b.roll-a.roll);
  state.initOrder=order;
  state.activeTurn=0;
  renderInit();
  updateTurnBanner();
}

function renderInit(){
  const ol=byId('initList');
  ol.innerHTML='';
  state.initOrder.forEach((e,i)=>{
    const item=el('li',{}, `${state.activeTurn===i?'➡️ ':''}${e.name} — ${e.roll}`);
    if(state.aiThinking && state.activeTurn===i && isAI(e.id)){
      item.appendChild(el('span',{class:'thinking-indicator'}));
    }
    ol.appendChild(item);
  });
  renderTokens();
}

function advanceTurn(){
  if(!state.initOrder.length) return;
  state.activeTurn=(state.activeTurn+1)%state.initOrder.length;
  resetTurnBudget();
  renderInit();
  renderReach();
  updateTurnBanner();
  processTurn();
}

function processTurn(){
  if(!state.encounter.on || state.aiThinking || !state.initOrder.length) return;
  const activeToken=getActiveToken();
  if(!activeToken) return;
  if(isAI(activeToken.id)){
    setTimeout(()=>executeAITurn(activeToken),1500);
  }else{
    toast(`It's your turn, ${activeToken.name}!`);
  }
}

function clearInit(){ state.initOrder=[]; state.activeTurn=0; renderInit(); renderReach(); updateTurnBanner(); }

function startEncounter(){
  if(state.encounter.on){ toast('Encounter already in progress.'); return; }
  state.encounter.on=true;
  if(!state.initOrder.length) rollAllInit();
  resetTurnBudget();
  renderReach();
  updateTurnBanner();
  toast('Encounter started');
  processTurn();
}

function endEncounter(){
  state.encounter.on=false;
  state.aiThinking=false;
  renderReach();
  updateTurnBanner();
  renderInit();
  toast('Encounter ended');
}

function endTurn(){
  if(!state.encounter.on){ toast('Not in encounter'); return; }
  const active=getActiveToken();
  if(active && active.id===state.youPCId){
    advanceTurn();
  }else{
    toast('It is not your turn.');
  }
}

function isActiveToken(t){ const activeEntry=state.initOrder[state.activeTurn]; return activeEntry && t.id===activeEntry.id; }
function getActiveToken(){ const activeEntry=state.initOrder[state.activeTurn]; if(!activeEntry) return null; return currentScene().tokens.find(t=>t.id===activeEntry.id); }

function resetTurnBudget(){
  const t=getActiveToken();
  if(!t) return;
  const mov=t?.sheet?.speed || 8;
  state.encounter.movesLeft=Math.floor(mov/2);
  state.encounter.actionsLeft=1;
  state.encounter.bonusLeft=1;
}

function updateTurnBanner(){
  if(!state.encounter.on){ byId('turnInfo').textContent='Free exploration'; return; }
  const t=getActiveToken();
  if(!t){ byId('turnInfo').textContent='Encounter (no active)'; return; }
  let turnText=`Turn: ${t.name}`;
  if(isAI(t.id)){
    turnText+= state.aiThinking ? ' (Thinking...)' : ' (AI)';
  }else{
    turnText+=` (You) — Moves: ${state.encounter.movesLeft}, Actions: ${state.encounter.actionsLeft}, Bonus: ${state.encounter.bonusLeft}`;
  }
  byId('turnInfo').textContent=turnText;
}

/* ---------- CHAT & AVATARS ---------- */
const chatLog=byId('chatLog');
byId('cmdInsert').onclick=()=>{
  const v=byId('cmdPicker').value; if(!v) return;
  const input=byId('chatInput'); if(input.value && !/^\s/.test(input.value)) input.value+=' ';
  input.value += v; input.focus();
};
function addLine(text, who='you', opts={}){
  const line = el('div',{class:`line ${who}`});
  const content = el('div',{class:'content'});
  if(who==='you'){ content.textContent=text; } else { content.innerHTML=text; }

  if(who==='keeper'){
    const whoEl = el('div',{class:'who'}, `👁️ ${opts.speaker||'Keeper'}`);
    line.appendChild(whoEl);
    line.appendChild(content);
  }else{
    const youToken=currentScene().tokens.find(t=> t.id===state.youPCId);
    const name=opts.speaker || youToken?.name || 'You';
    const av=el('div',{class:'avatar'});
    av.appendChild(el('img',{src:speakerAvatar(name), alt:name}));
    const whoEl=el('div',{class:'who'}, name);
    line.appendChild(av); line.appendChild(whoEl); line.appendChild(content);
  }

  const controls = el('div',{class:'controls'});
  if((who==='keeper' || opts.replayable) && state.settings.ttsOn){
    const btn=el('button',{class:'ghost',title:'Replay voice',onclick:async()=>{ await speak(stripTags(text), opts.speaker||'Keeper', opts.role || (who==='keeper'?'npc':'pc')); }},'▶');
    controls.appendChild(btn);
  }
  if(controls.childNodes.length) line.appendChild(controls);
  chatLog.appendChild(line); chatLog.scrollTop=chatLog.scrollHeight;
}
function addSay(speaker, text, role='pc'){
  const line=el('div',{class:'line'});
  const av=el('div',{class:'avatar'});
  const img=el('img',{src: speakerAvatar(speaker), alt:speaker});
  av.appendChild(img);
  const whoEl=el('div',{class:'who'}, speaker);
  whoEl.style.color = role==='npc' ? '#e3b9ff' : '#b2ffda';
  const content=el('div',{class:'content'}, text);
  const controls=el('div',{class:'controls'});
  if(state.settings.ttsOn){ controls.appendChild(el('button',{class:'ghost',title:'Replay voice',onclick:()=> speak(stripTags(text), speaker, role)},'▶')); }
  line.appendChild(av); line.appendChild(whoEl); line.appendChild(content); line.appendChild(controls);
  chatLog.appendChild(line); chatLog.scrollTop=chatLog.scrollHeight;
}

function addActionLine(text){
  const line=el('div',{class:'line action'}, text);
  chatLog.appendChild(line);
  chatLog.scrollTop=chatLog.scrollHeight;
}

function addSystemMessage(text){
  const line=el('div',{class:'line system'}, [
    el('div',{class:'who'}, '⚠️ System'),
    el('div',{class:'content', html:text})
  ]);
  chatLog.appendChild(line);
  chatLog.scrollTop=chatLog.scrollHeight;
}

function addWhisper(target, text){
  const line=el('div',{class:'line whisper'},[
    el('div',{class:'who'}, `Whisper to ${target}`),
    el('div',{class:'content'}, text)
  ]);
  chatLog.appendChild(line);
  chatLog.scrollTop=chatLog.scrollHeight;
}
function speakerAvatar(name){
  const t=currentScene().tokens.find(x=> (x.name||'').toLowerCase()===name.toLowerCase());
  if(t?.portraitData) return t.portraitData;
  const np=(state.campaign?.npcPortraits||[]).find(p=> (p.name||p.role||'').toLowerCase()===name.toLowerCase());
  if(np?.portraitData) return np.portraitData;
  const cv=document.createElement('canvas'); cv.width=64; cv.height=64; const ctx=cv.getContext('2d'); ctx.fillStyle='#0e1524'; ctx.fillRect(0,0,64,64);
  ctx.fillStyle='#9fb4ff'; ctx.font='bold 20px ui-monospace,monospace'; const inis=(name||'??').split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()||'').join(''); ctx.fillText(inis, 12, 38);
  return cv.toDataURL('image/png');
}

byId('chatSend').onclick=sendChat;
byId('chatInput').addEventListener('keydown',e=>{ if(e.key==='Enter') sendChat(); });
byId('btnStopVoice').onclick=()=> stopVoice(true);
byId('btnAskKeeper').onclick=()=> askKeeperFromInput();
function askKeeperFromInput(){
  const input=byId('chatInput'); const val=input.value.trim(); if(!val) return;
  addLine(val,'you');
  keeperReply(val);
  input.value='';
}
function sendChat(){ const val=byId('chatInput').value.trim(); if(!val) return; byId('chatInput').value=''; addLine(val,'you');
  if(val.startsWith('/')){ runSlash(val); return; }
  if(!state.settings.keeperOn) return;
  if((state.settings.keeperTrigger||'auto')==='auto'){ keeperReply(val); }
}

/* ---------- SLASH ---------- */
function runSlash(val){
  const ck=val.match(/^\/check\s+([A-Za-z][A-Za-z0-9 _-]*)\s+(\d{1,3})$/i);
  if(ck){ const skill=ck[1].trim(); const base=clamp(Number(ck[2]),1,99); const r = rollPercentile(skill, base); addSystemMessage(r.text); return; }

  const kv=val.match(/^\/keeper\s+(.+)/i);
  if(kv){ keeperReply(kv[1]); return; }

  const m=val.match(/^\/roll\s+(.+)$/i); if(m){ doRoll(m[1], {who:'you'}); return; }
  const mv=val.match(/^\/move\s+(.+)\s+to\s+(\d+)\s*,\s*(\d+)$/i);
  if(mv){ const nameOrId=mv[1].trim(); const t=currentScene().tokens.find(x=> x.id===nameOrId || (x.name||'').toLowerCase()===nameOrId.toLowerCase()); if(!t){ addSystemMessage("No such token."); return; } tryMoveCommand(t, Number(mv[2]), Number(mv[3])); return; }
  if(/^\/endturn/i.test(val)){ endTurn(); return; }
  if(/^\/help/i.test(val)){ addSystemMessage("Commands: /roll NdM±K, /check Skill 60, /keeper question, /move [name] to x,y, /endturn."); return; }
  addSystemMessage("Unknown command. Try /help.");
}
function tryMoveCommand(t,gx,gy,isProgrammatic=false){
  const orig={x:t.x,y:t.y};

  if(state.encounter.on && !isProgrammatic){
    const can=canMoveTo(t,gx,gy,orig);
    if(!can.ok){ addSystemMessage(`Can’t move ${t.name} there right now.`); return; }
    t.x=can.to.x; t.y=can.to.y;
    const moved=chebyshev(orig.x,orig.y,t.x,t.y);
    state.encounter.movesLeft=Math.max(0,state.encounter.movesLeft-moved);
  }else if(state.encounter.on && isProgrammatic){
    const dist=chebyshev(orig.x,orig.y,gx,gy);
    if(dist>state.encounter.movesLeft){
      addActionLine(`* ${t.name} tries to move to ${gx},${gy} but lacks the movement. *`);
      return;
    }
    t.x=clamp(gx,0,GRID_W-1); t.y=clamp(gy,0,GRID_H-1);
    const moved=chebyshev(orig.x,orig.y,t.x,t.y);
    state.encounter.movesLeft=Math.max(0,state.encounter.movesLeft-moved);
    addActionLine(`* ${t.name} moves to ${t.x},${t.y}. *`);
  }else{
    t.x=clamp(gx,0,GRID_W-1); t.y=clamp(gy,0,GRID_H-1);
  }

  renderTokens();
  renderReach();
  updateTurnBanner();
  if(!isProgrammatic) spawnFXAt(t.x,t.y);
}

/* ---------- SIMPLE DICE (chat-only) ---------- */
function doRoll(expr, opts={}){
  const p=expr.trim().toLowerCase().replace(/^d/,'1d');
  const m=p.match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if(!m){ addSystemMessage(`Bad roll: ${expr}`); return; }
  const n=Number(m[1]), sides=Number(m[2]), mod=Number(m[3]||0);
  if(n<1 || sides<1 || n>100 || sides>1000){ addSystemMessage('Roll too large.'); return; }
  const rolls=[];
  for(let i=0;i<n;i++) rolls.push(1+Math.floor(Math.random()*sides));
  const sum=rolls.reduce((a,b)=>a+b,0)+mod;
  const label = opts.note ? ` (${opts.note})` : '';
  const line = `Roll ${n}d${sides}${mod?(mod>0?`+${mod}`:mod):''}${label} → ${sum} [${rolls.join(', ')}]`;
  addSystemMessage(line);
  return {n,sides,mod,rolls,sum};
}

/* Percentile check with tiers */
function rollPercentile(skillName, skillVal){
  const roll = 1+Math.floor(Math.random()*100);
  const hard = Math.floor(skillVal/2), extreme = Math.max(1,Math.floor(skillVal/5));
  let tier = (roll<=extreme) ? 'Extreme Success' : (roll<=hard) ? 'Hard Success' : (roll<=skillVal) ? 'Success' : 'Failure';
  if(roll===1) tier='Critical Success';
  if(roll===100) tier='Fumble';
  const text = `Check ${skillName} ${skillVal}: d100 → ${roll} → <b>${tier}</b>`;
  return {roll, tier, text};
}

/* ---------- PARTICLES ---------- */
function spawnFXAt(gx,gy){ const box=mapEl.getBoundingClientRect(), cx=(gx+0.5)/GRID_W*box.width, cy=(gy+0.5)/GRID_H*box.height;
  for(let i=0;i<12;i++){ const d=el('div',{class:'fx'}); const ang=Math.random()*2*Math.PI, dist=8+Math.random()*28; const x=cx+Math.cos(ang)*dist,y=cy+Math.sin(ang)*dist;
    Object.assign(d.style,{position:'absolute',left:`${x}px`,top:`${y}px`,width:'4px',height:'4px',background:'#a7c2ff',borderRadius:'50%'}); mapEl.appendChild(d); setTimeout(()=>d.remove(), 400+Math.random()*400); } }

/* ---------- CONTROLS ---------- */
byId('btnSettings').onclick=()=> show('#modalSettings');
byId('btnWizard').onclick  =()=> startWizard(true);
byId('btnScenes').onclick  =()=> { updateSceneList(); show('#modalScenes'); };
byId('btnParty').onclick   =()=> { renderParty(); show('#modalParty'); };
byId('btnNPCs').onclick    =()=> { renderNPCs(); show('#modalNPCs'); };
byId('btnHandouts').onclick=()=> { renderHandouts(); show('#modalHandouts'); };
byId('btnClues').onclick   =()=> { renderClues(); show('#modalClues'); };
byId('btnSaveLoad').onclick=()=> { updateSlots(); show('#modalSave'); };

byId('btnSaveSettings').onclick=()=>{
  state.settings.openaiKey=byId('openaiKey').value.trim();
  state.settings.openaiModel=byId('openaiModel').value;
  state.settings.keeperOn=byId('keeperOn').checked;
  state.settings.useImages=byId('useImages').checked;
  state.settings.imageModel=byId('imageModel').value;
  state.settings.elevenKey=byId('elevenKey').value.trim();
  state.settings.voiceId=byId('voiceId').value.trim();
  state.settings.ttsOn=byId('ttsOn').checked;
  state.settings.ttsQueue=byId('ttsQueue').checked;
  state.settings.ttsProviderDefault=byId('ttsProviderDefault').value;
  state.settings.rulesPack=byId('rulesPack').value;
  state.settings.keeperTrigger=byId('keeperTrigger').value;
  state.settings.keeperStyle=byId('keeperStyle').value;
  state.settings.keeperMax=Number(byId('keeperMax').value)||450;
  saveSettings(); hide('#modalSettings');
};

byId('btnRevealAll').onclick=()=> fogAll(false);
byId('btnHideAll').onclick=()=> fogAll(true);
byId('btnUndo').onclick=fogUndo;
byId('btnParticles').onclick=()=> spawnFXAt(Math.floor(GRID_W/2),Math.floor(GRID_H/2));
byId('btnGenBG').onclick=genBGQuick;
byId('btnOmen').onclick=()=>{
  const omen=RANDOM_OMENS[Math.floor(Math.random()*RANDOM_OMENS.length)];
  addLine(omen,'keeper',{speaker:'Keeper',role:'npc'});
};
byId('btnNewScene').onclick=()=> addScene(prompt('Scene name?','New Scene')||'New Scene');
byId('btnSwitchScene').onclick=()=> { updateSceneList(); show('#modalScenes'); };
byId('btnStartEncounter').onclick=startEncounter;
byId('btnEndTurn').onclick=endTurn;
byId('btnEndEncounter').onclick=endEncounter;
byId('btnCenter').onclick = centerTokens;

function centerTokens(){
  const sc = currentScene();
  const pcs  = sc.tokens.filter(t=>t.type==='pc');
  const npcs = sc.tokens.filter(t=>t.type!=='pc');
  pcs.forEach((t,i)=>{ t.x = Math.round(((i+1)/(pcs.length+1))*(GRID_W-1)); t.y = GRID_H - 1; });
  npcs.forEach((t,i)=>{ t.x = Math.round(((i+1)/(npcs.length+1))*(GRID_W-1)); t.y = 0; });
  renderTokens(); renderReach(); spawnFXAt(Math.floor(GRID_W/2), Math.floor(GRID_H/2)); toast('Tokens centered');
}

/* Scenes modal */
byId('btnSetBG').onclick=()=>{ const d=byId('sceneBgData').value.trim(); if(!d) return; currentScene().bg=d; renderBackground(); toast('Background set'); };
byId('btnGenBG2').onclick=async()=>{ const p=byId('bgPrompt').value.trim()||'moody archive'; await generateBackground(p); };
byId('btnAddScene').onclick=()=> addScene(byId('sceneTitle').value.trim()||'New Scene');
byId('btnSwitchScene2').onclick=()=> { const idx=Number(prompt('Switch to scene index (0..N-1)?', String(state.sceneIndex)))||0; switchScene(idx); hide('#modalScenes'); };
function addScene(name){ state.scenes.push(newScene(name||'New Scene')); updateSceneList(); toast('Scene added'); }
function switchScene(idx){ if(idx<0||idx>=state.scenes.length) return; state.sceneIndex=idx; renderAll(); toast('Switched scene'); }
function updateSceneList(){ const wrap=byId('sceneList'); wrap.innerHTML=''; state.scenes.forEach((s,i)=> wrap.appendChild(el('div',{class:'row',style:'justify-content:space-between;align-items:center;margin:.25rem 0;'},
  [el('div',{class:'meta small'},[el('div',{html:`<b>${escapeHtml(s.name)}</b>`}), el('div',{class:'ts'},[`ID: ${s.id}`])]), el('button',{class:'ghost',onclick:()=> switchScene(i)},'Switch')] ))); }

/* Party modal (+ voice & sheet controls) */
function renderParty(){
  const wrap=byId('partyList'); wrap.innerHTML='';
  currentScene().tokens.filter(t=>t.type==='pc').forEach(t=> wrap.appendChild(pcEditorRow(t)));
}
function pcEditorRow(t){
  const row=el('div',{class:'card',style:'margin:.3rem 0;'});
  row.appendChild(el('div',{html:`<b>${escapeHtml(t.name||'Unnamed')}</b> — ${escapeHtml(t.sheet?.archetype||'Investigator')} @ ${t.x},${t.y}`}));
  const ctrls=el('div',{class:'row',style:'margin-top:.35rem'});
  ctrls.appendChild(el('button',{class:'ghost',onclick:async()=>{ await genPortraitFor(t); renderParty(); }},'Portrait'));
  ctrls.appendChild(el('button',{class:'ghost',onclick:()=> openSheet(t)},'Open Sheet'));
  ctrls.appendChild(el('button',{class:'ghost',onclick:()=>{ const n=prompt('Rename',t.name||''); if(n!==null){ t.name=n; renderTokens(); renderParty(); }}},'Rename'));
  ctrls.appendChild(el('button',{class:'danger',onclick:()=>{ removeToken(t.id); renderParty(); }},'Remove'));
  row.appendChild(ctrls);

  // Voice controls for this PC
  row.appendChild(voiceControlsForName(t.name||'PC'));
  return row;
}
function voiceControlsForName(actor){
  if(typeof actor==='string') actor={name:actor};
  const name=actor.name;
  const parts=[]; const sex=actor.sex==='M'?'Male':(actor.sex==='F'?'Female':actor.sex); if(sex) parts.push(sex); if(actor.age) parts.push(actor.age);
  const label = parts.length? `${name} (${parts.join(', ')})` : name;

  const wrap=el('div',{class:'row',style:'margin-top:.35rem;align-items:center;flex-wrap:wrap'});
  wrap.appendChild(el('div',{class:'small',style:'min-width:12rem'},label));
  wrap.appendChild(el('div',{class:'small'},'Voice:'));
  const provSel=el('select',{}); ['browser','eleven','none'].forEach(p=> provSel.appendChild(el('option',{value:p, selected:(state.settings.voiceMap?.[name]?.provider || state.settings.ttsProviderDefault || 'browser')===p}, p)));
  const voiceSel=el('select',{}); // browser voices
  const voiceInp=el('input',{placeholder:'ElevenLabs Voice ID'}); // eleven
  const role = actor.type || (name==='Keeper'?'npc':'pc');
  const testBtn=el('button',{class:'ghost',onclick:()=> speak(`It is I, ${name}.`, name, role)},'Test');

  // fill browser voices
  const chosenId = state.settings.voiceMap?.[name]?.id || '';
  (state.browserVoices||[]).forEach(v=> voiceSel.appendChild(el('option',{value:v.name, selected: v.name===chosenId}, v.name)));

  function refreshVis(){ voiceSel.style.display = (provSel.value==='browser')?'inline-block':'none'; voiceInp.style.display = (provSel.value==='eleven')?'inline-block':'none'; }
  function updateMap(){
    state.settings.voiceMap[name] = {provider: provSel.value, id: (provSel.value==='browser')? voiceSel.value : (provSel.value==='eleven'? voiceInp.value.trim(): '')};
    saveSettings();
  }
  provSel.onchange=()=>{ refreshVis(); updateMap(); };
  voiceSel.onchange=updateMap;
  voiceInp.oninput=updateMap;

  // initialize inputs
  if(chosenId && provSel.value==='browser'){ voiceSel.value=chosenId; }
  if(state.settings.voiceMap?.[name]?.provider==='eleven'){ voiceInp.value=state.settings.voiceMap?.[name]?.id || ''; }
  refreshVis();

  wrap.appendChild(provSel); wrap.appendChild(voiceSel); wrap.appendChild(voiceInp); wrap.appendChild(testBtn);
  return wrap;
}
byId('btnGenParty').onclick=()=>{ const names=["Eleanor Shaw","Caleb Finch","Iris Caldwell","Thomas Greer","Miriam Kline","Walter Rourke","Opal Reyes","Jonah Pike","Vera Doyle","Silas Hart"]; for(let i=0;i<5;i++){ const n=names[Math.floor(Math.random()*names.length)]; addToken({name:n, type:'pc', x:i, y:GRID_H-1}); } renderParty(); toast('5 investigators added'); };
byId('btnAddPC').onclick=()=>{ addToken({name:prompt('Name?','New Investigator')||'Investigator', type:'pc', x:0, y:GRID_H-1}); renderParty(); };
byId('btnPortraits').onclick=async()=>{ for(const t of currentScene().tokens.filter(t=>t.type==='pc')) await genPortraitFor(t); renderParty(); };

/* NPC modal */
function renderNPCs(){ const wrap=byId('npcList'); wrap.innerHTML=''; currentScene().tokens.filter(t=>t.type==='npc').forEach(t=> wrap.appendChild(npcEditorRow(t))); }
function npcEditorRow(t){ const row=el('div',{class:'row',style:'align-items:center;justify-content:space-between;margin:.25rem 0;flex-wrap:wrap'});
  row.appendChild(el('div',{}, `${t.name||'Unnamed'} @ ${t.x},${t.y}`)); const ctrls=el('div',{class:'row'});
  ctrls.appendChild(el('button',{class:'ghost',onclick:async()=>{ await genPortraitFor(t); renderNPCs(); }},'Portrait'));
  ctrls.appendChild(el('button',{class:'ghost',onclick:()=> openSheet(t)},'Open Sheet'));
  ctrls.appendChild(el('button',{class:'ghost',onclick:()=>{ const n=prompt('Rename',t.name||''); if(n!==null){ t.name=n; renderTokens(); renderNPCs(); }}},'Rename'));
  ctrls.appendChild(el('button',{class:'danger',onclick:()=>{ removeToken(t.id); renderNPCs(); }},'Remove'));
  row.appendChild(ctrls); return row; }
byId('btnGenNPCs').onclick=()=>{ const arche=['Dockhand','Fishmonger','Librarian','Professor','Journalist','Doctor','Officer','Priest','Innkeeper','Smuggler']; for(let i=0;i<4;i++) addToken({name: arche[Math.floor(Math.random()*arche.length)]+' '+(i+1), type:'npc', x:GRID_W-1-i, y:0}); renderNPCs(); };
byId('btnAddNPC').onclick=()=>{ addToken({name:prompt('Name?','Mysterious NPC')||'Mysterious NPC', type:'npc', x:GRID_W-1, y:0}); renderNPCs(); };

/* ---------- HANDOUTS ---------- */
function renderHandouts(){
  const list=byId('handoutsList');
  list.innerHTML='';
  const h=state.campaign?.handouts||[];
  if(!h.length){
    list.innerHTML='<div class="note">No handouts yet. Click “Generate Handouts”.</div>';
    return;
  }
  h.forEach((ho,i)=>{
    const d=el('div',{class:'ho'});
    d.appendChild(el('h4',{}, `${ho.title||('Handout '+(i+1))}`));
    if(ho.imageUrl) d.appendChild(el('img',{src:ho.imageUrl,alt:ho.title||('handout'+(i+1))}));
    d.appendChild(el('div',{class:'small'}, ho.text||''));
    d.appendChild(el('button',{class:'ghost',style:'margin-top:.4rem',onclick:()=>dropHandout(i)},'Send to Chat'));
    list.appendChild(d);
  });
}

function dropHandout(idx){
  const ho = state.campaign?.handouts?.[idx];
  if(!ho) return;
  const html = `<div class="chat-handout"><strong>${escapeHtml(ho.title||'Handout')}</strong>`+
    `${ho.imageUrl?`<br><img src="${ho.imageUrl}" alt="${escapeHtml(ho.title||'handout')}">`:''}`+
    `<div class="small">${escapeHtml(ho.text||'')}</div></div>`;
  addLine(html,'keeper',{speaker:'Keeper',role:'npc'});
}
/* ---------- CLUES ---------- */
function renderClues(){
  const list=byId('clueList');
  if(!list) return;
  list.innerHTML='';
  const c=state.campaign?.clues||[];
  if(!c.length){ list.innerHTML='<div class="note">No clues yet.</div>'; return; }
  c.forEach((cl,i)=>{
    const d=el('div',{class:'clue'});
    d.appendChild(el('h4',{}, cl.title||(`Clue ${i+1}`)));
    d.appendChild(el('div',{class:'small'}, cl.text||''));
    d.appendChild(el('button',{class:'ghost',style:'margin-top:.4rem',onclick:()=>dropClue(i)},'Send to Chat'));
    list.appendChild(d);
  });
}
function dropClue(idx){
  const c=state.campaign?.clues?.[idx];
  if(!c) return;
  addSystemMessage(`<b>Clue:</b> ${escapeHtml(c.title||'')} — ${escapeHtml(c.text||'')}`);
}
byId('btnGenHandouts').onclick=()=> generateHandoutsAuto();
byId('btnAddClue').onclick=()=>{
  state.campaign=state.campaign||{};
  state.campaign.clues=state.campaign.clues||[];
  const title=byId('clueTitle').value.trim();
  const text=byId('clueText').value.trim();
  if(!title && !text) return;
  state.campaign.clues.push({title, text});
  byId('clueTitle').value=''; byId('clueText').value='';
  renderClues();
};

/* ---------- SAVE/LOAD (assets included) ---------- */
function updateSlots(){ const wrap=byId('slots'); wrap.innerHTML=''; const slots=loadSlots(); for(let i=0;i<6;i++){ const slot=slots[i]||null; const row=el('div',{class:'slot'},[
    el('div',{class:'meta'},[ el('div',{}, `Slot ${i+1}: ${slot? (slot.meta?.name||'Campaign'): '— empty —'}`), el('div',{class:'ts'}, slot? new Date(slot.meta?.ts||Date.now()).toLocaleString(): '') ]),
    el('div',{class:'row'},[ el('button',{class:'ghost',onclick:()=> saveToSlot(i)},'Save'), el('button',{class:'warn',onclick:()=> loadFromSlot(i)},'Load'), el('button',{class:'danger',onclick:()=> clearSlot(i)},'Clear') ])
  ]); wrap.appendChild(row);} }
function saveSlots(slots){ localStorage.setItem(LS_SLOTS, JSON.stringify(slots)); }
function loadSlots(){ const raw=localStorage.getItem(LS_SLOTS); return raw? JSON.parse(raw):[]; }
function captureChat(){
  const lines=[]; chatLog.querySelectorAll('.line').forEach(l=>{
    if(l.classList.contains('action')){ lines.push({type:'action',text:l.textContent}); return; }
    if(l.classList.contains('system')){ lines.push({type:'system',html:l.querySelector('.content')?.innerHTML||''}); return; }
    if(l.classList.contains('keeper')){
      const html=l.querySelector('.content')?.innerHTML||'';
      const speaker=(l.querySelector('.who')?.textContent||'').replace(/^👁️\s*/, '');
      lines.push({type:'keeper',html,speaker}); return;
    }
    if(l.classList.contains('you')){ lines.push({type:'you',text:l.querySelector('.content')?.textContent||''}); return; }
    const whoEl=l.querySelector('.who');
    const role=getComputedStyle(whoEl).color==='rgb(227, 185, 255)'?'npc':'pc';
    lines.push({type:'say',speaker:whoEl?.textContent||'',html:l.querySelector('.content')?.innerHTML||'',role});
  });
  return lines;
}
function restoreChat(lines){
  chatLog.innerHTML='';
  (lines||[]).forEach(l=>{
    if(l.type==='action') addActionLine(l.text);
    else if(l.type==='system') addSystemMessage(l.html);
    else if(l.type==='keeper') addLine(l.html,'keeper',{speaker:l.speaker,role:l.role||'npc'});
    else if(l.type==='you') addLine(l.text,'you');
    else if(l.type==='say') addSay(l.speaker,l.html,l.role||'pc');
  });
}
function captureState(){
  return {
    meta:{ts:Date.now(), name: currentScene().name},
    settings: state.settings,
    sceneIndex: state.sceneIndex,
    scenes: state.scenes,
    campaign: state.campaign,
    youPCId: state.youPCId,
    npcCatalog: state.npcCatalog,
    chat: captureChat(),
    initOrder: state.initOrder,
    activeTurn: state.activeTurn,
    encounter: state.encounter,
    memory: state.memory
  };
}
function applyState(data){
  Object.assign(state.settings, data.settings||{});
  state.sceneIndex=data.sceneIndex||0;
  state.scenes=data.scenes||[newScene('Recovered')];
  state.campaign=data.campaign||null;
  state.youPCId=data.youPCId||null;
  state.npcCatalog=data.npcCatalog||[];
  state.initOrder=data.initOrder||[];
  state.activeTurn=data.activeTurn||0;
  state.encounter=data.encounter||{on:false,movesLeft:0,actionsLeft:0};
  state.memory=data.memory||'';
  state.chat=data.chat||[];
  loadSettings(); renderAll();
  restoreChat(state.chat);
}
function saveToSlot(i){ const slots=loadSlots(); slots[i]=captureState(); saveSlots(slots); updateSlots(); toast('Saved.'); }
function loadFromSlot(i){ const slots=loadSlots(); if(!slots[i]){ toast('Empty slot'); return; } applyState(slots[i]); toast('Loaded.'); }
function clearSlot(i){ const slots=loadSlots(); slots[i]=null; saveSlots(slots); updateSlots(); }
byId('btnExport').onclick=()=>{ const blob=new Blob([JSON.stringify(captureState(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='solo-investigator-save.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 2000); };
byId('btnImport').onclick=()=>{ try{ const data=JSON.parse(byId('importText').value.trim()); applyState(data); toast('Imported.'); }catch{ toast('Bad JSON'); } };

/* ---------- IMAGES (Data URLs; cached) ---------- */
async function openaiImage(prompt, size='1024x1024'){
  // Return a data URL so saves keep assets; cache by prompt+model+size
  const key=state.settings.openaiKey; const use=state.settings.useImages && state.settings.imageModel!=='placeholders';
  const model=state.settings.imageModel || 'dall-e-3';
  const cacheKey = await hashKey(`img|${model}|${size}|${prompt}`);
  const cached=await idbGet('images',cacheKey); if(cached) return cached;

  if(!key || !use){
    const ph = await placeholderImage(prompt,size); await idbSet('images',cacheKey,ph); return ph;
  }
  try{
    const res=await fetch('https://api.openai.com/v1/images/generations',{ method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`}, body: JSON.stringify({model, prompt, size, response_format:'b64_json'}) });
    if(!res.ok){
      // gracefully fallback without spamming tokens next time
      const ph = await placeholderImage(prompt,size); await idbSet('images',cacheKey,ph);
      return ph;
    }
    const data=await res.json(); const b64=data.data?.[0]?.b64_json; if(!b64){ const ph=await placeholderImage(prompt,size); await idbSet('images',cacheKey,ph); return ph; }
    const dataUrl = `data:image/png;base64,${b64}`; await idbSet('images',cacheKey,dataUrl); return dataUrl;
  }catch(e){
    const ph=await placeholderImage(prompt,size); await idbSet('images',cacheKey,ph); return ph;
  }
}
async function placeholderImage(prompt,size='1024x1024'){ const [w,h]=size.split('x').map(Number); const cv=document.createElement('canvas'); cv.width=w; cv.height=h; const ctx=cv.getContext('2d');
  const g=ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,'#0d1524'); g.addColorStop(1,'#09101c'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
  ctx.globalAlpha=.1; for(let i=0;i<42;i++){ ctx.fillStyle='#7aa2ff'; const r=20+Math.random()*120; ctx.beginPath(); ctx.arc(Math.random()*w,Math.random()*h,r,0,Math.PI*2); ctx.fill(); } ctx.globalAlpha=1;
  ctx.fillStyle='#cfe1ff'; ctx.font='bold '+Math.floor(w*0.04)+'px ui-monospace,monospace'; ctx.fillText('SCENE',24,56); ctx.font=''+Math.floor(w*0.025)+'px ui-monospace,monospace'; ctx.fillText((prompt||'Moody scene').slice(0,64),24,90); return cv.toDataURL('image/png'); }
async function genBGQuick(){ await generateBackground('Gloomy archive, dramatic slant light, painterly, film grain'); }
async function generateBackground(prompt){ try{ const dataUrl=await openaiImage(prompt,'1024x1024'); currentScene().bg=dataUrl; renderBackground(); toast('Background ready'); }catch(e){ toast('Image error'); } }

/* ---------- TTS (Browser + ElevenLabs) ---------- */
let ttsQueue=[], ttsPlaying=false, currentAudio=null, currentUrl=null;
function providerFor(speaker, role='pc'){
  const m = state.settings.voiceMap?.[speaker] || (role==='npc' ? state.settings.voiceMap?.npc : null);
  return m?.provider || state.settings.ttsProviderDefault || 'browser';
}
function voiceIdFor(speaker, role='pc'){
  const m = state.settings.voiceMap?.[speaker] || (role==='npc' ? state.settings.voiceMap?.npc : null);
  return m?.id || (providerFor(speaker, role)==='eleven'? state.settings.voiceId : '');
}

async function speak(text, speaker='Keeper', role='pc'){
  if(!state.settings.ttsOn || !text) return;
  const provider=providerFor(speaker, role);
  if(provider==='eleven' && state.settings.elevenKey){ const {blob}=await getOrCreateTTS(text, speaker, role); if(state.settings.ttsQueue) enqueueTTS(blob); else playBlobImmediate(blob); }
  else if(provider==='browser'){ speakBrowser(text, speaker, role); }
}
async function getOrCreateTTS(text, speaker, role='pc'){
  const key = await hashKey(`tts|eleven|${voiceIdFor(speaker, role)}|${speaker}|${(text||'').trim()}`);
  const hit=await idbGet('tts',key); if(hit){ return {blob:hit,key}; }
  const blob=await fetchTTSBlob(text, voiceIdFor(speaker, role)); await idbSet('tts',key,blob); return {blob,key};
}
function speakBrowser(text, speaker, role='pc'){ try{ window.speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); const id=voiceIdFor(speaker, role); const v=state.browserVoices.find(v=> v.name===id) || state.browserVoices[0]; if(v) u.voice=v; window.speechSynthesis.speak(u); }catch{} }
function stopVoice(clearQueue){ try{ if(currentAudio){ currentAudio.pause(); } if(currentUrl){ URL.revokeObjectURL(currentUrl); currentUrl=null; } currentAudio=null; window.speechSynthesis.cancel(); }catch{} if(clearQueue){ ttsQueue.length=0; ttsPlaying=false; } }

/* Browser voices list */
function refreshBrowserVoices(){ state.browserVoices = window.speechSynthesis.getVoices()||[]; }
if('speechSynthesis' in window){ window.speechSynthesis.onvoiceschanged = refreshBrowserVoices; refreshBrowserVoices(); }

/* IndexedDB (images as DataURL strings; tts as Blobs) */
const dbp=new Promise((resolve,reject)=>{ const open=indexedDB.open('si_cache_v3',1); open.onupgradeneeded=(e)=>{ const db=e.target.result; if(!db.objectStoreNames.contains('tts')) db.createObjectStore('tts'); if(!db.objectStoreNames.contains('images')) db.createObjectStore('images'); }; open.onsuccess=()=>resolve(open.result); open.onerror=()=>reject(open.error); });
function idbGet(store,key){ return dbp.then(db=> new Promise((res,rej)=>{ const tx=db.transaction(store,'readonly'); const r=tx.objectStore(store).get(key); r.onsuccess=()=>res(r.result||null); r.onerror=()=>rej(r.error);})); }
function idbSet(store,key,val){ return dbp.then(db=> new Promise((res,rej)=>{ const tx=db.transaction(store,'readwrite'); const r=tx.objectStore(store).put(val,key); r.onsuccess=()=>res(true); r.onerror=()=>rej(r.error);})); }
async function hashKey(s){ const buf=new TextEncoder().encode(s); const hash=await crypto.subtle.digest('SHA-256',buf); return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join(''); }

/* ---------- WIZARD ---------- */
const wizard={step:0, arc:null, youIndex:null, companions:[], rolls:{}, variety:{ era:'1920s', locale:'Inland city', theme:'Investigative', avoidCoast:true, seed:Math.floor(Math.random()*1e9)}};
byId('btnWizardNext').onclick=()=> wizardNext();
byId('btnWizardBack').onclick=()=> wizardBack();
function startWizard(force=false){ if(!force && localStorage.getItem(LS_WIZARD)) return; wizard.step=0; wizard.arc=null; wizard.youIndex=null; wizard.companions=[]; wizard.rolls={}; renderWizard(); show('#modalWizard'); }
function setStepPills(){ for(let i=0;i<5;i++){ const elB=byId('wStep'+i+'B'); if(elB) elB.classList.toggle('active', i===wizard.step); } }
function renderWizard(){
  setStepPills(); const body=byId('wizardBody'); body.innerHTML='';
  if(wizard.step===0){
    body.appendChild(el('div',{class:'grid2'},[
      el('div',{class:'card'},[
        el('h3',{},'1) Paste your keys (optional)'), el('div',{class:'small'},'OpenAI enables AI Keeper + images. ElevenLabs enables premium voices. Browser voices are free and default.'),
        el('div',{class:'hr'}), el('label',{},'OpenAI API Key'), el('input',{id:'w_openai',value:state.settings.openaiKey||'',placeholder:'sk-...'}),
        el('label',{},'ElevenLabs API Key'), el('input',{id:'w_eleven',value:state.settings.elevenKey||'',placeholder:'eleven-...'}),
        el('label',{},'ElevenLabs Default Voice ID'), el('input',{id:'w_voice',value:state.settings.voiceId||'',placeholder:'21m00Tcm4TlvDq8ikWAM'}),
        el('div',{class:'row'},[
          el('label',{},[el('input',{type:'checkbox',id:'w_useimg',checked:state.settings.useImages}), ' Enable Images']),
          el('label',{},'Image Model'),
          (function(){ const s=el('select',{id:'w_imgmodel'}); ['dall-e-3','gpt-image-1','placeholders'].forEach(m=> s.appendChild(el('option',{value:m, selected:state.settings.imageModel===m}, m))); return s; })(),
          el('label',{},'TTS Default'),
          (function(){ const s=el('select',{id:'w_ttsdef'}); ['browser','eleven','none'].forEach(m=> s.appendChild(el('option',{value:m, selected:(state.settings.ttsProviderDefault||'browser')===m}, m))); return s; })(),
          el('label',{},[el('input',{type:'checkbox',id:'w_tts',checked:state.settings.ttsOn}), ' Enable Voices']),
          el('label',{},[el('input',{type:'checkbox',id:'w_queue',checked:true}), ' Queue voice'])
        ])
      ]),
      el('div',{class:'card'},[
        el('h3',{},'What you’ll learn'), el('div',{class:'small'},
         'Movement, measuring, fog, basic checks, initiative and turns. The Keeper nudges you. Companions speak in-character with their own voices.')
      ])
    ]));
    byId('btnWizardBack').disabled=true;
  }
  if(wizard.step===1){
    const varietyUI = el('div',{class:'card'},[
      el('h3',{},'2) Variety Pack'),
      el('div',{class:'grid3'},[
        (function(){ const c=el('div',{class:'col'}); c.appendChild(el('label',{},'Era')); const s=el('select',{id:'v_era'}); ['1890s Gaslight','1920s','1950s','1970s','Modern'].forEach(v=> s.appendChild(el('option',{value:v, selected:wizard.variety.era===v}, v))); c.appendChild(s); return c; })(),
        (function(){ const c=el('div',{class:'col'}); c.appendChild(el('label',{},'Locale')); const s=el('select',{id:'v_locale'}); ['Inland city','Rural farmland','Desert frontier','Arctic outpost','Mountain mining town','University campus','Hospital complex','Museum & archives','Jungle expedition','Coastal port'].forEach(v=> s.appendChild(el('option',{value:v, selected:wizard.variety.locale===v}, v))); c.appendChild(s); return c; })(),
        (function(){ const c=el('div',{class:'col'}); c.appendChild(el('label',{},'Theme')); const s=el('select',{id:'v_theme'}); ['Investigative','Psychological','Folkloric','Scientific horror','Heist-gone-wrong'].forEach(v=> s.appendChild(el('option',{value:v, selected:wizard.variety.theme===v}, v))); c.appendChild(s); return c; })()
      ]),
      el('label',{},[el('input',{type:'checkbox',id:'v_avoid',checked:wizard.variety.avoidCoast}), ' Avoid coastal openings unless I choose “Coastal port”']),
      el('div',{class:'row',style:'margin-top:.35rem;'},[
        el('label',{},'Randomness Seed (optional)'),
        el('input',{id:'v_seed',placeholder:String(wizard.variety.seed),value:String(wizard.variety.seed)})
      ])
    ]);
    const arcUI = el('div',{class:'card'},[
      el('h3',{},'Generate a story arc'),
      el('div',{class:'row'},[
        el('button',{class:'primary',onclick:()=> genStoryArcAI(true)},'Generate with AI'),
        el('button',{class:'ghost',onclick:()=>{ pickDemoArc(); renderWizard(); toast('Demo arc loaded'); }},'Use Random Demo Arc')
      ]),
      el('div',{id:'arcStatus',class:'note',style:'margin-top:.5rem'}, wizard.arc? `Loaded: ${wizard.arc.title}` : 'No arc generated yet.')
    ]);
    const prev = el('div',{class:'card'},[ el('h3',{},'Arc preview'), el('div',{id:'arcPreview',class:'small'}, wizard.arc? arcHtml(wizard.arc): 'Generate or select an arc to preview.') ]);
    body.appendChild(el('div',{class:'grid2'},[varietyUI, arcUI])); body.appendChild(prev);
    byId('btnWizardBack').disabled=false;
  }
  if(wizard.step===2){
    const arc=wizard.arc||pickDemoArc();
    const list=el('div',{}, arc.pcOptions.map((opt,idx)=> invOption(opt,idx)));
    const voiceSetup=el('div',{class:'card'},[
      el('h3',{},'Voice Setup (optional, per speaker)'),
      el('div',{class:'small'},'Pick Browser voices (free) or enter ElevenLabs IDs per character.'),
      el('div',{id:'voiceSetupRows'})
    ]);
    body.appendChild(el('div',{class:'card'},[
      el('h3',{},'3) Choose YOU + 4 companions'),
      el('div',{class:'small'},'Click “Me” on one investigator, then “Add Companion” on exactly four others. Click “Roll Stats” to set starting attributes.'),
      el('div',{class:'hr'}), list, el('div',{class:'small',id:'partyPickInfo',style:'margin-top:.5rem;color:#bcd1ff'}, pickSummary())
    ]));
    body.appendChild(voiceSetup);
    renderVoiceSetup();
  }
  if(wizard.step===3){
    body.appendChild(el('div',{class:'grid2'},[
      el('div',{class:'card'},[
        el('h3',{},'4) Auto‑build your game (with progress)'),
        el('div',{class:'small'},'Creates scenes per act, backgrounds (or placeholders), spawns your chosen party + NPCs, portraits, handouts, and an NPC portrait catalog.'),
        el('div',{class:'row'},[ el('button',{class:'primary',onclick:()=> wizardAutoBuildEverything()},'Build Everything Now') ]),
        el('div',{id:'buildStatus',class:'note',style:'margin-top:.5rem'}, 'Not built yet.')
      ]),
      el('div',{class:'card'},[
        el('h3',{},'Tips'),
        el('div',{class:'small'},'Encounter mode: Start Encounter → move up to 4 tiles → one action → /endturn. Use /check Skill 60 for generic checks.')
      ])
    ]));
  }
  if(wizard.step===4){
    body.appendChild(el('div',{class:'card'},[
      el('h3',{},'5) You’re ready'),
      el('div',{class:'small'},'The Keeper will introduce the scene and guide you. Click "Begin Play" or Next to start.'),
      el('div',{class:'row'},[ el('button',{class:'primary',onclick:()=>{ localStorage.setItem(LS_WIZARD,'1'); hide('#modalWizard'); greetAndStart(); }},'Begin Play') ])
    ]));
  }
}
function wizardBack(){ if(wizard.step>0){ wizard.step--; renderWizard(); } }
async function wizardNext(){
  if(wizard.step===0){
    state.settings.openaiKey = byId('w_openai').value.trim();
    state.settings.elevenKey = byId('w_eleven').value.trim();
    state.settings.voiceId   = byId('w_voice').value.trim();
    state.settings.useImages = byId('w_useimg').checked;
    state.settings.imageModel= (byId('w_imgmodel').value||'dall-e-3');
    state.settings.ttsProviderDefault = byId('w_ttsdef').value;
    state.settings.ttsOn     = byId('w_tts').checked;
    state.settings.ttsQueue  = byId('w_queue').checked;
    saveSettings();
  }
  if(wizard.step===1){
    wizard.variety.era    = byId('v_era').value;
    wizard.variety.locale = byId('v_locale').value;
    wizard.variety.theme  = byId('v_theme').value;
    wizard.variety.avoidCoast = byId('v_avoid').checked;
    const seedVal = parseInt(byId('v_seed').value,10); if(!isNaN(seedVal)) wizard.variety.seed=seedVal;
    if(!wizard.arc){ if(state.settings.openaiKey){ await genStoryArcAI(true); } else { pickDemoArc(); } }
  }
  if(wizard.step===2){ if(wizard.youIndex==null || wizard.companions.length!==4){ toast('Pick yourself and exactly 4 companions.'); return; } }
  if(wizard.step===3){
    const txt=byId('buildStatus')?.textContent||''; if(!/ready/i.test(txt)){ await wizardAutoBuildEverything(); }
  }
  if(wizard.step<4){ wizard.step++; renderWizard(); } else { localStorage.setItem(LS_WIZARD,'1'); hide('#modalWizard'); greetAndStart(); }
}
function arcHtml(arc){ return `<b>${escapeHtml(arc.title)}</b><br>${escapeHtml(arc.logline)}<br><br>${arc.acts.map(a=>`<span class="tag">${escapeHtml(a.name)}</span>`).join(' ')}` }
function invOption(opt, idx){
  const wrap=el('div',{class:'card',id:`inv_${idx}`,style:'margin:.4rem 0'});
  if(wizard.youIndex===idx) wrap.classList.add('meSel'); if(wizard.companions.includes(idx)) wrap.classList.add('compSel');
  const sex = opt.sex==='M'?'Male': (opt.sex==='F'?'Female':(opt.sex||''));
  const meta = `${sex}, ${opt.age}`;
  wrap.appendChild(el('div',{html:`<b>${escapeHtml(opt.name)}</b> (${escapeHtml(meta)}) — ${escapeHtml(opt.archetype)}<br><span class="small">${escapeHtml(opt.backstory)} <i>(${escapeHtml(opt.traits)})</i></span>`}));
  const row=el('div',{class:'row',style:'margin-top:.25rem'});
  row.appendChild(el('button',{class:'ghost',onclick:()=> rollStats(idx)},'Roll Stats'));
  row.appendChild(el('button',{class:'primary',onclick:()=> chooseMe(idx)}, wizard.youIndex===idx?'Chosen (Me)':'Choose Me'));
  row.appendChild(el('button',{class:'ghost',onclick:()=> toggleCompanion(idx)}, wizard.companions.includes(idx)?'Remove Companion':'Add Companion'));
  wrap.appendChild(row);
  const rolled=wizard.rolls[idx]; wrap.appendChild(el('div',{id:`rolled_${idx}`,class:'small',style:'margin-top:.25rem;color:#bcd1ff'}, rolled? fmtStats(rolled):''));
  return wrap;
}
function fmtStats(st){ return `Rolled: ${Object.entries(st).map(([k,v])=>`${k} ${v}`).join(' · ')}`; }
function pickSummary(){
  const opts = wizard.arc?.pcOptions || INVESTIGATORS;
  return `You: ${wizard.youIndex!=null? opts[wizard.youIndex].name:'—'} · Companions (${wizard.companions.length}/4)`;
}
function rollStats(idx){ const stats={Brains: roll3d6plus(3), Brawn: roll3d6plus(3), Nerve: roll3d6plus(3), Perception: roll3d6plus(3), Charm: roll3d6plus(3)}; wizard.rolls[idx]=stats; const elr=byId('rolled_'+idx); if(elr) elr.textContent=fmtStats(stats); }
function roll3d6plus(a){ let s=0; for(let i=0;i<3;i++) s+=1+Math.floor(Math.random()*6); return s+a; }
function chooseMe(idx){
  const opts = wizard.arc?.pcOptions || INVESTIGATORS;
  wizard.youIndex=idx;
  toast('Selected '+opts[idx].name);
  renderWizard();
}
function toggleCompanion(idx){ if(wizard.youIndex===idx){ toast('That is YOU.'); return; } const i=wizard.companions.indexOf(idx); if(i>=0) wizard.companions.splice(i,1); else { if(wizard.companions.length>=4){ toast('Already 4 companions.'); return; } wizard.companions.push(idx); } renderWizard(); }

/* Voice setup in wizard */
function renderVoiceSetup(){
  const wrap=byId('voiceSetupRows'); if(!wrap) return; wrap.innerHTML='';
  const opts = wizard.arc?.pcOptions || INVESTIGATORS;
  const actors = [];
  if(wizard.youIndex!=null) actors.push(opts[wizard.youIndex]);
  wizard.companions.forEach(i=> actors.push(opts[i]));
  actors.unshift({name:'Keeper'});
  actors.forEach(a=>{
    wrap.appendChild(voiceControlsForName(a));
  });
}

/* ---------- STORY ARC (AI) with variety & anti-repetition ---------- */
function pickDemoArc(){
  const v = wizard.variety;
  let pool = DEMO_ARCS.slice();
  if(v.locale.includes('University')||v.locale.includes('Museum')) pool = DEMO_ARCS.filter(a=> /library|archives|museum/i.test(a.setting));
  else if(v.locale.includes('Mountain')) pool = DEMO_ARCS.filter(a=> /Mountain/i.test(a.setting));
  else if(v.locale.includes('Arctic')) pool = DEMO_ARCS.filter(a=> /Arctic/i.test(a.setting));
  else if(v.locale.includes('Rural')) pool = DEMO_ARCS.filter(a=> /Rural|fair/i.test(a.setting));
  if(!pool.length) pool = DEMO_ARCS.slice();
  const arc = deepClone(pool[Math.floor(Math.random()*pool.length)]);
  wizard.arc=arc; state.campaign=arc; const prev=byId('arcPreview'); if(prev) prev.innerHTML=arcHtml(arc);
  return arc;
}
async function genStoryArcAI(retryOnSimilar=false){
  const key=state.settings.openaiKey; const status=byId('arcStatus'); if(!key){ toast('OpenAI key required'); return; }
  if(status) status.textContent='Generating arc…';
  const v=wizard.variety;
  const diversityId = Math.random().toString(36).slice(2,10)+'-'+v.seed;
  const ingredientsPacks = [
    {locales:["rail depot","hydroelectric dam","sanitarium","opera house","desert dig site","orphanage","subway tunnels","clock factory"], motifs:["echoes","paper monsters","misnumbered doors","stolen faces","timekeeping errors"], threats:["administrator","archivist collective","sleepwalkers","signalman"], ban:["coast","docks","cannery","fog horn"]},
    {locales:["planetarium","radio tower","ice rink","observatory dome","mountain hotel","seance parlor","ship graveyard (avoid unless coastal chosen)","salt flats"], motifs:["wrong shadows","repeating names","letters that bruise skin","bloodless blood"], threats:["radio host","surgeon","antiquarian ring","chorus"], ban:["sailors","harbor","tide","wharf"]}
  ];
  const ing = ingredientsPacks[Math.floor(Math.random()*ingredientsPacks.length)];
  const creative = `Ingredients: pick 2–3 from locales ${ing.locales.join(', ')}, motifs ${ing.motifs.join(', ')}, threats ${ing.threats.join(', ')}. Ban motifs: ${ing.ban.join(', ')}.`;

  const sys=`You are a scenario designer. Return ONLY compact JSON with keys:
{ "title": string, "logline": string, "tone": string, "setting": string,
  "acts": [{ "name": string, "beats": string[] } ... exactly 3],
  "imagePrompts": string[] (3 painterly prompts),
  "pcOptions": [{ "archetype": string, "name": string, "backstory": string, "traits": string, "prompt": string } ... 10],
  "npcs": string[] (>=6 varied roles)
}
Constraints:
- Era: ${v.era}. Locale: ${v.locale}. Theme: ${v.theme}.
- ${v.avoidCoast && v.locale!=='Coastal port' ? 'Do NOT use coastal imagery.' : 'Coastal allowed.'}
- Avoid prior common tropes: docks, cannery, “Chapel Below,” seawater rites (unless Coastal explicitly picked).
- Diversity ID: ${diversityId}. Use it indirectly to vary topics, names, and imagery.
- ${creative}
- Keep it tutorial-friendly: clear investigative beats, not combat-driven.`;

  let tries=0, arc=null;
  const recent = JSON.parse(localStorage.getItem(LS_ARC_FP)||'[]').slice(-3);
  while(tries<2){
    tries++;
    try{
      const res=await fetch('https://api.openai.com/v1/chat/completions',{ method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
        body: JSON.stringify({model: state.settings.openaiModel||'gpt-4o-mini', temperature:0.95, messages:[{role:'system',content:sys},{role:'user',content:'Create a fresh 3‑act arc with unique flavor.'}]})
      });
      if(!res.ok) throw new Error(await res.text());
      const data=await res.json(); const txt=data.choices?.[0]?.message?.content||'{}'; arc=JSON.parse(txt);
    }catch(e){ arc=null; }
    if(!arc){ continue; }
    const fp = arcFingerprint(arc);
    if(retryOnSimilar && recent.includes(fp)){ arc=null; continue; }
    recent.push(fp); localStorage.setItem(LS_ARC_FP, JSON.stringify(recent.slice(-6)));
    wizard.arc=arc; state.campaign=arc; const prev=byId('arcPreview'); if(prev) prev.innerHTML=arcHtml(arc); if(status) status.textContent='Arc generated.'; return;
  }
  const d=pickDemoArc(); if(status) status.textContent='Fell back to demo arc.';
}
function arcFingerprint(arc){
  const s=(arc.title||'')+'|'+(arc.setting||'')+'|'+(arc.acts||[]).map(a=>a.name).join(',');
  return s.toLowerCase().replace(/[^a-z0-9|,]+/g,'').slice(0,200);
}

/* ---------- AUTO BUILD with PROGRESS ---------- */
const PROG_STEPS = ["Create Scenes","Backgrounds","Spawn PCs","Spawn NPCs","Portraits (PCs)","Portraits (NPCs)","Handouts","NPC Catalog"];
function progressOpen(title="Building…"){ byId('progTitle').textContent=title; const list=byId('progSteps'); list.innerHTML=''; PROG_STEPS.forEach((s,i)=> list.appendChild(el('div',{class:'stepItem',id:'step_'+i},[el('div',{class:'dot'}), el('div',{}, s)]))); byId('progBar').style.width='0%'; show('#modalProgress'); }
function progressSet(i){ const pct=Math.round(((i+1)/PROG_STEPS.length)*100); byId('progBar').style.width=pct+'%'; for(let k=0;k<PROG_STEPS.length;k++){ const n=byId('step_'+k); n.classList.toggle('done', k<i); n.classList.toggle('cur', k===i); } }
function progressClose(){ hide('#modalProgress'); }
async function wizardAutoBuildEverything(){
  const arc=wizard.arc||pickDemoArc();
  const status=byId('buildStatus');
  if(status) status.textContent='Building…';
  state.campaign = arc;
  progressOpen("Assembling your table");
  try{
    // 0: Scenes
    progressSet(0);
    state.scenes=[]; arc.acts.forEach(a=> state.scenes.push(newScene(a.name))); state.sceneIndex=0;
    // 1: Backgrounds
    progressSet(1);
    for(let i=0;i<state.scenes.length;i++){ const prompt=(arc.imagePrompts&&arc.imagePrompts[i])||arc.imagePrompts?.[0]||`${arc.setting} — ${arc.acts[i].name}`; try{ const dataUrl=await openaiImage(prompt,'1024x1024'); state.scenes[i].bg=dataUrl; }catch{} }
    renderBackground();
    // 2: PCs
    progressSet(2);
    const opts = arc.pcOptions || INVESTIGATORS;
    const picks=[wizard.youIndex, ...wizard.companions].map(i=> opts[i]);
    currentScene().tokens.length=0;
    picks.forEach((p,i)=> addToken({name:p.name, type:'pc', x:i, y:GRID_H-1, persona:`${p.archetype}. Backstory: ${p.backstory}. Traits: ${p.traits}.`, speed:4}));
    const youName=opts[wizard.youIndex].name;
    const youToken=currentScene().tokens.find(t=>t.name===youName && t.type==='pc');
    if(youToken){
      state.youPCId=youToken.id;
      toast(`You will play as ${youToken.name}.`);
    }else{
      console.error('Could not assign player character!');
      const firstPC=currentScene().tokens.find(t=>t.type==='pc');
      if(firstPC) state.youPCId=firstPC.id;
    }
    // 3: NPCs
    progressSet(3);
    (arc.npcs||[]).slice(0,4).forEach((n,i)=> addToken({name:n, type:'npc', x:GRID_W-1-i, y:0, persona:"NPC with local knowledge"}));
    // 4: Portraits PCs
    progressSet(4);
    for(const t of currentScene().tokens.filter(t=>t.type==='pc')) await genPortraitFor(t);
    // 5: Portraits NPCs
    progressSet(5);
    for(const t of currentScene().tokens.filter(t=>t.type==='npc')) await genPortraitFor(t);
    // 6: Handouts
    progressSet(6);
    await generateHandoutsAuto(arc);
    // 7: NPC Catalog
    progressSet(7);
    await ensureNPCCatalog(arc);
    renderAll(); if(status) status.textContent='Ready.'; toast('Build complete.');
  }catch(e){ if(status) status.textContent='Build failed'; }
  finally{ setTimeout(progressClose, 400); }
}

/* NPC Catalog (prepare portraits for later) */
async function ensureNPCCatalog(arc){
  let catalog=[];
  if(state.settings.openaiKey){
    try{
      const sys=`Return JSON {"npcs":[{"role":string,"name":string,"prompt":string}... 8 items]}
Roles should match the scenario (${arc.title}) across varied professions (authority, scholar, worker, occult, medical, criminal, clergy, bystander).
Prompts should describe a 1920s portrait in cinematic, painterly style. Return ONLY JSON.`;
      const res=await fetch('https://api.openai.com/v1/chat/completions',{ method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${state.settings.openaiKey}`},
        body: JSON.stringify({model: state.settings.openaiModel||'gpt-4o-mini', temperature:0.6, max_tokens:350, messages:[{role:'system',content:sys},{role:'user',content:`Scenario summary: ${arc.logline}. Setting: ${arc.setting}.`}]})
      });
      if(res.ok){ const data=await res.json(); const txt=data.choices?.[0]?.message?.content||'{}'; const out=JSON.parse(txt); catalog=out.npcs||[]; }
    }catch{ /* ignore */ }
  }
  if(!catalog.length){
    catalog = [
      {role:'Sheriff', name:'Sheriff Ada Colton', prompt:'1920s sheriff portrait, wool uniform, side cap, stern gaze'},
      {role:'Librarian', name:'Martha Kincaid', prompt:'1920s librarian portrait, card catalog backdrop'},
      {role:'Dock Foreman', name:'Briggs Malloy', prompt:'1920s dock foreman, flat cap, oilskin coat'},
      {role:'Clergyman', name:'Reverend Hale', prompt:'1920s pastor portrait, candlelit vestry'},
      {role:'Doctor', name:'Dr. Samuel Pike', prompt:'1920s doctor portrait, hospital corridor'},
      {role:'Antiquarian', name:'Elias Greaves', prompt:'1920s antiquarian, dusty shop, ledgers'},
      {role:'Officer', name:'Constable Reed', prompt:'1920s police officer, lantern, drizzle'},
      {role:'Cult Acolyte', name:'“Initiate”', prompt:'hooded figure, half‑lit, ritual threads'}
    ];
  }
  state.campaign = state.campaign || {}; state.campaign.npcPortraits = [];
  for(const npc of catalog){
    let dataUrl; try{ dataUrl = await openaiImage(`${npc.prompt}, chiaroscuro, painterly, round crop`, '1024x1024'); }catch{ dataUrl = await placeholderImage(npc.prompt, '512x512'); }
    state.campaign.npcPortraits.push({role:npc.role, name:npc.name, prompt:npc.prompt, portraitData:dataUrl});
  }
}

/* ---------- HANDOUTS ---------- */
async function generateHandoutsAuto(arc=state.campaign){
  let handouts=[];
  if(state.settings.openaiKey){
    try{
      const sys=`You are preparing in-game "handouts" for an investigation scenario. Return JSON:
{"handouts":[{"title":string,"text":string,"imagePrompt":string}... exactly 3 items]}
The text should be short (2-5 lines) and diegetic (ledger snippets, ritual notes, map fragments). Return ONLY JSON.`;
      const res=await fetch('https://api.openai.com/v1/chat/completions',{ method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${state.settings.openaiKey}`},
        body: JSON.stringify({model: state.settings.openaiModel||'gpt-4o-mini', temperature:0.5, max_tokens:380, messages:[
          {role:'system',content:sys},{role:'user',content:`Scenario: ${arc.title} — ${arc.logline}. Acts: ${arc.acts.map(a=>a.name).join(' | ')}`}
        ]})
      });
      if(res.ok){ const data=await res.json(); const txt=data.choices?.[0]?.message?.content||'{}'; const out=JSON.parse(txt); handouts=out.handouts||[]; }
    }catch{ handouts=demoHandouts(); }
  }else{ handouts=demoHandouts(); }
  for(const ho of handouts){ try{ ho.imageUrl=await openaiImage(ho.imagePrompt||'aged paper note, 1920s, moody', '1024x1024'); }catch{ ho.imageUrl=await placeholderImage(ho.title||'Handout','1024x1024'); } }
  state.campaign = state.campaign || {}; state.campaign.handouts = handouts; renderHandouts();
}
function demoHandouts(){ return [
  {title:"Ledger Scrap", text:"Shipment #3417 — 'for the chapel in the ground'. Signed with a fishbone symbol.", imagePrompt:"A torn ledgersheet with ink smears, 1920s paper"},
  {title:"Sub-Basement Plan", text:"A penciled route ending in a circle labeled 'reading'.", imagePrompt:"Hand-drawn map fragment, pencil on damp paper"},
  {title:"Operator’s Card", text:"Bell once for warning, twice for welcome.", imagePrompt:"A stained index card with crisp cursive"}
]; }

/* ---------- PORTRAITS ---------- */
async function genPortraitFor(t){ const base = t.prompt || `Portrait, 1920s ${t.type==='pc'?'investigator':''} ${t.name||'character'}, moody film grain, chiaroscuro, painterly, round crop`; try{ t.portraitData=await openaiImage(base,'1024x1024'); renderTokens(); } catch{ t.portraitData=await placeholderImage(base,'512x512'); renderTokens(); } }

/* ---------- CHARACTER SHEETS ---------- */
function defaultSheet(t){
  return {
    archetype: t.type==='pc' ? 'Investigator' : 'NPC',
    persona: t.persona||'',
    hp: 10, sanity: 50, speed: t.speed||4,
    attrs:{Brains:10,Brawn:10,Nerve:10,Perception:10,Charm:10},
    skills:{Spot:60,Stealth:40,Medicine:30,Library:50,Persuade:40},
    inventory:[], conditions:[], bonds:[]
  };
}
let sheetTarget=null;
function openSheet(t){
  sheetTarget=t; ensureSheet(t); fillSheet(t); show('#modalSheet');
}
function ensureSheet(t){ t.sheet = t.sheet || defaultSheet(t); }
function checkSanityThresholds(t){
  ensureSheet(t);
  const san=t.sheet.sanity||0;
  t.sheet.conditions=t.sheet.conditions||[];
  let changed=false;
  if(san<=0 && !t.sheet.conditions.includes('catatonic')){
    t.sheet.conditions.push('catatonic');
    addSystemMessage(`${t.name} collapses into catatonia!`);
    changed=true;
  }else if(san<=10 && !t.sheet.conditions.includes('unhinged')){
    t.sheet.conditions.push('unhinged');
    addSystemMessage(`${t.name} suffers a mental break!`);
    changed=true;
  }else if(san<=25 && !t.sheet.conditions.includes('shaken')){
    t.sheet.conditions.push('shaken');
    addSystemMessage(`${t.name} is shaken by eldritch horrors.`);
    changed=true;
  }
  if(changed && sheetTarget===t) fillSheet(t);
}
function fillSheet(t){
  byId('sheetTitle').textContent=`Character Sheet — ${t.name||'Unknown'}`;
  byId('csName').value = t.name||'';
  byId('csArch').value = t.sheet.archetype||'';
  byId('csPersona').value = t.persona || t.sheet.persona || '';
  byId('csBonds').value = (t.sheet.bonds||[]).join(', ');
  byId('csHP').value = t.sheet.hp||0;
  byId('csSAN').value = t.sheet.sanity||0;
  byId('csSPD').value = t.sheet.speed||4;
  byId('csBrains').value = t.sheet.attrs.Brains||10;
  byId('csBrawn').value = t.sheet.attrs.Brawn||10;
  byId('csNerve').value = t.sheet.attrs.Nerve||10;
  byId('csPerc').value = t.sheet.attrs.Perception||10;
  byId('csCharm').value = t.sheet.attrs.Charm||10;
  byId('csConds').value = (t.sheet.conditions||[]).join(', ');

  // skills list
  const sk=byId('csSkills'); sk.innerHTML=''; Object.entries(t.sheet.skills||{}).forEach(([k,v])=>{
    const row=el('div',{class:'row'},[
      el('div',{class:'small'},`${k} ${v}`),
      el('button',{class:'ghost',onclick:()=>{ const r=rollPercentile(k, v); addSystemMessage(`${t.name}: ${r.text}`); }},'Roll'),
      el('button',{class:'ghost',onclick:()=>{ const nv=Number(prompt('New value', String(v))); if(!isNaN(nv)){ t.sheet.skills[k]=clamp(nv,1,99); fillSheet(t); }}},'Edit'),
      el('button',{class:'danger',onclick:()=>{ delete t.sheet.skills[k]; fillSheet(t); }},'Delete')
    ]);
    sk.appendChild(row);
  });

  // inventory list
  const inv=byId('csInv'); inv.innerHTML='';
  let totalWt=0;
  (t.sheet.inventory||[]).forEach((it,idx)=>{
    totalWt += (Number(it.weight)||0)*(Number(it.qty)||1);
    inv.appendChild(el('div',{class:'row'},[
      el('div',{class:'small'},`${it.name} ×${it.qty||1} (wt ${it.weight||0})`),
      el('button',{class:'ghost',onclick:()=>{ addLine(`${t.name} uses ${it.name}.`,'you'); if(it.qty>1){ it.qty--; } else { t.sheet.inventory.splice(idx,1); } fillSheet(t);} },'Use'),
      el('button',{class:'danger',onclick:()=>{ t.sheet.inventory.splice(idx,1); fillSheet(t);} },'Drop')
    ]));
  });
  byId('invWeight').textContent = `Weight: ${totalWt.toFixed(1)}`;
}
byId('btnAddSkill').onclick=()=>{
  if(!sheetTarget) return;
  const n=byId('csSkillName').value.trim(); const v=clamp(Number(byId('csSkillVal').value||0),1,99);
  if(!n||!v) return; sheetTarget.sheet.skills[n]=v; byId('csSkillName').value=''; byId('csSkillVal').value=''; fillSheet(sheetTarget);
};
byId('btnAddItem').onclick=()=>{
  if(!sheetTarget) return;
  const n=byId('csItemName').value.trim(); const q=clamp(Number(byId('csItemQty').value||1),1,999); const w=Math.max(0,Number(byId('csItemWt').value||0));
  if(!n) return; sheetTarget.sheet.inventory.push({name:n, qty:q, weight:w}); byId('csItemName').value=''; byId('csItemQty').value='1'; byId('csItemWt').value='0'; fillSheet(sheetTarget);
};
byId('btnSheetSave').onclick=()=>{
  if(!sheetTarget) return;
  sheetTarget.name = byId('csName').value||sheetTarget.name;
  sheetTarget.sheet.archetype = byId('csArch').value||sheetTarget.sheet.archetype;
  sheetTarget.persona = byId('csPersona').value||'';
  sheetTarget.sheet.hp = Number(byId('csHP').value)||sheetTarget.sheet.hp;
  sheetTarget.sheet.sanity = Number(byId('csSAN').value)||sheetTarget.sheet.sanity;
  sheetTarget.sheet.speed = sheetTarget.speed = Number(byId('csSPD').value)||sheetTarget.sheet.speed;
  sheetTarget.sheet.attrs = {
    Brains: Number(byId('csBrains').value)||10,
    Brawn: Number(byId('csBrawn').value)||10,
    Nerve: Number(byId('csNerve').value)||10,
    Perception: Number(byId('csPerc').value)||10,
    Charm: Number(byId('csCharm').value)||10
  };
  sheetTarget.sheet.conditions = (byId('csConds').value||'').split(',').map(s=>s.trim()).filter(Boolean);
  sheetTarget.sheet.bonds = (byId('csBonds').value||'').split(',').map(s=>s.trim()).filter(Boolean);
  checkSanityThresholds(sheetTarget);
  renderTokens(); renderTokenList(); toast('Sheet saved');
  hide('#modalSheet');
};

/* ---------- SHOW/HIDE ---------- */
function show(sel){ const m=document.querySelector(sel); if(m) m.classList.add('show'); }
function hide(sel){ const m=document.querySelector(sel); if(m) m.classList.remove('show'); }
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-close]');
  if(t) hide(t.getAttribute('data-close'));
});

/* ---------- LOCAL MEMORY SUMMARIZATION (no API) ---------- */
function maybeSummarizeLocal(){
  // After every ~12 Keeper lines, make a tiny stitched summary to shrink future prompts
  const lines = Array.from(chatLog.querySelectorAll('.line')).slice(-40);
  if(lines.length<12) return;
  const points=[];
  lines.forEach(l=>{
    const who = l.querySelector('.who')?.textContent || (l.classList.contains('you')?'You':l.classList.contains('keeper')?'Keeper':'');
    const txt = stripTags((l.querySelector('.content')?.innerHTML||l.innerHTML||'')).trim();
    if(!txt) return;
    if(points.length<10 && txt.length>6) points.push(`${who||'Narration'}: ${txt.slice(0,140)}`);
  });
  state.memory = points.slice(-8).join(' | ');
}

/* ---------- INIT ---------- */
function initialSeed(){ if(currentScene().tokens.length===0){ addToken({name:'pc0',type:'pc',x:1,y:6}); addToken({name:'pc1',type:'pc',x:2,y:6}); addToken({name:'npc0',type:'npc',x:10,y:1}); } }
function renderInitButtons(){ byId('btnInitRoll').onclick=rollAllInit; byId('btnInitNext').onclick=advanceTurn; byId('btnInitClear').onclick=clearInit; }

/* Keyboard tool binds */
document.addEventListener('keydown', e=>{ if(e.key==='v'||e.key==='V') setTool('select'); if(e.key==='r'||e.key==='R') setTool('ruler'); if(e.key==='f'||e.key==='F') setTool('reveal'); if(e.key==='h'||e.key==='H') setTool('hide'); if(e.key==='u'||e.key==='U') fogUndo(); });
function setTool(t){ tool=t; byId('tool').value=t; toast('Tool: '+t); }
byId('tool').addEventListener('change',e=> setTool(e.target.value));
byId('brush').addEventListener('change',e=> brush=Number(e.target.value));

/* Begin play banner */
function greetAndStart(){
  addSystemMessage(`<b>${escapeHtml(state.campaign?.title||'Welcome')}</b><br>${escapeHtml(state.campaign?.logline||'Learn the basics with the Keeper’s help.')}`);
  addSystemMessage(`Use <i>Start Encounter</i> for guided turns. On your turn: move up to <b>4</b> tiles, take <b>1</b> action and <b>1</b> bonus action, then type <i>/endturn</i>. For skill checks, try <i>/check Spot 60</i>.`);
}

/* Boot */
loadSettings(); initialSeed(); renderAll(); renderInitButtons(); if(!localStorage.getItem(LS_WIZARD)) startWizard(false);

/* =========================================================
   SOLO INVESTIGATOR — Tutorial Solo VTT (client‑only)
   Token‑frugal, with Character Sheets + Inventory, stable chat scroll,
   asset‑full saves, auto Keeper trigger, stronger variety
   ========================================================= */

/* ---------- CONSTANTS ---------- */
const LS_SETTINGS   = 'si_settings_v8';
const LS_SLOTS      = 'si_settings_slots_v1';
const LS_WIZARD     = 'si_wizard_done_v6';
const LS_ARC_FP     = 'si_recent_arc_fps_v2';
const LS_OPENAI_KEY = 'si_key_openai';
const LS_ELEVEN_KEY = 'si_key_eleven';
let GRID_W = 12, GRID_H = 8;

/* Ten core investigators (as before) */
const INVESTIGATORS = [
  { archetype:"Journalist",   name:"Eleanor Shaw",             sex:"F", age:31, prompt:"1920s journalist portrait, trench coat, press badge, film-noir lighting", backstory:"Reporter chasing labor abuses to redeem a career-stalling misquote.", traits:"Observant, stubborn, empathetic.", img:"assets/investigators/journalist_eleanor_shaw.png" },
  { archetype:"Doctor",       name:"Thomas Greer, MD",         sex:"M", age:40, prompt:"1920s physician portrait, wireframe glasses, soft rim light", backstory:"War medic haunted by triage choices; volunteers at a charity clinic.", traits:"Calm, clinical, moral.", img:"assets/investigators/doctor_thomas_greer.png" },
  { archetype:"Professor",    name:"Miriam Kline",             sex:"F", age:37, prompt:"1920s academic portrait, tweed, library bokeh", backstory:"Folklore professor cataloging 'drowned saints' myths.", traits:"Curious, cautious, enthralled.", img:"assets/investigators/professor_miriam_kline.png" },
  { archetype:"Detective",    name:"Silas Hart",               sex:"M", age:33, prompt:"1920s sleuth portrait, fedora, cigarette smoke", backstory:"Laid‑off Pinkerton with a code; hired off‑books to find the missing.", traits:"Dry wit, methodical, suspicious.", img:"assets/investigators/detective_silas_hart.png" },
  { archetype:"Occultist",    name:"Opal Reyes",               sex:"F", age:26, prompt:"1920s medium portrait, candlelight, ectoplasmic haze", backstory:"Spiritualist who lost a sibling to the unknown; drawn to thin places.", traits:"Intense, intuitive, brittle.", img:"assets/investigators/occultist_opal_reyes.png" },
  { archetype:"Photographer", name:"Beatrice “Bea” Hollis",     sex:"F", age:28, prompt:"1920s field photographer, Graflex camera, raincoat", backstory:"Stringer who captured something impossible on a glass plate.", traits:"Composed, daring, curious.", img:"assets/investigators/photographer_beatrice_hollis.png" },
  { archetype:"Sailor",       name:"Franklin “Finn” MacReady", sex:"M", age:35, prompt:"1920s sailor portrait, peacoat, stormy backdrop", backstory:"Knows hidden inlets; talks in his sleep—answers back, too.", traits:"Superstitious, brave, practical.", img:"assets/investigators/sailor_finn_macready.png" },
  { archetype:"Psychiatrist", name:"Dr. Anjali Rao",            sex:"F", age:34, prompt:"1920s psychiatrist, tidy bob, notebook", backstory:"Researching mass suggestion; her mentor vanished here.", traits:"Analytical, patient, fearless.", img:"assets/investigators/psychiatrist_anjali_rao.png" },
  { archetype:"Ex‑Priest",    name:"Father Declan Byrne",      sex:"M", age:45, prompt:"1920s clerical portrait, worn collar, hard eyes", backstory:"Left the cloth after a catastrophe; now studies apocrypha.", traits:"Grim, protective, resolute.", img:"assets/investigators/ex_priest_declan_byrne.png" },
  { archetype:"Radio Operator",name:"Dorothy “Dot” Pennington", sex:"F", age:24, prompt:"1920s radio operator, headphones, desk lamp glow", backstory:"Intercepted a coded transmission about 'the Chapel Below'.", traits:"Wry, quick, technical.", img:"assets/investigators/radio_operator_dorothy_pennington.png" }
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
    backgrounds:[
      "assets/backgrounds/dust_on_the_stacks_act1.png",
      "assets/backgrounds/dust_on_the_stacks_act2.png",
      "assets/backgrounds/dust_on_the_stacks_act3.png"
    ],
    handouts:[{title:"Dust on the Stacks Handout", text:"", imageUrl:"assets/handouts/dust_handout.png"}],
    pcOptions: INVESTIGATORS,
    npcs:[
      {name:"Head Librarian with ink-stained fingers", img:"assets/npcs/dust_head_librarian.png"},
      {name:"Night Watchman who forgets his own name", img:"assets/npcs/dust_night_watchman.png"},
      {name:"Graduate Assistant with shaking hands", img:"assets/npcs/dust_graduate_assistant.png"},
      {name:"Archivist with a bandaged ear", img:"assets/npcs/dust_archivist.png"}
    ]
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
    backgrounds:[
      "assets/backgrounds/salt_less_taken_act1.png",
      "assets/backgrounds/salt_less_taken_act2.png",
      "assets/backgrounds/salt_less_taken_act3.png"
    ],
    handouts:[{title:"Salt Less Taken Handout", text:"", imageUrl:"assets/handouts/salt_handout.png"}],
    pcOptions: INVESTIGATORS,
    npcs:[
      {name:"Foreman with a crushed hat", img:"assets/npcs/salt_foreman.png"},
      {name:"Nurse running a tiny clinic", img:"assets/npcs/salt_nurse.png"},
      {name:"Geology professor on sabbatical", img:"assets/npcs/salt_geology_professor.png"},
      {name:"Local preacher who refuses to ring the bell", img:"assets/npcs/salt_preacher.png"}
    ]
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
    backgrounds:[
      "assets/backgrounds/mirrors_for_a_carnival_act1.png",
      "assets/backgrounds/mirrors_for_a_carnival_act2.png",
      "assets/backgrounds/mirrors_for_a_carnival_act3.png"
    ],
    handouts:[{title:"Mirrors for a Carnival Handout", text:"", imageUrl:"assets/handouts/mirrors_handout.png"}],
    pcOptions: INVESTIGATORS,
    npcs:[
      {name:"Ringmaster with a velvet voice", img:"assets/npcs/mirrors_ringmaster.png"},
      {name:"Fortune-teller who looks past you", img:"assets/npcs/mirrors_fortune_teller.png"},
      {name:"Mechanic with mercury stains", img:"assets/npcs/mirrors_mechanic.png"},
      {name:"Deputy uneasy around mirrors", img:"assets/npcs/mirrors_deputy.png"}
    ]
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
    backgrounds:[
      "assets/backgrounds/white_silence_act1.png",
      "assets/backgrounds/white_silence_act2.png",
      "assets/backgrounds/white_silence_act3.png"
    ],
    handouts:[{title:"White Silence Handout", text:"", imageUrl:"assets/handouts/white_handout.png"}],
    pcOptions: INVESTIGATORS,
    npcs:[
      {name:"Radio tech with frostbitten ears", img:"assets/npcs/white_radio_tech.png"},
      {name:"Pilot grounded by weather", img:"assets/npcs/white_sven.png"},
      {name:"Meteorologist who refuses to sleep", img:"assets/npcs/white_glaciologist.png"},
      {name:"Surgeon counting backwards in Russian", img:"assets/npcs/white_surgeon.png"}
    ]
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
function makeFog(w,h,hidden){
  w = Math.max(0, Math.floor(Number(w)));
  h = Math.max(0, Math.floor(Number(h)));
  const f=[];
  for(let y=0;y<h;y++){
    const row=[];
    for(let x=0;x<w;x++) row.push(Boolean(hidden));
    f.push(row);
  }
  return f;
}

function createState(){
  return {
    settings:{
      openaiKey:'', openaiModel:'gpt-4o-mini', openaiTTSModel:'gpt-4o-mini-tts', openaiVoice:'alloy', browserVoice:'', keeperOn:true,
      useImages:false, imageModel:'dall-e-3',
      ttsOn:false, ttsQueue:true, ttsProviderDefault:'browser',
      elevenKey:'', voiceId:'', elevenModel:'eleven_multilingual_v2',
      rulesPack:'',
      keeperTrigger:'auto',
      keeperStyle:'normal',
      keeperMax:450,
      theme:'dark',
      showTimestamps:false,
      autoScroll:true,
      speechAutoSend:true,
      voiceVolume:1,
      showGrid:true,
      gridW:12,
      gridH:8,
      bgImageSize:'1024x1024',
      voiceMap:{}
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
    memory:{summary:'', scenes:{}},
    aiThinking:false,
    lastRoll:null
  };
}
const state = createState();
const sceneManager = typeof SceneManager !== 'undefined' ? new SceneManager(state) : null;

// give the Narration Director access to the live state
if(typeof director!=='undefined' && director.attachState){
  director.attachState(state);
}

const DEFAULT_SETTINGS = JSON.parse(JSON.stringify(state.settings));
function currentScene(st=state){
  if(!Array.isArray(st.scenes) || st.scenes.length===0) return null;
  const i = clamp(st.sceneIndex, 0, st.scenes.length-1);
  return st.scenes[i] || null;
}

/* ---------- UI HELPERS ---------- */
const byId=id=>document.getElementById(id);
function el(tag,attrs={},children=[]){
  const e=document.createElement(tag);
  for(const k in attrs){
    if(k==='class') e.className=attrs[k];
    else if(k==='html') e.innerHTML=attrs[k];
    else if(k==='value') e.value=attrs[k];
    else if(k==='checked' || k==='selected') e[k]=!!attrs[k];
    else if(k==='style' && typeof attrs[k]==='object') Object.assign(e.style, attrs[k]);
    else if(k==='dataset' && typeof attrs[k]==='object') Object.assign(e.dataset, attrs[k]);
    else if(/^on/.test(k) && typeof attrs[k]==='function') e[k]=attrs[k];
    else e.setAttribute(k,attrs[k]);
  }
  if(!Array.isArray(children)){
    // Accept NodeList/HTMLCollection but treat strings as single nodes
    if(children && typeof children !== 'string' && typeof children.length==='number' && !children.nodeType){
      children = Array.from(children);
    } else {
      children=[children];
    }
  }
  // Preserve falsy-but-valid children like 0 while omitting only null/undefined
  children.filter(c=> c!==null && c!==undefined)
    .forEach(c=> e.appendChild(typeof c==='string'? document.createTextNode(c): c));
  return e;
}
function toast(msg){ const t=byId('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800); }
function applyTheme(){ document.body.classList.toggle('light', state.settings.theme==='light'); }
function applyGridVisibility(){ byId('grid').style.display = state.settings.showGrid ? '' : 'none'; }
function applyGridSize(){
  GRID_W = clamp(Math.floor(Number(state.settings.gridW)||12),1,50);
  GRID_H = clamp(Math.floor(Number(state.settings.gridH)||8),1,50);
  const label = byId('gridSize');
  if(label) label.textContent = `${GRID_W} × ${GRID_H}`;
  state.scenes.forEach(sc=>{
    sc.fog = makeFog(GRID_W, GRID_H, true);
    sc.tokens.forEach(t=>{ t.x = clamp(t.x,0,GRID_W-1); t.y = clamp(t.y,0,GRID_H-1); });
  });
  renderFog();
  renderTokens();
}
function toggleGrid(){ state.settings.showGrid=!state.settings.showGrid; applyGridVisibility(); saveSettings(false); }
function escapeHtml(s){
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  // Preserve valid falsy values like 0 while still handling null/undefined
  return String(s ?? '').replace(/[&<>"']/g, c => map[c]);
}
function stripTags(s){
  const d=document.createElement('div');
  // Sanitize first so script/style content is dropped entirely
  d.innerHTML=sanitizeHtml(String(s ?? ''));
  return d.textContent||d.innerText||'';
}
function sanitizeHtml(html){
  const t=document.createElement('template');
  // Preserve falsy-but-valid values like 0 instead of defaulting to empty string
  t.innerHTML=String(html ?? '');
  t.content.querySelectorAll('script,style,iframe,object,link,meta,base,form,input,button,textarea,select,noscript,video,audio,embed').forEach(el=>el.remove());
  t.content.querySelectorAll('*').forEach(el=>{
    [...el.attributes].forEach(a=>{
      if(/^on/i.test(a.name) || /javascript:/i.test(a.value)) el.removeAttribute(a.name);
    });
  });
  return t.innerHTML;
}
function clamp(v,a,b){
  let min=Number(a), max=Number(b);
  // Treat undefined/NaN bounds as infinite rather than 0
  if(Number.isNaN(min)) min=-Infinity;
  if(Number.isNaN(max)) max=Infinity;
  if(min>max) [min,max] = [max,min];
  const num=Number(v);
  if(Number.isNaN(num)) return Number.isFinite(min) ? min : 0;
  return Math.max(min, Math.min(max, num));
}
// Safely clone simple objects, preserving null/undefined without throwing
function deepClone(o){
  if(o==null) return o;
  if(typeof structuredClone==='function'){
    try{ return structuredClone(o); }catch{}
  }
  if(o instanceof Date) return new Date(o.getTime());
  if(o instanceof Map) return new Map(Array.from(o.entries()).map(([k,v])=>[deepClone(k),deepClone(v)]));
  if(o instanceof Set) return new Set(Array.from(o.values()).map(deepClone));
  if(Array.isArray(o)) return o.map(deepClone);
  if(typeof o === 'object'){
    const out={};
    Object.keys(o).forEach(k=>{ out[k]=deepClone(o[k]); });
    return out;
  }
  return o;
}
function timestampEl(ts=null){
  if(!state.settings.showTimestamps) return null;
  const t = ts ?? new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  return el('span',{class:'timestamp'}, String(t));
}

/* ---------- PERSISTENCE ---------- */
function sanitizeSettings(s){
  const km = Number(s.keeperMax);
  s.keeperMax = clamp(Number.isFinite(km) ? km : 450, 1, 1000);
  const vol = Number(s.voiceVolume);
  s.voiceVolume = Number.isFinite(vol) ? clamp(vol, 0, 1) : 1;
  const gw = Number(s.gridW);
  s.gridW = Number.isFinite(gw) ? clamp(Math.floor(gw),1,50) : 12;
  const gh = Number(s.gridH);
  s.gridH = Number.isFinite(gh) ? clamp(Math.floor(gh),1,50) : 8;
  if(!['256x256','512x512','1024x1024'].includes(s.bgImageSize)) s.bgImageSize='1024x1024';
  if(!['light','dark'].includes(s.theme)) s.theme='dark';
  if(!['auto','manual'].includes(s.keeperTrigger)) s.keeperTrigger='auto';
  if(!['browser','eleven','openai','none'].includes(s.ttsProviderDefault)) s.ttsProviderDefault='browser';
  if(typeof s.browserVoice !== 'string') s.browserVoice='';
  const toBool=v=> (v===true || v==='true' || v===1 || v==='1');
  s.keeperOn = toBool(s.keeperOn);
  s.useImages = toBool(s.useImages);
  s.ttsOn = toBool(s.ttsOn);
  s.ttsQueue = toBool(s.ttsQueue);
  s.showTimestamps = toBool(s.showTimestamps);
  s.autoScroll = !(s.autoScroll===false || s.autoScroll==='false');
  s.speechAutoSend = toBool(s.speechAutoSend);
}
function saveKeys(){
  try{
    localStorage.setItem(LS_OPENAI_KEY, state.settings.openaiKey || '');
    localStorage.setItem(LS_ELEVEN_KEY, state.settings.elevenKey || '');
  }catch(e){ console.warn('Key save failed', e); }
}
function saveSettings(showToast=true){
  sanitizeSettings(state.settings);
  saveKeys();
  const {openaiKey, elevenKey, ...rest} = state.settings;
  try{
    localStorage.setItem(LS_SETTINGS, JSON.stringify(rest));
    if(showToast) toast('Settings saved');
  }catch(e){
    console.warn('Settings save failed', e);
    if(e.name==='QuotaExceededError'){
      try{
        localStorage.removeItem(LS_SLOTS);
        localStorage.setItem(LS_SETTINGS, JSON.stringify(rest));
        toast('Old saves cleared; settings saved');
      }catch(e2){
        console.error('Settings still not saved', e2);
        toast('Settings not saved: storage full');
      }
    } else {
      toast('Settings not saved: see console');
    }
  }
}
function loadSettings(){
  const raw=localStorage.getItem(LS_SETTINGS); if(raw){ try{ Object.assign(state.settings, JSON.parse(raw)); }catch{} }
  const oa=localStorage.getItem(LS_OPENAI_KEY); if(oa!==null) state.settings.openaiKey=oa;
  const el=localStorage.getItem(LS_ELEVEN_KEY); if(el!==null) state.settings.elevenKey=el;
  sanitizeSettings(state.settings);
  saveKeys();
  byId('openaiKey').value = state.settings.openaiKey;
  byId('openaiModel').value = state.settings.openaiModel;
  byId('openaiTTSModel').value = state.settings.openaiTTSModel || 'gpt-4o-mini-tts';
  byId('openaiVoice').value = state.settings.openaiVoice || 'alloy';
  byId('browserVoice').value = state.settings.browserVoice || '';
  byId('keeperOn').checked = state.settings.keeperOn;
  byId('useImages').checked = state.settings.useImages;
  byId('imageModel').value = state.settings.imageModel;
  byId('bgImageSize').value = state.settings.bgImageSize || '1024x1024';
  byId('elevenKey').value = state.settings.elevenKey;
  byId('voiceId').value = state.settings.voiceId;
  byId('elevenModel').value = state.settings.elevenModel || 'eleven_multilingual_v2';
  byId('ttsOn').checked = state.settings.ttsOn;
  byId('ttsQueue').checked = state.settings.ttsQueue;
  byId('ttsProviderDefault').value = state.settings.ttsProviderDefault || 'browser';
  byId('rulesPack').value = state.settings.rulesPack;
  byId('keeperTrigger').value = state.settings.keeperTrigger || 'auto';
  byId('keeperStyle').value = state.settings.keeperStyle || 'normal';
  byId('keeperMax').value = state.settings.keeperMax || 450;
  byId('gridW').value = state.settings.gridW || 12;
  byId('gridH').value = state.settings.gridH || 8;
  byId('theme').value = state.settings.theme || 'dark';
  byId('showTimestamps').checked = state.settings.showTimestamps || false;
  byId('autoScroll').checked = state.settings.autoScroll !== false;
  byId('speechAutoSend').checked = state.settings.speechAutoSend !== false;
  byId('voiceVolume').value = state.settings.voiceVolume ?? 1;
  applyTheme();
  applyGridSize();
  applyGridVisibility();
}

function resetSettings(){
  if(!confirm('Reset settings to defaults?')) return;
  const ok = state.settings.openaiKey;
  const ek = state.settings.elevenKey;
  state.settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
  state.settings.openaiKey = ok;
  state.settings.elevenKey = ek;
  saveSettings(false);
  loadSettings();
  renderAll();
  toast('Settings reset');
}

/* ---------- MAP RENDER ---------- */
const mapEl=byId('map'), bgEl=byId('mapBg'), fogCv=byId('fog'), reachCv=byId('reach');
function GRID_WPX(){ return mapEl.clientWidth }
function GRID_HPX(){ return mapEl.clientHeight }
function renderAll(){ renderSceneName(); renderBackground(); renderFog(); renderReach(); renderTokens(); renderTokenList(); renderInit(); updateSlots(); updateTurnBanner(); }
function renderSceneName(){ byId('sceneName').textContent=currentScene().name; }
function renderBackground(){
  const sc=currentScene();
  if(!sc.bg){
    const mem=sceneMemory();
    if(mem.bgPrompt && state.settings.useImages && !sc.bgGenerating){
      sc.bgGenerating=true;
      generateBackground(mem.bgPrompt, sc).finally(()=>{ sc.bgGenerating=false; });
    }
  }
  bgEl.style.backgroundImage=sc.bg?`url(${sc.bg})`:'none';
}
function cellStyle(x,y){
  const gx = clamp(Number(x), 0, GRID_W-1);
  const gy = clamp(Number(y), 0, GRID_H-1);
  return `left:${((gx+0.5)/GRID_W)*100}%; top:${((gy+0.5)/GRID_H)*100}%`;
}
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
    const label = `${escapeHtml((t.type||'').toUpperCase())} • ${escapeHtml(t.name||'Unnamed')} @ ${t.x},${t.y}`;
    const row=el('div',{class:'row',style:'justify-content:space-between;margin:.25rem 0;align-items:center;'},
      [el('div',{html:label}),
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
function pxToGrid(px,py){
  let w = Math.abs(Number(GRID_WPX()));
  let h = Math.abs(Number(GRID_HPX()));
  w = w && Number.isFinite(w) ? w : 1;
  h = h && Number.isFinite(h) ? h : 1;
  const gx = clamp(Math.floor((px/w)*GRID_W),0,GRID_W-1);
  const gy = clamp(Math.floor((py/h)*GRID_H),0,GRID_H-1);
  return [gx,gy];
}
function renderFog(){ const cv=fogCv, sc=currentScene(), ctx=cv.getContext('2d'); cv.width=GRID_WPX(); cv.height=GRID_HPX(); ctx.clearRect(0,0,cv.width,cv.height);
  const cw=cv.width/GRID_W, ch=cv.height/GRID_H; ctx.fillStyle='rgba(4,6,10,.82)';
  for(let y=0;y<GRID_H;y++) for(let x=0;x<GRID_W;x++) if(sc.fog[y][x]) ctx.fillRect(Math.floor(x*cw),Math.floor(y*ch),Math.ceil(cw),Math.ceil(ch));
}
function fogStroke(gx,gy,hide){ const sc=currentScene(), before=deepClone(sc.fog), r=Number(byId('brush').value ?? 2);
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
  // During an encounter, only the active player's token can be dragged. AI moves are programmatic.
  if(t.id !== state.youPCId || !isActiveToken(t)) return {ok:false,to:{x:t.x,y:t.y}};
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
  if(draggingToken) renderTokenList();
  draggingToken=null; dragOrig=null; endMeasure();
});
window.addEventListener('resize', ()=>{ renderFog(); renderReach(); });

function tokenAt(gx,gy){ return currentScene().tokens.find(t=>t.x===gx && t.y===gy); }
function startMeasure(start){
  if(measureEl) measureEl.remove();
  measureEl=el('div',{class:'measure'});
  measureEl.appendChild(el('div',{class:'label'}));
  mapEl.appendChild(measureEl);
  updateMeasure(start,start);
}
function updateMeasure(a,b){
  if(!measureEl) return;
  const dx=b[0]-a[0], dy=b[1]-a[1], dist=Math.hypot(dx,dy), ang=Math.atan2(dy,dx)*180/Math.PI;
  Object.assign(measureEl.style,{left:`${a[0]}px`,top:`${a[1]}px`,width:`${dist}px`,transform:`rotate(${ang}deg)`});
  const label = measureEl.querySelector('.label');
  if(label) label.textContent=`${gridDistance(a,b)} u`;
}
function endMeasure(){ if(measureEl){ measureEl.remove(); measureEl=null; } }
function gridDistance(a,b){ const [ax,ay]=pxToGrid(a[0],a[1]), [bx,by]=pxToGrid(b[0],b[1]); return Math.max(Math.abs(ax-bx),Math.abs(ay-by)); }

/* ---------- TOKENS ---------- */
function addToken(t){ const sc=currentScene(); t.id=t.id||('t_'+Math.random().toString(36).slice(2,8)); t.x=clamp(t.x ?? 1,0,GRID_W-1); t.y=clamp(t.y ?? 1,0,GRID_H-1); t.type=t.type||'pc'; t.speed=t.speed ?? 4; t.sheet = t.sheet||defaultSheet(t); sc.tokens.push(t); updateTokenMemory(t); applyDefaultVoices(); renderTokens(); renderTokenList(); }
function removeToken(id){ const sc=currentScene(); sc.tokens=sc.tokens.filter(x=>x.id!==id); renderTokens(); renderTokenList(); renderReach(); }
function editTokenPrompt(t){
  const name=prompt('Name:', t.name||'');
  if(name===null) return;
  const type=prompt('Type (pc|npc):', t.type||'pc');
  if(type===null) return;
  t.name=name.trim();
  // Accept case-insensitive NPC/PC input
  t.type=(type.trim().toLowerCase()==='npc')?'npc':'pc';
  renderTokens();
  renderTokenList();
}

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
  if(!state.encounter.on){ toast('No encounter in progress.'); return; }
  state.encounter.on=false;
  state.aiThinking=false;
  state.encounter.movesLeft = 0;
  state.encounter.actionsLeft = 0;
  state.encounter.bonusLeft = 0;
  clearInit();
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
  const mov = Number(t?.sheet?.speed ?? 8);
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
  const picker=byId('cmdPicker');
  const input=byId('chatInput');
  const v=picker.value;
  if(!v){
    input.focus();
    return;
  }
  if(input.value && !/^\s/.test(input.value)) input.value+=' ';
  input.value += v;
  picker.selectedIndex = 0;
  input.focus();
};
function addLine(text, who='you', opts={}){
  const line = el('div',{class:`line ${who}`,'data-role':opts.role || who});
  const content = el('div',{class:'content'});
  if(who==='you'){
    content.textContent = text;
  } else if(opts.html){
    content.innerHTML = sanitizeHtml(text);
  } else {
    content.textContent = text;
  }

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
    const btn=el('button',{class:'ghost',title:'Replay voice',onclick:async()=>{ await speak(stripTags(text), opts.speaker||'Keeper', opts.role || (who==='keeper'?'keeper':'pc')); }},'▶');
    controls.appendChild(btn);
  }
  const time = timestampEl(opts.ts); if(time) line.appendChild(time);
  if(controls.childNodes.length) line.appendChild(controls);
  chatLog.appendChild(line);
  if(state.settings.autoScroll) chatLog.scrollTop=chatLog.scrollHeight;
  const speaker = who==='keeper' ? (opts.speaker||'Keeper') : (opts.speaker||'You');
  recordEvent(`${speaker}: ${stripTags(text)}`);
}
function addSay(speaker, text, role='pc', opts={}){
  const line=el('div',{class:'line', 'data-role':role});
  const av=el('div',{class:'avatar'});
  const img=el('img',{src: speakerAvatar(speaker), alt:speaker});
  av.appendChild(img);
  const whoEl=el('div',{class:'who'}, speaker);
  whoEl.style.color = role==='npc' ? '#e3b9ff' : '#b2ffda';
  const content=el('div',{class:'content', html: escapeHtml(text)});
  const controls=el('div',{class:'controls'});
  if(state.settings.ttsOn){
    controls.appendChild(el('button',{class:'ghost',title:'Replay voice',onclick:()=> speak(stripTags(text), speaker, role)},'▶'));
  }
  line.appendChild(av);
  line.appendChild(whoEl);
  line.appendChild(content);
  const time = timestampEl(opts.ts); if(time) line.appendChild(time);
  if(controls.childNodes.length) line.appendChild(controls);
  chatLog.appendChild(line);
  if(state.settings.autoScroll) chatLog.scrollTop=chatLog.scrollHeight;
  const token=currentScene().tokens.find(t => t.name===speaker);
  if(token) token.lastSaid = stripTags(text);
  // Strip any HTML before logging the event to avoid leaking markup
  recordEvent(`${speaker}: ${stripTags(text)}`);
}

function addActionLine(text, ts=null){
  const line=el('div',{class:'line action'});
  line.textContent=text;
  const time=timestampEl(ts); if(time) line.appendChild(time);
  chatLog.appendChild(line);
  if(state.settings.autoScroll) chatLog.scrollTop=chatLog.scrollHeight;
  recordEvent(text);
}

function addSystemMessage(text, {html=false, ts=null}={}){
  const content = html ? sanitizeHtml(text) : escapeHtml(text);
  const line=el('div',{class:'line system'});
  line.appendChild(el('div',{class:'who'}, '⚙️ System'));
  line.appendChild(el('div',{class:'content', html:content}));
  const time=timestampEl(ts); if(time) line.appendChild(time);
  chatLog.appendChild(line);
  if(state.settings.autoScroll) chatLog.scrollTop=chatLog.scrollHeight;
}

function addWhisper(target, text, ts=null){
  const line=el('div',{class:'line whisper'},[
    el('div',{class:'who', html:`Whisper to ${escapeHtml(target)}`}),
    el('div',{class:'content', html: escapeHtml(text)})
  ]);
  const time=timestampEl(ts); if(time) line.appendChild(time);
  chatLog.appendChild(line);
  if(state.settings.autoScroll) chatLog.scrollTop=chatLog.scrollHeight;
  // Sanitize target and text before logging the whisper
  recordEvent(`Whisper to ${stripTags(target)}: ${stripTags(text)}`);
}
function speakerAvatar(name){
  const key=(name||'').trim().toLowerCase();
  const t=currentScene().tokens.find(x=> (x.name||'').trim().toLowerCase()===key);
  if(t?.portraitData) return t.portraitData;
  const np=(state.campaign?.npcPortraits||[]).find(p=> ((p.name||p.role||'').trim().toLowerCase())===key);
  if(np?.portraitData) return np.portraitData;
  const cv=document.createElement('canvas');
  cv.width=64; cv.height=64;
  const ctx=cv.getContext('2d');
  ctx.fillStyle='#0e1524';
  ctx.fillRect(0,0,64,64);
  ctx.fillStyle='#9fb4ff';
  ctx.font='bold 20px ui-monospace,monospace';
  ctx.textAlign='center';
  ctx.textBaseline='middle';
  const inis=(name||'??').trim().split(/\s+/).slice(0,2).map(s=>s[0]?.toUpperCase()||'').join('');
  ctx.fillText(inis,32,32);
  return cv.toDataURL('image/png');
}

byId('chatSend').onclick=sendChat;
byId('chatInput').addEventListener('keydown',e=>{ if(e.key==='Enter') sendChat(); });
byId('btnStopVoice').onclick=()=> stopVoice(true);
byId('btnAskKeeper').onclick=()=> askKeeperFromInput();
// Speech to text
const wave = byId('speechWave');
let waveStream, waveCtx, waveAnalyser, waveData, waveRAF;
function startWave(){
  if(!wave) return;
  wave.classList.add('show');
  if(!navigator.mediaDevices) return;
  navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
    waveStream=stream;
    waveCtx=new (window.AudioContext||window.webkitAudioContext)();
    const src=waveCtx.createMediaStreamSource(stream);
    waveAnalyser=waveCtx.createAnalyser();
    waveAnalyser.fftSize=256;
    src.connect(waveAnalyser);
    waveData=new Uint8Array(waveAnalyser.fftSize);
    const bars=[...wave.children];
    (function draw(){
      waveAnalyser.getByteTimeDomainData(waveData);
      let sum=0; for(let i=0;i<waveData.length;i++){ const v=(waveData[i]-128)/128; sum+=v*v; }
      const rms=Math.sqrt(sum/waveData.length);
      bars.forEach(b=> b.style.height = (4 + rms*16*Math.random())+'px');
      waveRAF=requestAnimationFrame(draw);
    })();
  }).catch(()=> wave.classList.remove('show'));
}
function stopWave(){
  if(!wave) return;
  wave.classList.remove('show');
  cancelAnimationFrame(waveRAF);
  if(waveStream){ waveStream.getTracks().forEach(t=>t.stop()); waveStream=null; }
  if(waveCtx){ waveCtx.close(); waveCtx=null; }
}
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if(SpeechRecognition){
  const rec = new SpeechRecognition();
  rec.lang = 'en-US';
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = e => {
    const text = e.results[0][0].transcript;
    const input = byId('chatInput');
    input.value = text;
    if(state.settings.speechAutoSend) sendChat();
  };
  rec.onend = ()=> { byId('btnSpeech').classList.remove('recording'); stopWave(); };
  rec.onerror = ()=> { byId('btnSpeech').classList.remove('recording'); stopWave(); };
  byId('btnSpeech').onclick = () => {
    const btn = byId('btnSpeech');
    if(btn.classList.contains('recording')){
      rec.stop();
      btn.classList.remove('recording');
      stopWave();
    }else{
      btn.classList.add('recording');
      startWave();
      rec.start();
    }
  };
}else{
  byId('btnSpeech').style.display='none';
  if(wave) wave.style.display='none';
}
byId('btnCopyChat').onclick=()=>{ const text=[...chatLog.querySelectorAll('.line')].map(l=>l.innerText.trim()).join('\n'); navigator.clipboard.writeText(text).then(()=>toast('Chat copied')); };
byId('btnClearChat').onclick=()=>{ if(confirm('Clear chat log?')){ chatLog.innerHTML=''; state.chat=[]; }};
function askKeeperFromInput(){
  const input=byId('chatInput');
  const val=input.value.trim();
  if(!val) return;
  addLine(val,'you');
  if(state.settings.keeperOn){
    keeperReply(val);
  }
  input.value='';
}
function sendChat(){ const val=byId('chatInput').value.trim(); if(!val) return; byId('chatInput').value=''; addLine(val,'you');
  if(val.startsWith('/')){ runSlash(val); return; }
  if(!state.settings.keeperOn) return;
  if((state.settings.keeperTrigger||'auto')==='auto'){ keeperReply(val); }
}

/* ---------- SLASH ---------- */
function runSlash(val){
  const ck=val.match(/^\/check\s+([A-Za-z][A-Za-z0-9 _-]*)(?:\s+(\d{1,3}))?$/i);
  if(ck){
    const skill=ck[1].trim();
    const you=currentScene().tokens.find(t=> t.id===state.youPCId);
    let base;
    if(ck[2]){
      base=clamp(Number(ck[2]),1,99);
    }else if(you){
      ensureSheet(you);
      const entry=Object.entries(you.sheet.skills||{}).find(([k])=>k.toLowerCase()===skill.toLowerCase());
      if(entry) base=clamp(Number(entry[1]),1,99);
    }
    if(base==null){ addSystemMessage(`No skill value found for ${skill}.`); return; }
    const r = rollPercentile(skill, base);
    addSystemMessage(r.text, {html:true});
    if(you) state.lastRoll={who:you.id,skill,roll:r.roll,val:base,tier:r.tier};
    return;
  }

  const kv=val.match(/^\/keeper\s+(.+)/i);
  if(kv){
    if(state.settings.keeperOn){
      keeperReply(kv[1]);
    }else{
      addSystemMessage('Keeper is disabled.');
    }
    return;
  }

  const m=val.match(/^\/roll\s+(.+)$/i); if(m){ doRoll(m[1], {who:'you'}); return; }
  if(/^\/luck$/i.test(val)){
    const you=currentScene().tokens.find(t=> t.id===state.youPCId);
    if(!you){ addSystemMessage('No active PC to roll Luck.'); return; }
    ensureSheet(you);
    if(you.sheet.luckRolled){ addSystemMessage('Luck can only be rolled at the start of a new game.'); return; }
    const roll=1+Math.floor(Math.random()*100);
    const old=you.sheet.luck||0;
    let gain;
    if(roll>old){
      gain=10+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);
    }else{
      gain=5+Math.floor(Math.random()*10);
    }
    you.sheet.luck = Math.min(99, old + gain);
    you.sheet.luckRolled=true;
    addSystemMessage(`${you.name}: Luck roll ${roll} → gain ${gain} (Luck ${you.sheet.luck})`);
    return;
  }
  const sp=val.match(/^\/spendluck\s+(\d+)$/i);
  if(sp){ const amt=Number(sp[1]); const you=currentScene().tokens.find(t=> t.id===state.youPCId); if(!you){ addSystemMessage('No active PC to spend Luck.'); return; } ensureSheet(you); const lr=state.lastRoll; if(!lr||lr.who!==you.id||lr.tier!=='Failure'){ addSystemMessage('No failed roll to improve with Luck.'); return; } const needed=lr.roll - lr.val; if(amt<needed){ addSystemMessage(`Need ${needed} Luck to succeed.`); return; } if((you.sheet.luck||0)<amt){ addSystemMessage('Not enough Luck.'); return; } you.sheet.luck-=amt; state.lastRoll=null; addSystemMessage(`${you.name} spends ${amt} Luck to succeed. Remaining Luck ${you.sheet.luck}.`); return; }
  const mv=val.match(/^\/move\s+(.+)\s+to\s+(\d+)\s*,\s*(\d+)$/i);
  if(mv){ const nameOrId=mv[1].trim(); const t=currentScene().tokens.find(x=> x.id===nameOrId || (x.name||'').toLowerCase()===nameOrId.toLowerCase()); if(!t){ addSystemMessage("No such token."); return; } tryMoveCommand(t, Number(mv[2]), Number(mv[3])); return; }
  if(/^\/endturn/i.test(val)){ endTurn(); return; }
  if(/^\/help/i.test(val)){ show('#modalHelp'); return; }
  addSystemMessage("Unknown command. Try /help.");
}
function tryMoveCommand(t,gx,gy,isProgrammatic=false){
  if(!Number.isFinite(gx) || !Number.isFinite(gy)){
    addSystemMessage('Invalid move coordinates.');
    return;
  }
  const orig={x:t.x,y:t.y};

  if(state.encounter.on && !isProgrammatic){
    const can=canMoveTo(t,gx,gy,orig);
    if(!can.ok){ addSystemMessage(`Can’t move ${t.name} there right now.`); return; }
    t.x=can.to.x; t.y=can.to.y;
    const moved=chebyshev(orig.x,orig.y,t.x,t.y);
    state.encounter.movesLeft=Math.max(0,state.encounter.movesLeft-moved);
  }else if(state.encounter.on && isProgrammatic){
    const target={x:clamp(gx,0,GRID_W-1), y:clamp(gy,0,GRID_H-1)};
    const dist=chebyshev(orig.x,orig.y,target.x,target.y);
    if(dist>state.encounter.movesLeft){
      addActionLine(`* ${t.name} tries to move to ${target.x},${target.y} but lacks the movement. *`);
      return;
    }
    t.x=target.x; t.y=target.y;
    state.encounter.movesLeft=Math.max(0,state.encounter.movesLeft-dist);
    addActionLine(`* ${t.name} moves to ${t.x},${t.y}. *`);
  }else{
    t.x=clamp(gx,0,GRID_W-1); t.y=clamp(gy,0,GRID_H-1);
  }

  renderTokens();
  renderReach();
  updateTokenMemory(t);
  updateTurnBanner();
  renderTokenList();
  if(!isProgrammatic) spawnFXAt(t.x,t.y);
}

/* ---------- SIMPLE DICE (chat-only) ---------- */
function doRoll(expr, opts={}){
  let p=expr.trim().toLowerCase().replace(/\s+/g,'');
  p=p.replace(/^d/,'1d').replace(/d%/g,'d100');
  const m=p.match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if(!m){ addSystemMessage(`Bad roll: ${expr}`); return; }
  const n=Number(m[1]), sides=Number(m[2]), mod=Number(m[3]||0);
  if(n<1 || sides<1 || n>100 || sides>1000){ addSystemMessage('Roll too large.'); return; }
  const rolls=[];
  for(let i=0;i<n;i++) rolls.push(1+Math.floor(Math.random()*sides));
  const sum=rolls.reduce((a,b)=>a+b,0)+mod;
  const note = opts.note ? ` (${escapeHtml(opts.note)})` : '';
  const prefix = opts.who ? `${escapeHtml(opts.who)}: ` : '';
  const line = `${prefix}Roll ${n}d${sides}${mod?(mod>0?`+${mod}`:mod):''}${note} → ${sum} [${rolls.join(', ')}]`;
  addSystemMessage(line);
  return {n,sides,mod,rolls,sum};
}

/* Percentile check with tiers */
function rollPercentile(skillName, skillVal){
  const val = clamp(Number(skillVal) || 0, 1, 99);
  const roll = 1+Math.floor(Math.random()*100);
  const hard = Math.floor(val/2), extreme = Math.max(1,Math.floor(val/5));
  let tier = (roll<=extreme) ? 'Extreme Success' : (roll<=hard) ? 'Hard Success' : (roll<=val) ? 'Success' : 'Failure';
  if(roll===1) tier='Critical Success';
  if(roll===100) tier='Fumble';
  const luckNeeded = roll>val ? roll-val : 0;
  const safeName = escapeHtml(skillName);
  const text = `Check ${safeName} ${val}: d100 → ${roll} → <b>${tier}</b>${luckNeeded?` (needs ${luckNeeded} Luck)`:''}`;
  return {roll, tier, text, val, luckNeeded};
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
  state.settings.openaiTTSModel=byId('openaiTTSModel').value.trim();
  state.settings.openaiVoice=byId('openaiVoice').value.trim();
  state.settings.browserVoice=byId('browserVoice').value;
  state.settings.keeperOn=byId('keeperOn').checked;
  state.settings.useImages=byId('useImages').checked;
  state.settings.imageModel=byId('imageModel').value;
  state.settings.bgImageSize=byId('bgImageSize').value;
  state.settings.elevenKey=byId('elevenKey').value.trim();
  state.settings.voiceId=byId('voiceId').value.trim();
  state.settings.elevenModel=byId('elevenModel').value.trim();
  state.settings.ttsOn=byId('ttsOn').checked;
  state.settings.ttsQueue=byId('ttsQueue').checked;
  state.settings.ttsProviderDefault=byId('ttsProviderDefault').value;
  state.settings.rulesPack=byId('rulesPack').value;
  state.settings.keeperTrigger=byId('keeperTrigger').value;
  state.settings.keeperStyle=byId('keeperStyle').value;
  state.settings.keeperMax=Number(byId('keeperMax').value)||450;
  state.settings.gridW=Number(byId('gridW').value)||12;
  state.settings.gridH=Number(byId('gridH').value)||8;
  state.settings.theme=byId('theme').value;
  state.settings.showTimestamps=byId('showTimestamps').checked;
  state.settings.autoScroll=byId('autoScroll').checked;
  state.settings.speechAutoSend=byId('speechAutoSend').checked;
  state.settings.voiceVolume=Number(byId('voiceVolume').value);
  applyTheme();
  applyGridSize();
  applyDefaultVoices();
  saveSettings(); hide('#modalSettings');
};
byId('btnResetSettings').onclick=resetSettings;

byId('btnRevealAll').onclick=()=> fogAll(false);
byId('btnHideAll').onclick=()=> fogAll(true);
byId('btnUndo').onclick=fogUndo;
byId('btnToggleGrid').onclick=toggleGrid;
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
  renderTokens();
  renderTokenList();
  renderReach();
  spawnFXAt(Math.floor(GRID_W/2), Math.floor(GRID_H/2));
  toast('Tokens centered');
}

/* Scenes modal */
byId('btnSetBG').onclick=()=>{ const d=byId('sceneBgData').value.trim(); if(!d) return; currentScene().bg=d; renderBackground(); toast('Background set'); };
byId('btnGenBG2').onclick=async()=>{ const p=byId('bgPrompt').value.trim()||'moody archive'; await generateBackground(p); };
byId('btnAddScene').onclick=()=> addScene(byId('sceneTitle').value.trim()||'New Scene');
byId('btnSwitchScene2').onclick=()=> { const idx=Number(prompt('Switch to scene index (0..N-1)?', String(state.sceneIndex)))||0; switchScene(idx); hide('#modalScenes'); };
function addScene(name){ state.scenes.push(newScene(name||'New Scene')); updateSceneList(); toast('Scene added'); }
function switchScene(idx){
  if(idx<0||idx>=state.scenes.length) return;
  state.sceneIndex=idx;
  if(typeof sceneManager!=='undefined') sceneManager.onSceneChange();
  renderAll();
  toast('Switched scene');
}
function renameScene(i){
  const name=prompt('New scene name', state.scenes[i].name);
  if(name){ state.scenes[i].name=name; renderSceneName(); updateSceneList(); toast('Scene renamed'); }
}
function deleteScene(i){
  if(state.scenes.length<=1){ toast('At least one scene required'); return; }
  if(!confirm('Delete this scene?')) return;
  state.scenes.splice(i,1);
  if(state.sceneIndex>=state.scenes.length) state.sceneIndex=state.scenes.length-1;
  renderAll();
  updateSceneList();
  toast('Scene deleted');
}
function updateSceneList(){
  const wrap=byId('sceneList'); wrap.innerHTML='';
  state.scenes.forEach((s,i)=> wrap.appendChild(el('div',{class:'row',style:'justify-content:space-between;align-items:center;margin:.25rem 0;'},[
    el('div',{class:'meta small'},[el('div',{html:`<b>${escapeHtml(s.name)}</b>`}), el('div',{class:'ts'},[`ID: ${s.id}`])]),
    el('div',{class:'row'},[
      el('button',{class:'ghost',onclick:()=> switchScene(i)},'Switch'),
      el('button',{class:'ghost',onclick:()=> renameScene(i)},'Rename'),
      el('button',{class:'danger',onclick:()=> deleteScene(i)},'Delete')
    ])
  ])));
}

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
  ctrls.appendChild(el('button',{class:'ghost',onclick:()=>{ const n=prompt('Rename',t.name||''); if(n!==null){ const old=t.name; t.name=n; if(state.settings.voiceMap?.[old]){ state.settings.voiceMap[n]=state.settings.voiceMap[old]; delete state.settings.voiceMap[old]; saveSettings(false); } renderTokens(); renderParty(); }}},'Rename'));
  ctrls.appendChild(el('button',{class:'danger',onclick:()=>{ removeToken(t.id); renderParty(); }},'Remove'));
  row.appendChild(ctrls);

  // Voice controls for this PC
  row.appendChild(voiceControlsForName(t.name||'PC'));
  return row;
}
function voiceControlsForName(actor){
  if(typeof actor==='string') actor={name:actor};
  const name=actor.name;
  const parts=[];
  const sex=actor.sex==='M'? 'Male' : (actor.sex==='F'? 'Female' : actor.sex);
  if(sex) parts.push(sex);
  if(actor.age!=null) parts.push(actor.age);
  const label = parts.length? `${name} (${parts.join(', ')})` : name;

  const wrap=el('div',{class:'row',style:'margin-top:.35rem;align-items:center;flex-wrap:wrap'});
  wrap.appendChild(el('div',{class:'small',style:'min-width:12rem'},label));
  wrap.appendChild(el('div',{class:'small'},'Voice:'));
  const provSel=el('select',{});
  ['browser','eleven','openai','none'].forEach(p=>
    provSel.appendChild(el('option',{value:p, selected:(state.settings.voiceMap?.[name]?.provider || state.settings.ttsProviderDefault || 'browser')===p}, p)));
  const voiceSel=el('select',{}); // browser voices
  const voiceInp=el('input',{placeholder:'Voice ID or Name'}); // eleven/openai
  const role = actor.type || (name==='Keeper'?'npc':'pc');
  const testBtn=el('button',{class:'ghost',onclick:()=> speak(`It is I, ${name}.`, name, role)},'Test');

  // fill browser voices
  const chosenId = state.settings.voiceMap?.[name]?.id || state.settings.browserVoice || '';
  function fillVoiceOptions(){
    voiceSel.innerHTML='';
    if(provSel.value==='browser'){
      (state.browserVoices||[]).forEach(v=>{
        const opt=el('option',{value:v.name}, v.name);
        if(v.name===chosenId) opt.selected=true;
        voiceSel.appendChild(opt);
      });
      if(!voiceSel.value && voiceSel.options.length){ voiceSel.value = voiceSel.options[0].value; }
    }
  }
  fillVoiceOptions();

  function refreshVis(){
    voiceSel.style.display = (provSel.value==='browser') ? 'inline-block' : 'none';
    voiceInp.style.display = (provSel.value==='eleven' || provSel.value==='openai') ? 'inline-block' : 'none';
  }

  function updateMap(){
    const idVal = (provSel.value==='browser') ? voiceSel.value : ((provSel.value==='eleven' || provSel.value==='openai') ? voiceInp.value.trim() : '');
    state.settings.voiceMap = state.settings.voiceMap || {};
    if(provSel.value==='none'){
      delete state.settings.voiceMap[name];
    }else{
      state.settings.voiceMap[name] = {provider: provSel.value, id: idVal, auto:false};
    }
    saveSettings(false);
  }

  provSel.onchange = ()=>{ fillVoiceOptions(); refreshVis(); updateMap(); };
  voiceSel.onchange = updateMap;
  voiceInp.onchange = updateMap;

  // initialize inputs
  if(chosenId && (provSel.value==='browser')){ voiceSel.value=chosenId; }
  if(state.settings.voiceMap?.[name]?.provider==='eleven' || state.settings.voiceMap?.[name]?.provider==='openai'){
    voiceInp.value = state.settings.voiceMap?.[name]?.id || '';
  }
  refreshVis();

  wrap.appendChild(provSel);
  wrap.appendChild(voiceSel);
  wrap.appendChild(voiceInp);
  wrap.appendChild(testBtn);
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
  ctrls.appendChild(el('button',{class:'ghost',onclick:()=>{ const n=prompt('Rename',t.name||''); if(n!==null){ const old=t.name; t.name=n; if(state.settings.voiceMap?.[old]){ state.settings.voiceMap[n]=state.settings.voiceMap[old]; delete state.settings.voiceMap[old]; saveSettings(false); } renderTokens(); renderNPCs(); }}},'Rename'));
  ctrls.appendChild(el('button',{class:'danger',onclick:()=>{ removeToken(t.id); renderNPCs(); }},'Remove'));
  row.appendChild(ctrls);
  row.appendChild(voiceControlsForName(t));
  return row;
}
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
    `${ho.imageUrl?`<br><img src="${escapeHtml(ho.imageUrl)}" alt="${escapeHtml(ho.title||'handout')}">`:''}`+
    `<div class="small">${escapeHtml(ho.text||'')}</div></div>`;
  addLine(html,'keeper',{speaker:'Keeper',role:'npc',html:true});
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
  addSystemMessage(`<b>Clue:</b> ${escapeHtml(c.title||'')} — ${escapeHtml(c.text||'')}`, {html:true});
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

/* ---------- SETTINGS SAVE SLOTS ---------- */
function loadSlots(){
  const raw = localStorage.getItem(LS_SLOTS);
  if(!raw) return Array(6).fill(null);
  try{
    const parsed = JSON.parse(raw);
    if(!Array.isArray(parsed)) return Array(6).fill(null);
    // Always return exactly six slots, padding or trimming as needed
    return Array.from({length:6},(_,i)=> parsed[i] || null);
  }catch(e){
    console.warn('Could not parse save slots', e);
    return Array(6).fill(null);
  }
}
function saveSlots(slots){
  try{
    localStorage.setItem(LS_SLOTS, JSON.stringify(slots));
    return true;
  }catch(e){
    console.error('Save failed', e);
    toast('Save failed: '+(e.name==='QuotaExceededError'?'storage full':'see console'));
    return false;
  }
}
function updateSlots(){
  const wrap = byId('slots');
  if(!wrap) return;
  wrap.innerHTML='';
  const slots = loadSlots();
  for(let i=0;i<6;i++){
    const slot = slots[i]||null;
    const used = !!slot;
    const row = el('div',{class:'slot'+(used?' used':'')},[
      el('div',{class:'meta'},[
        el('div',{class:'slotname'},`Slot ${i+1}`),
        el('div',{class:'title'}, used? (slot.meta?.name||'Settings') : 'Empty'),
        el('div',{class:'ts'}, used? new Date(slot.meta?.ts||Date.now()).toLocaleString(): '')
      ]),
      el('div',{class:'row buttons'},[
        el('button',{class:'ghost',onclick:()=> saveToSlot(i)},'\uD83D\uDCBE Save'),
        el('button',{class:'warn',onclick:()=> loadFromSlot(i),disabled:!used},'\uD83D\uDCC2 Load'),
        el('button',{class:'danger',onclick:()=> clearSlot(i),disabled:!used},'\uD83D\uDDD1\uFE0F Clear')
      ])
    ]);
    wrap.appendChild(row);
  }
}

function captureSettingsSlot(){
  return { meta:{ts:Date.now(), name:'Settings'}, settings: deepClone(state.settings) };
}
function applySettingsSlot(data){
  Object.assign(state.settings, data.settings||{});
  saveSettings(false);
  loadSettings();
  renderAll();
}

/* ---------- FULL STATE EXPORT/IMPORT (assets included) ---------- */

function captureChat(){
  const lines=[];
  chatLog.querySelectorAll('.line').forEach(l=>{
    const ts = l.querySelector('.timestamp')?.textContent || null;
    if(l.classList.contains('action')){ lines.push({type:'action',text:l.textContent,ts}); return; }
    if(l.classList.contains('system')){ lines.push({type:'system',html:l.querySelector('.content')?.innerHTML||'',ts}); return; }
    if(l.classList.contains('keeper')){
      const html=l.querySelector('.content')?.innerHTML||'';
      const speaker=(l.querySelector('.who')?.textContent||'').replace(/^👁️\s*/, '');
      const role=l.dataset.role || 'keeper';
      lines.push({type:'keeper',html,speaker,role,ts}); return;
    }
    if(l.classList.contains('you')){ lines.push({type:'you',text:l.querySelector('.content')?.textContent||'',ts}); return; }
    if(l.classList.contains('whisper')){
      const target=(l.querySelector('.who')?.textContent||'').replace(/^Whisper to\s*/, '');
      lines.push({type:'whisper',target,text:l.querySelector('.content')?.textContent||'',ts});
      return;
    }
    const role=l.dataset.role || 'pc';
    const speaker=l.querySelector('.who')?.textContent||'';
    const text=l.querySelector('.content')?.textContent||'';
    lines.push({type:'say',speaker,text,role,ts});
  });
  return lines;
}
function restoreChat(lines){
  restoringChat=true;
  chatLog.innerHTML='';
  (lines||[]).forEach(l=>{
    if(l.type==='action') addActionLine(l.text, l.ts);
    else if(l.type==='system') addSystemMessage(l.html, {html:true, ts:l.ts});
    else if(l.type==='keeper') addLine(l.html,'keeper',{speaker:l.speaker,role:l.role||'keeper',html:true,ts:l.ts});
    else if(l.type==='you') addLine(l.text,'you',{ts:l.ts});
    else if(l.type==='whisper') addWhisper(l.target,l.text,l.ts);
    else if(l.type==='say') addSay(l.speaker,l.text,l.role||'pc',{ts:l.ts});
  });
  restoringChat=false;
}
function captureState(){
  return {
    meta:{ts:Date.now(), name: currentScene().name},
    settings: deepClone(state.settings),
    sceneIndex: state.sceneIndex,
    scenes: deepClone(state.scenes),
    campaign: deepClone(state.campaign),
    youPCId: state.youPCId,
    npcCatalog: deepClone(state.npcCatalog),
    chat: captureChat(),
    initOrder: deepClone(state.initOrder),
    activeTurn: state.activeTurn,
    encounter: deepClone(state.encounter),
    memory: state.memory
  };
}
function applyState(data){
  Object.assign(state.settings, data.settings||{});
  // Persist any settings from the loaded state so voice and other prefs survive reloads
  saveSettings(false);
  state.sceneIndex=data.sceneIndex||0;
  state.scenes=data.scenes||[newScene('Recovered')];
  state.campaign=data.campaign||null;
  state.youPCId=data.youPCId||null;
  state.npcCatalog=data.npcCatalog||[];
  state.initOrder=data.initOrder||[];
  state.activeTurn=data.activeTurn||0;
  state.encounter=data.encounter||{on:false,movesLeft:0,actionsLeft:0,bonusLeft:0};
  state.memory = (typeof data.memory==='string') ? {summary:data.memory, scenes:{}} : (data.memory||{summary:'',scenes:{}});
  state.chat=data.chat||[];
  loadSettings(); renderAll();
  restoreChat(state.chat);
  renderClues();
  renderHandouts();
}
function saveToSlot(i){
  saveSettings(false);
  const slots = loadSlots();
  slots[i] = captureSettingsSlot();
  const ok = saveSlots(slots);
  updateSlots();
  if(ok) toast('Saved.');
}
function loadFromSlot(i){
  const slots=loadSlots();
  if(!slots[i]){ toast('Empty slot'); return; }
  applySettingsSlot(slots[i]);
  toast('Loaded.');
}
function clearSlot(i){ const slots=loadSlots(); slots[i]=null; saveSlots(slots); updateSlots(); }
byId('btnExport').onclick=()=>{ const blob=new Blob([JSON.stringify(captureState(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='solo-investigator-save.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 2000); };
byId('btnExportSlots').onclick=()=>{ const blob=new Blob([JSON.stringify(loadSlots(),null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='solo-investigator-slots.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 2000); };
byId('btnImport').onclick=()=>{ try{ const data=JSON.parse(byId('importText').value.trim()); applyState(data); toast('Imported.'); }catch{ toast('Bad JSON'); } };
byId('importFile').addEventListener('change', async e=>{ const f=e.target.files[0]; if(!f) return; try{ const txt=await f.text(); const data=JSON.parse(txt); applyState(data); toast('Imported.'); }catch{ toast('Bad JSON'); } finally{ e.target.value=''; } });
byId('importSlotsFile').addEventListener('change', async e=>{
  const f=e.target.files[0]; if(!f) return;
  try{
    const txt=await f.text();
    const data=JSON.parse(txt);
    if(Array.isArray(data)){
      const arr=Array(6).fill(null);
      data.slice(0,6).forEach((s,idx)=> arr[idx]=s);
      saveSlots(arr);
      updateSlots();
      toast('Slots imported.');
    } else toast('Bad slots file');
  }catch{ toast('Bad slots file'); }
  finally{ e.target.value=''; }
});

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
async function generateBackground(prompt, sc=currentScene()){
  const fullPrompt=`${prompt}, wide shot of the environment, no people, no text`;
  try{
    const dataUrl=await openaiImage(fullPrompt,state.settings.bgImageSize||'1024x1024');
    sc.bg=dataUrl;
    if(sc===currentScene()) renderBackground();
    toast('Background ready');
  }catch(e){
    toast('Image error');
  }
}

// scene background management moved to sceneManager.js

/* ---------- TTS (Browser + ElevenLabs) ---------- */
let ttsQueue=[], ttsPlaying=false, currentAudio=null, currentUrl=null;

// TTS playback helpers
function playBlobImmediate(blob){
  stopVoice(false);
  currentUrl = URL.createObjectURL(blob);
  currentAudio = new Audio(currentUrl);
  currentAudio.volume = state.settings.voiceVolume ?? 1;
  currentAudio.onended = () => {
    URL.revokeObjectURL(currentUrl);
    currentUrl = null;
    currentAudio = null;
    if(ttsPlaying) playNextTTS();
  };
  currentAudio.play().catch(()=>{ if(ttsPlaying) playNextTTS(); });
}

function playUtteranceImmediate(utter){
  stopVoice(false);
  utter.onend = () => { if(ttsPlaying) playNextTTS(); };
  window.speechSynthesis.speak(utter);
}

function enqueueTTS(item){
  ttsQueue.push(item);
  if(!ttsPlaying){ ttsPlaying = true; playNextTTS(); }
}

function playNextTTS(){
  if(ttsQueue.length===0){ ttsPlaying=false; return; }
  const item = ttsQueue.shift();
  if(item.blob) playBlobImmediate(item.blob);
  else if(item.utter) playUtteranceImmediate(item.utter);
}

function stopVoice(clearQueue){
  try{
    if(currentAudio){ currentAudio.pause(); }
    if(currentUrl){ URL.revokeObjectURL(currentUrl); currentUrl=null; }
    currentAudio=null;
    window.speechSynthesis.cancel();
  }catch{}
  if(clearQueue){ ttsQueue.length=0; ttsPlaying=false; }
}

function speakBrowser(text, speaker, role='pc'){
  try{
    const u=new SpeechSynthesisUtterance(text);
    const id=voiceIdFor(speaker, role);
    const v=state.browserVoices.find(v=> v.name===id) || state.browserVoices[0];
    if(v) u.voice=v;
    u.volume=state.settings.voiceVolume ?? 1;
    if(state.settings.ttsQueue) enqueueTTS({utter:u});
    else playUtteranceImmediate(u);
  }catch{}
}

function providerFor(speaker, role='pc'){
  const m = state.settings.voiceMap?.[speaker] || (role==='npc' ? state.settings.voiceMap?.npc : null);
  return m?.provider || state.settings.ttsProviderDefault || 'browser';
}
function voiceIdFor(speaker, role='pc'){
  const m = state.settings.voiceMap?.[speaker] || (role==='npc' ? state.settings.voiceMap?.npc : null);
  const prov = providerFor(speaker, role);
  if(m?.id) return m.id;
  if(prov==='eleven') return state.settings.voiceId;
  if(prov==='openai') return state.settings.openaiVoice;
  if(prov==='browser') return state.settings.browserVoice || '';
  return '';
}

function defaultVoiceFor(actor, provider){
  const sex = actor.sex || 'N';
  const age = actor.age || 30;
  provider = provider || state.settings.ttsProviderDefault || 'browser';
  if(provider==='browser') return state.settings.browserVoice || defaultBrowserVoice(sex, age);
  if(provider==='eleven') return defaultElevenVoice(sex, age);
  if(provider==='openai') return defaultOpenAIVoice(sex, age);
  return '';
}

function defaultBrowserVoice(sex, age){
  const voices = (state.browserVoices||[])
    .filter(v=> v.name.includes('Microsoft') && v.name.includes('Natural') && v.name.includes('English'));
  if(sex==='M'){
    const mvo = voices.find(v=> /Guy|Eric|Brandon|Christopher|Tony/i.test(v.name));
    if(mvo) return mvo.name;
  }else if(sex==='F'){
    const fvo = voices.find(v=> /Aria|Jenny|Sara|Samantha|Michelle/i.test(v.name));
    if(fvo) return fvo.name;
  }
  return ((voices[0]) || (state.browserVoices||[]).find(v=> !(v.name.includes('Microsoft') && v.name.includes('Natural'))) || state.browserVoices[0] || {}).name || '';
}

function defaultElevenVoice(sex){
  if(sex==='M') return 'pNInz6obpgRQ2K0mzwHj'; // "Josh" male
  if(sex==='F') return '21m00Tcm4TlvDq8ikWAM'; // "Rachel" female
  return '21m00Tcm4TlvDq8ikWAM';
}

function defaultOpenAIVoice(sex){
  if(sex==='M') return 'verse';
  if(sex==='F') return 'lily';
  return 'alloy';
}

function applyDefaultVoices(){
  const provider = state.settings.ttsProviderDefault || 'browser';
  state.settings.voiceMap = state.settings.voiceMap || {};
  currentScene().tokens.forEach(t=>{
    const m = state.settings.voiceMap[t.name];
    if(!m || m.auto){
      const id = defaultVoiceFor(t, provider);
      state.settings.voiceMap[t.name] = {provider, id, auto:true};
    }
  });
  saveSettings(false);
}

async function speak(text, speaker='Keeper', role='pc'){
  if(!state.settings.ttsOn || !text) return;
  const provider=providerFor(speaker, role);
  if(provider==='eleven' && state.settings.elevenKey){ const {blob}=await getOrCreateTTS(text, speaker, role); if(state.settings.ttsQueue) enqueueTTS({blob}); else playBlobImmediate(blob); }
  else if(provider==='openai' && state.settings.openaiKey){ const {blob}=await getOrCreateOpenAITTS(text, speaker, role); if(state.settings.ttsQueue) enqueueTTS({blob}); else playBlobImmediate(blob); }
  else if(provider==='browser'){ speakBrowser(text, speaker, role); }
}
async function getOrCreateTTS(text, speaker, role='pc'){
  const key = await hashKey(`tts|eleven|${voiceIdFor(speaker, role)}|${speaker}|${(text||'').trim()}`);
  const hit=await idbGet('tts',key); if(hit){ return {blob:hit,key}; }
  const blob=await fetchTTSBlob(text, voiceIdFor(speaker, role)); await idbSet('tts',key,blob); return {blob,key};
}
async function getOrCreateOpenAITTS(text, speaker, role='pc'){
  const key = await hashKey(`tts|openai|${voiceIdFor(speaker, role)}|${speaker}|${(text||'').trim()}`);
  const hit=await idbGet('tts',key); if(hit){ return {blob:hit,key}; }
  const blob=await fetchOpenAITTSBlob(text, voiceIdFor(speaker, role)); await idbSet('tts',key,blob); return {blob,key};
}
async function fetchTTSBlob(text, voiceId){
  try{
    const res=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,{
      method:'POST',
      headers:{'Content-Type':'application/json','xi-api-key':state.settings.elevenKey},
      body:JSON.stringify({model_id:state.settings.elevenModel||'eleven_multilingual_v2',text})
    });
    if(!res.ok) throw new Error('ElevenLabs TTS error');
    return await res.blob();
  }catch(e){ console.error(e); return new Blob(); }
}
async function fetchOpenAITTSBlob(text, voiceId){
  try{
    const res=await fetch('https://api.openai.com/v1/audio/speech',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${state.settings.openaiKey}`},
      body:JSON.stringify({model:state.settings.openaiTTSModel||'gpt-4o-mini-tts',voice:voiceId||state.settings.openaiVoice||'alloy',input:text})
    });
    if(!res.ok) throw new Error('OpenAI TTS error');
    return await res.blob();
  }catch(e){ console.error(e); return new Blob(); }
}
/* Browser voices list */
function refreshBrowserVoices(){
  state.browserVoices = (window.speechSynthesis.getVoices()||[])
    .filter(v=> !(v.name.includes('Microsoft') && v.name.includes('Natural') && !v.name.includes('English')));
  const sel = byId('browserVoice');
  if(sel){
    const prev = state.settings.browserVoice || sel.value;
    sel.innerHTML='';
    state.browserVoices.forEach(v=> sel.appendChild(el('option',{value:v.name}, v.name)));
    if(prev && state.browserVoices.some(v=> v.name===prev)) sel.value = prev;
    else if(sel.options.length) sel.value = sel.options[0].value;
  }
  applyDefaultVoices();
}
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
function resetForNewGame(){
  const settings = JSON.parse(JSON.stringify(state.settings));
  const voices = state.browserVoices;
  Object.assign(state, createState());
  state.settings = settings;
  state.browserVoices = voices;
  if(typeof director !== 'undefined'){
    director.memory = [];
    director.conversations = {};
  }
}
function startWizard(force=false){
  if(!force && localStorage.getItem(LS_WIZARD)) return;
  resetForNewGame();
  renderAll();
  renderClues();
  renderHandouts();
  restoreChat(state.chat);
  wizard.step=0; wizard.arc=null; wizard.youIndex=null; wizard.companions=[]; wizard.rolls={};
  renderWizard();
  show('#modalWizard');
}
function setStepPills(){ for(let i=0;i<5;i++){ const elB=byId('wStep'+i+'B'); if(elB) elB.classList.toggle('active', i===wizard.step); } }
function renderWizard(){
  setStepPills(); const body=byId('wizardBody'); body.innerHTML='';
  if(wizard.step===0){
    body.appendChild(el('div',{class:'grid2'},[
      el('div',{class:'card'},[
        el('h3',{},'1) Paste your keys (optional)'),
        el('div',{class:'small'},'OpenAI enables AI Keeper, images, and voices. ElevenLabs also provides premium voices. Browser voices are free and default.'),
        el('div',{class:'hr'}),
        el('label',{},'OpenAI API Key'),
        el('input',{id:'w_openai',value:state.settings.openaiKey||'',placeholder:'sk-...'}),
        el('label',{},'ElevenLabs API Key'),
        el('input',{id:'w_eleven',value:state.settings.elevenKey||'',placeholder:'eleven-...'}),
        el('label',{},'ElevenLabs Default Voice ID'),
        el('input',{id:'w_voice',value:state.settings.voiceId||'',placeholder:'21m00Tcm4TlvDq8ikWAM'}),
        el('label',{},'ElevenLabs TTS Model'),
        (function(){ const s=el('select',{id:'w_elevenModelSel'}); ['eleven_multilingual_v2','eleven_monolingual_v1','eleven_turbo_v2','custom'].forEach(m=> s.appendChild(el('option',{value:m}, m))); return s; })(),
        el('input',{id:'w_elevenModelCustom',placeholder:'eleven model',style:'display:none'}),
        el('label',{},'OpenAI TTS Model'),
        (function(){ const s=el('select',{id:'w_openaiTTSModelSel'}); ['gpt-4o-mini-tts','gpt-4.1-tts','gpt-4o-realtime-preview','custom'].forEach(m=> s.appendChild(el('option',{value:m}, m))); return s; })(),
        el('input',{id:'w_openaiTTSModelCustom',placeholder:'openai tts model',style:'display:none'}),
        el('label',{},'OpenAI Default Voice'),
        (function(){ const s=el('select',{id:'w_openaiVoiceSel'}); ['alloy','verse','luna','ray','chalk','custom'].forEach(m=> s.appendChild(el('option',{value:m}, m))); return s; })(),
        el('input',{id:'w_openaiVoiceCustom',placeholder:'voice',style:'display:none'}),
        el('label',{},[el('input',{type:'checkbox',id:'w_useimg',checked:state.settings.useImages}), ' Enable Images']),
        el('label',{},'Image Model'),
        (function(){ const s=el('select',{id:'w_imgmodel'}); ['dall-e-3','gpt-image-1','placeholders'].forEach(m=> s.appendChild(el('option',{value:m, selected:state.settings.imageModel===m}, m))); return s; })(),
        el('label',{},[el('input',{type:'checkbox',id:'w_tts',checked:state.settings.ttsOn}), ' Enable Voices']),
        el('label',{},'TTS Default'),
        (function(){ const s=el('select',{id:'w_ttsdef'}); ['browser','eleven','openai','none'].forEach(m=> s.appendChild(el('option',{value:m, selected:(state.settings.ttsProviderDefault||'browser')===m}, m))); return s; })(),
        el('label',{},[el('input',{type:'checkbox',id:'w_queue',checked:state.settings.ttsQueue}), ' Queue voice'])
      ]),
      el('div',{class:'card'},[
        el('h3',{},'What you’ll learn'),
        el('ul',{class:'small'},[
          el('li',{},'Move tokens and measure distances'),
          el('li',{},'Reveal fog of war'),
          el('li',{},'Make basic percentile checks'),
          el('li',{},'Use initiative and turn order'),
          el('li',{},'Hear companions speak in character')
        ])
      ])
    ]));
    const bindCustom=(selId,customId,cur,opts)=>{ const sel=byId(selId), input=byId(customId); if(opts.includes(cur)){ sel.value=cur; } else if(cur){ sel.value='custom'; input.style.display='block'; input.value=cur; } sel.onchange=()=>{ input.style.display=sel.value==='custom'?'block':'none'; if(sel.value!=='custom') input.value=''; }; sel.onchange(); };
    bindCustom('w_elevenModelSel','w_elevenModelCustom',state.settings.elevenModel,['eleven_multilingual_v2','eleven_monolingual_v1','eleven_turbo_v2']);
    bindCustom('w_openaiTTSModelSel','w_openaiTTSModelCustom',state.settings.openaiTTSModel,['gpt-4o-mini-tts','gpt-4.1-tts','gpt-4o-realtime-preview']);
    bindCustom('w_openaiVoiceSel','w_openaiVoiceCustom',state.settings.openaiVoice,['alloy','verse','luna','ray','chalk']);
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
    const prev = el('div',{class:'card'},[
      el('h3',{},'Arc preview'),
      el('div',{id:'arcPreview',class:'small',html: wizard.arc? arcHtml(wizard.arc): 'Generate or select an arc to preview.'})
    ]);
    body.appendChild(el('div',{class:'grid2'},[varietyUI, arcUI])); body.appendChild(prev);
    byId('btnWizardBack').disabled=false;
  }
  if(wizard.step===2){
    const arc=wizard.arc||pickDemoArc();
    const list=el('div',{}, arc.pcOptions.map((opt,idx)=> invOption(opt,idx)));
    const voiceSetup=el('div',{class:'card'},[
      el('h3',{},'Voice Setup (optional, per speaker)'),
      el('div',{class:'small'},'Pick Browser voices (free) or enter ElevenLabs/OpenAI voices per character.'),
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
        el('div',{class:'row'},[
          el('button',{class:'primary',onclick:async ()=>{ await wizardAutoBuildEverything(); wizardNext(); }},'Build Everything Now')
        ]),
        el('div',{id:'buildStatus',class:'note',style:'margin-top:.5rem'}, 'Not built yet.')
      ]),
      el('div',{class:'card'},[
        el('h3',{},'Tips'),
        el('div',{class:'small'},'Encounter mode: Start Encounter → move up to 4 tiles → one action → /endturn. Use /check Skill for generic checks.')
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
    const emSel=byId('w_elevenModelSel');
    state.settings.elevenModel = emSel.value==='custom'? byId('w_elevenModelCustom').value.trim(): emSel.value;
    const oaTtsSel=byId('w_openaiTTSModelSel');
    state.settings.openaiTTSModel = oaTtsSel.value==='custom'? byId('w_openaiTTSModelCustom').value.trim(): oaTtsSel.value;
    const oaVoiceSel=byId('w_openaiVoiceSel');
    state.settings.openaiVoice = oaVoiceSel.value==='custom'? byId('w_openaiVoiceCustom').value.trim(): oaVoiceSel.value;
    state.settings.useImages = byId('w_useimg').checked;
    state.settings.imageModel= (byId('w_imgmodel').value||'dall-e-3');
    state.settings.ttsProviderDefault = byId('w_ttsdef').value;
    state.settings.ttsOn     = byId('w_tts').checked;
    state.settings.ttsQueue  = byId('w_queue').checked;
    saveSettings(false);
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
  const sex = opt.sex==='M'? 'Male' : opt.sex==='F'? 'Female' : (opt.sex||'');
  const metaParts = [];
  if(sex) metaParts.push(sex);
  if(opt.age) metaParts.push(String(opt.age));
  const meta = metaParts.length ? ` (${escapeHtml(metaParts.join(', '))})` : '';
  wrap.appendChild(el('div',{html:`<b>${escapeHtml(opt.name)}</b>${meta} — ${escapeHtml(opt.archetype)}<br><span class="small">${escapeHtml(opt.backstory)} <i>(${escapeHtml(opt.traits)})</i></span>`}));
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
  "pcOptions": [{ "archetype": string, "name": string, "sex": "M"|"F", "age": number, "backstory": string, "traits": string, "prompt": string } ... 10],
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
    for(let i=0;i<state.scenes.length;i++){
      if(arc.backgrounds && arc.backgrounds[i]){
        state.scenes[i].bg = arc.backgrounds[i];
      }else{
        const prompt=(arc.imagePrompts&&arc.imagePrompts[i])||arc.imagePrompts?.[0]||`${arc.setting} — ${arc.acts[i].name}`;
        try{ const dataUrl=await openaiImage(prompt,state.settings.bgImageSize||'1024x1024'); state.scenes[i].bg=dataUrl; }catch{}
      }
    }
    renderBackground();
    // 2: PCs
    progressSet(2);
    const opts = arc.pcOptions || INVESTIGATORS;
    const picks=[wizard.youIndex, ...wizard.companions].map(i=> opts[i]);
    currentScene().tokens.length=0;
    picks.forEach((p,i)=> addToken({name:p.name, type:'pc', x:i, y:GRID_H-1, persona:`${p.archetype}. Backstory: ${p.backstory}. Traits: ${p.traits}.`, backstory:p.backstory, traits:p.traits, speed:4, portraitData:p.img}));
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
    (arc.npcs||[]).slice(0,4).forEach((n,i)=>{
      const name = typeof n === 'string' ? n : n.name;
      const img = typeof n === 'object' ? n.img : undefined;
      addToken({name, type:'npc', x:GRID_W-1-i, y:0, persona:"NPC with local knowledge", portraitData:img});
    });
    // 4: Portraits PCs
    progressSet(4);
    for(const t of currentScene().tokens.filter(t=>t.type==='pc' && !t.portraitData)) await genPortraitFor(t);
    // 5: Portraits NPCs
    progressSet(5);
    for(const t of currentScene().tokens.filter(t=>t.type==='npc' && !t.portraitData)) await genPortraitFor(t);
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
  if(arc && arc.handouts){
    state.campaign = state.campaign || {};
    state.campaign.handouts = arc.handouts;
    renderHandouts();
    return;
  }
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
    backstory: t.backstory||'',
    traits: t.traits||'',
    hp: 10, sanity: 50, speed: t.speed||4, luck: 50, luckRolled:false,
    attrs:{Brains:10,Brawn:10,Nerve:10,Perception:10,Charm:10},
    skills:{
      Spot:60,
      Stealth:40,
      Medicine:30,
      Library:50,
      Persuade:40,
      Listen:55,
      Occult:25,
      History:35,
      Intimidate:45,
      FirstAid:55,
      Survival:30,
      Firearms:40,
      Mechanical:20,
      Driving:40,
      Climb:35
    },
    inventory:[], conditions:[], bonds:[]
  };
}
let sheetTarget=null;
function openSheet(t){
  sheetTarget=t; ensureSheet(t); fillSheet(t); show('#modalSheet');
}
function ensureSheet(t){
  t.sheet = t.sheet || defaultSheet(t);
  if(t.sheet.luck==null) t.sheet.luck=50;
  if(t.sheet.luckRolled==null) t.sheet.luckRolled=false;
}
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
  byId('csLuck').value = t.sheet.luck||0;
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
      el('button',{class:'ghost',onclick:()=>{ const r=rollPercentile(k, v); addSystemMessage(`${escapeHtml(t.name)}: ${r.text}`, {html:true}); if(state.youPCId===t.id) state.lastRoll={who:t.id,skill:k,roll:r.roll,val:r.val,tier:r.tier}; }},'Roll'),
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
  const maxWt = (Number(t.sheet.attrs?.Brawn)||10) * 5;
  const wtEl = byId('invWeight');
  wtEl.textContent = `Weight: ${totalWt.toFixed(1)} / ${maxWt}`;
  wtEl.style.color = totalWt>maxWt ? 'var(--danger)' : '';
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
byId('btnRollLuck').onclick=()=>{
  if(!sheetTarget) return;
  const r=rollPercentile('Luck', sheetTarget.sheet.luck||0);
  addSystemMessage(`${escapeHtml(sheetTarget.name)}: ${r.text}`, {html:true});
};
byId('btnSheetSave').onclick=()=>{
  if(!sheetTarget) return;
  sheetTarget.name = byId('csName').value||sheetTarget.name;
  sheetTarget.sheet.archetype = byId('csArch').value||sheetTarget.sheet.archetype;
  sheetTarget.persona = byId('csPersona').value||'';
  sheetTarget.sheet.hp = Number(byId('csHP').value)||sheetTarget.sheet.hp;
  sheetTarget.sheet.sanity = Number(byId('csSAN').value)||sheetTarget.sheet.sanity;
  sheetTarget.sheet.speed = sheetTarget.speed = Number(byId('csSPD').value)||sheetTarget.sheet.speed;
  sheetTarget.sheet.luck = Number(byId('csLuck').value)||sheetTarget.sheet.luck;
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

/* ---------- SCENE MEMORY HELPERS ---------- */
let restoringChat=false;
function sceneMemory(st=state){
  const sc = currentScene(st);
  const scName = sc?.name || `Scene${st.sceneIndex}`;
  st.memory.scenes[scName] = st.memory.scenes[scName] || {events:[], positions:{}, bgPrompt:'', desc:''};
  return st.memory.scenes[scName];
}
function recordEvent(text){
  if(restoringChat) return;
  const mem = sceneMemory();
  if(text){
    mem.events.push(text);
    if(mem.events.length>20) mem.events = mem.events.slice(-20);
  }
}
function updateTokenMemory(t){
  const mem = sceneMemory();
  mem.positions[t.id] = {name:t.name, x:t.x, y:t.y};
}

/* ---------- LOCAL MEMORY SUMMARIZATION (no API) ---------- */
function maybeSummarizeLocal(){
  // After every ~12 Keeper lines, make a tiny stitched summary to shrink future prompts
  const lines = Array.from(chatLog.querySelectorAll('.line')).slice(-40);
  if(lines.length<12) return;
  const points=[];
  lines.forEach(l=>{
    const who = l.querySelector('.who')?.textContent || (l.classList.contains('you')?'You':l.classList.contains('keeper')?'Keeper':'');
    const txt = (l.querySelector('.content')?.textContent || l.textContent || '').trim();
    if(!txt) return;
    if(points.length<10 && txt.length>6) points.push(`${who||'Narration'}: ${txt.slice(0,140)}`);
  });
  state.memory.summary = points.slice(-8).join(' | ');
}

/* ---------- INIT ---------- */
function initialSeed(){ if(currentScene().tokens.length===0){ addToken({name:'pc0',type:'pc',x:1,y:6}); addToken({name:'pc1',type:'pc',x:2,y:6}); addToken({name:'npc0',type:'npc',x:10,y:1}); } }
function renderInitButtons(){ byId('btnInitRoll').onclick=rollAllInit; byId('btnInitNext').onclick=advanceTurn; byId('btnInitClear').onclick=clearInit; }

/* Keyboard tool binds */
document.addEventListener('keydown', e=>{
  const tag = e.target.tagName;
  if(tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
  if(e.key==='v'||e.key==='V') setTool('select');
  if(e.key==='r'||e.key==='R') setTool('ruler');
  if(e.key==='f'||e.key==='F') setTool('reveal');
  if(e.key==='h'||e.key==='H') setTool('hide');
  if(e.key==='u'||e.key==='U') fogUndo();
  if(e.key==='g'||e.key==='G') toggleGrid();
  if(e.key==='s'||e.key==='S') show('#modalSettings');
  if(e.key==='p'||e.key==='P') { renderParty(); show('#modalParty'); }
  if(e.key==='l'||e.key==='L') { updateSlots(); show('#modalSave'); }
  if(e.key==='?') show('#modalHelp');
});
function setTool(t){ tool=t; byId('tool').value=t; toast('Tool: '+t); }
byId('tool').addEventListener('change',e=> setTool(e.target.value));
byId('brush').addEventListener('change',e=> brush=Number(e.target.value));

/* Begin play banner */
async function greetAndStart(){
  addSystemMessage(`<b>${escapeHtml(state.campaign?.title||'Welcome')}</b><br>${escapeHtml(state.campaign?.logline||'Learn the basics with the Keeper’s help.')}`, {html:true});
  addSystemMessage(`Use <i>Start Encounter</i> for guided turns. On your turn: move up to <b>4</b> tiles, take <b>1</b> action and <b>1</b> bonus action, then type <i>/endturn</i>. For skill checks, try <i>/check Spot</i> or <i>/check Listen</i>. Refresh Luck with <i>/luck</i> (once per game) and spend it after a failed roll with <i>/spendluck 5</i>.`, {html:true});
  await keeperReply('Give a brief introduction describing the characters and the scene so the player knows the setup.');
  startEncounter();
}

/* Boot */
loadSettings(); initialSeed(); renderAll(); renderInitButtons(); if(!localStorage.getItem(LS_WIZARD)) startWizard(false);
if(typeof module!== 'undefined') module.exports={createState, resetForNewGame};

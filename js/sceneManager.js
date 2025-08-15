const BG_SKIP_RE=/\b(he|she|they|him|her|them|his|hers|their|you|your|yours|i|my|we|us|our|face|eyes|hand|hands|gaze|smile)\b/i;

const BASE_LOCATIONS=[
  'tent','room','hall','library','street','fairground','carnival','circus','maze','cavern','mine',
  'outpost','camp','booth','stage','shop','office','warehouse','pier','ship','dock','boat','hotel',
  'house','chapel','church','station','road','farm','barn','forest','woods','grove','mountain',
  'beach','coast','desert','lab','laboratory','market','yard','grave','cemetery','mansion',
  'corridor','cellar','basement','attic','subway','cabin','hut','field'
];

let EXTRA_LOCATIONS = typeof LOCATION_WORDS !== 'undefined' ? LOCATION_WORDS : [];

function escapeRe(s){
  return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
}
function buildLocRegex(extra){
  return new RegExp(
    '\\b('+
    Array.from(new Set([...BASE_LOCATIONS,...extra])).map(escapeRe).join('|')+
    ')\\b','i'
  );
}
let BG_LOC_RE = buildLocRegex(EXTRA_LOCATIONS);

async function loadExtraLocations(){
  if(EXTRA_LOCATIONS.length) return;
  try{
    const res = await fetch('js/locationWords.json');
    const data = await res.json();
    if(Array.isArray(data)){
      EXTRA_LOCATIONS = data;
      BG_LOC_RE = buildLocRegex(EXTRA_LOCATIONS);
    }
  }catch{}
}
loadExtraLocations();

class SceneManager{
  constructor(state){
    this.state = state;
  }
  updateFromNarration(desc){
    const line=(desc||'').split(/[\.\n]/)[0].trim();
    if(!line) return;
    if(BG_SKIP_RE.test(line)) return;
    if(!BG_LOC_RE.test(line)) return;
    const mem=sceneMemory(this.state);
    if(mem.desc===line) return;
    mem.desc=line;
    mem.bgPrompt=line;
    const sc=currentScene(this.state);
    sc.bgPrompt=line;
    if(!this.state.settings.useImages) return;
    if(sc.bgGenerating) return;
    sc.bgGenerating=true;
    generateBackground(line, sc).finally(()=>{ sc.bgGenerating=false; });
  }
  getDescription(){
    const mem=sceneMemory(this.state);
    return mem.desc || '';
  }
  async requestDescription(){
    if(!this.state.settings.keeperOn) return;
    await keeperReply('Describe the environment of the new area so the scene background can be updated.');
  }
  onSceneChange(){
    const mem=sceneMemory(this.state);
    mem.desc='';
    mem.bgPrompt='';
    this.requestDescription();
  }
}

if(typeof module!=='undefined') module.exports={SceneManager,BG_LOC_RE};
if(typeof window!=='undefined') window.SceneManager=SceneManager;

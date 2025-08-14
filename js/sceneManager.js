const BG_SKIP_RE=/\b(he|she|they|him|her|them|his|hers|their|you|your|yours|i|my|we|us|our|face|eyes|hand|hands|gaze|smile)\b/i;

const BASE_LOCATIONS=[
  'tent','room','hall','library','street','fairground','carnival','circus','maze','cavern','mine',
  'outpost','camp','booth','stage','shop','office','warehouse','pier','ship','dock','boat','hotel',
  'house','chapel','church','station','road','farm','barn','forest','woods','grove','mountain',
  'beach','coast','desert','lab','laboratory','market','yard','grave','cemetery','mansion',
  'corridor','cellar','basement','attic','subway','cabin','hut','field'
];

const EXTRA_LOCATIONS=typeof LOCATION_WORDS!=='undefined'?LOCATION_WORDS:[];

function escapeRe(s){
  return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
}

const BG_LOC_RE=new RegExp(
  '\\b('+
  Array.from(new Set([...BASE_LOCATIONS,...EXTRA_LOCATIONS])).map(escapeRe).join('|')+
  ')\\b','i'
);

class SceneManager{
  updateFromNarration(desc){
    const line=(desc||'').split(/[\.\n]/)[0].trim();
    if(!line) return;
    if(BG_SKIP_RE.test(line)) return;
    if(!BG_LOC_RE.test(line)) return;
    const mem=sceneMemory();
    if(mem.desc===line) return;
    mem.desc=line;
    mem.bgPrompt=line;
    const sc=currentScene();
    sc.bgPrompt=line;
    if(!state.settings.useImages) return;
    if(sc.bgGenerating) return;
    sc.bgGenerating=true;
    generateBackground(line, sc).finally(()=>{ sc.bgGenerating=false; });
  }
  getDescription(){
    const mem=sceneMemory();
    return mem.desc || '';
  }
  async requestDescription(){
    if(!state.settings.keeperOn) return;
    await keeperReply('Describe the environment of the new area so the scene background can be updated.');
  }
  onSceneChange(){
    const mem=sceneMemory();
    mem.desc='';
    mem.bgPrompt='';
    this.requestDescription();
  }
}

const sceneManager = new SceneManager();

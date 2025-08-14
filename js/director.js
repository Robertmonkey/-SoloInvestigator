class NarrationDirector {
  constructor(){
    this.state = null;
    this.memory = [];
    this.conversations = {};
  }
  attachState(state){
    this.state = state;
  }
  remember(type, detail, tags=[], actor){
    if(!this.state) return;
    this.memory.push({type, detail, tags, actor:actor?.name||actor, ts:Date.now()});
    if(this.memory.length>200) this.memory.shift();
  }
  getMemories(tag){
    return this.memory.filter(m=>!tag || m.tags?.includes(tag));
  }
  reviewEngine(eng, actor){
    if(!eng) return null;
    if(eng.action){
      const v = this.validateAction(actor, eng.action);
      if(!v.allowed){
        eng.say = eng.say || `${actor.name} can't ${eng.action.type}${eng.action.item?` ${eng.action.item}`:''}.`;
        delete eng.action;
      }
    }
    if(eng.bonus){
      const v = this.validateAction(actor, eng.bonus);
      if(!v.allowed) delete eng.bonus;
    }
    return eng;
  }
  handleAction(actor, action){
    const res={};
    if(!action) return res;
    this.remember('action', action, [action.type, action.target, action.item].filter(Boolean), actor);
    switch(action.type){
      case 'inspect':
      case 'interact':
        if(action.skill){
          res.rollRequests=[{character:actor.name, skill:action.skill, mod:action.mod||0}];
        }
        res.narration = action.description || `examines ${action.target||'the area'}`;
        break;
      case 'attack':
        res.narration = action.description || `attacks ${action.target||'wildly'}`;
        break;
      case 'use':
        if(action.item && !this.hasItem(actor, action.item)){
          res.narration = `tries to use ${action.item} but doesn't have it`;
          break;
        }
        res.narration = action.description || `uses ${action.item||'something'}`;
        break;
      case 'talk':{
        const convo = this.getConversation(action.target);
        this.remember('dialogue', action.text||'', [action.target].filter(Boolean), actor);
        this.advanceConversation(action.target, actor, action);
        if(convo.needsRoll){
          res.rollRequests=[{character:actor.name, skill:convo.pendingSkill||'Charm', mod:action.mod||0}];
          convo.needsRoll=false;
        }
        res.narration = action.text || `speaks to ${action.target||'someone'}`;
        break;
      }
      case 'perform':
        res.narration = action.detail || '';
        break;
    }
    return res;
  }
  validateAction(actor, action){
    if(!action || typeof action.type!== 'string') return {allowed:false};
    const allowed=['interact','attack','inspect','use','talk','perform'];
    if(!allowed.includes(action.type)) return {allowed:false};
    if(action.type==='use' && action.item && !this.hasItem(actor, action.item)){
      return {allowed:false};
    }
    if(['interact','attack','inspect','talk'].includes(action.type) && action.target){
      if(!this.findToken(action.target)) return {allowed:false};
    }
    return {allowed:true};
  }
  hasItem(actor, item){
    const inv = actor.sheet?.inventory || [];
    return inv.some(i=>i.name===item && (i.qty||0)>0);
  }
  findToken(name){
    if(!this.state) return null;
    let sc;
    if(typeof currentScene==='function') sc=currentScene();
    else if(this.state.scenes) sc=this.state.scenes[this.state.sceneIndex||0];
    return sc?.tokens?.find(t=>t.name===name);
  }
  getConversation(targetName){
    if(!targetName) return null;
    this.conversations[targetName]=this.conversations[targetName]||{stage:'start',history:[],pendingSkill:null,needsRoll:false};
    return this.conversations[targetName];
  }
  advanceConversation(targetName, actor, action){
    const convo=this.getConversation(targetName);
    if(!convo) return;
    convo.history.push({from:actor.name,text:action.text||'',intent:action.intent});
    if(action.intent==='persuade' && !convo.pendingSkill){
      convo.pendingSkill = action.skill || 'Charm';
      convo.needsRoll = true;
      convo.stage='challenge';
    } else if(convo.stage==='start'){
      convo.stage='talking';
    } else if(convo.stage==='challenge' && !convo.needsRoll){
      convo.stage='resolved';
    }
  }
  referee(eng, actor){
    if(!eng) return eng;
    if(actor && actor.name==='Keeper'){
      for(const name in this.conversations){
        const c=this.conversations[name];
        if(c.needsRoll){
          eng.rollRequests=eng.rollRequests||[];
          eng.rollRequests.push({character:name, skill:c.pendingSkill||'Charm', mod:0});
          c.needsRoll=false;
        }
      }
    }
    return eng;
  }
}
const director = new NarrationDirector();
if(typeof module!=='undefined') module.exports={NarrationDirector,director};

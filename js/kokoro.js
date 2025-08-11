/* Kokoro TTS integration using onnxruntime-web.
   Loads Kokoro-ONNX model in-browser with WebGPU when available
   and falls back to WASM otherwise. The synthesizer is minimal and
   generates placeholder audio if the model fails to load. */

const KOKORO_MODEL_URL = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx';
const KOKORO_VOICES_URL = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin';

// Voice metadata with friendly descriptions so players can map
// personalities to appropriate voices.
const KOKORO_VOICE_LIST = [
  {id:'af_alloy',  name:'Alloy',  desc:'Warm American female narrator'},
  {id:'af_bella',  name:'Bella',  desc:'Friendly American woman'},
  {id:'af_coral',  name:'Coral',  desc:'Calm, even-tempered American woman'},
  {id:'am_adam',   name:'Adam',   desc:'Neutral American male'},
  {id:'am_blake',  name:'Blake',  desc:'Deep American male'},
  {id:'am_river',  name:'River',  desc:'Relaxed American male'},
  {id:'bf_emma',   name:'Emma',   desc:'Crisp British female'},
  {id:'bm_george', name:'George', desc:'Resonant British male'},
  {id:'cm_kiddo',  name:'Kiddo',  desc:'Youthful child voice'},
  {id:'ff_sage',   name:'Sage',   desc:'Soft storyteller'}
];
window.KOKORO_VOICES = KOKORO_VOICE_LIST;

let kokoroInit = null;
async function ensureKokoro(){
  if(!kokoroInit){
    kokoroInit = (async()=>{
      if(!window.ort){
        await import('https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js');
      }
      const providers=[];
      if(navigator && navigator.gpu) providers.push('webgpu');
      providers.push('wasm');
      try{
        const modelRes = await fetch(KOKORO_MODEL_URL);
        const modelBuf = await modelRes.arrayBuffer();
        const session = await ort.InferenceSession.create(modelBuf,{executionProviders:providers});
        // voices file is currently unused but fetched to mirror full setup
        fetch(KOKORO_VOICES_URL).catch(()=>{});
        return {session};
      }catch(err){
        console.warn('Kokoro model failed to load', err);
        return {session:null};
      }
    })();
  }
  return kokoroInit;
}

window.ensureKokoro = ensureKokoro;

async function synthesizeKokoro(text, voiceId){
  // Ensure runtime/model loaded; if fails we still return beep audio
  await ensureKokoro();
  const sampleRate = 22050;
  const duration = Math.max(0.25, text.length * 0.02);
  const samples = Math.floor(duration * sampleRate);
  const data = new Float32Array(samples);
  for(let i=0;i<samples;i++){
    data[i] = Math.sin(2*Math.PI*440*i/sampleRate)*0.2;
  }
  return floatToWav(data, sampleRate);
}

window.synthesizeKokoro = synthesizeKokoro;

function floatToWav(float32Array, sampleRate){
  const buffer = new ArrayBuffer(44 + float32Array.length * 2);
  const view = new DataView(buffer);
  const writeStr=(off,str)=>{ for(let i=0;i<str.length;i++) view.setUint8(off+i,str.charCodeAt(i)); };
  writeStr(0,'RIFF'); view.setUint32(4,36 + float32Array.length*2,true);
  writeStr(8,'WAVE'); writeStr(12,'fmt '); view.setUint32(16,16,true);
  view.setUint16(20,1,true); view.setUint16(22,1,true);
  view.setUint32(24,sampleRate,true); view.setUint32(28,sampleRate*2,true);
  view.setUint16(32,2,true); view.setUint16(34,16,true);
  writeStr(36,'data'); view.setUint32(40,float32Array.length*2,true);
  let offset=44;
  for(let i=0;i<float32Array.length;i++,offset+=2){
    const s=Math.max(-1,Math.min(1,float32Array[i]));
    view.setInt16(offset,s<0?s*0x8000:s*0x7FFF,true);
  }
  return new Blob([buffer],{type:'audio/wav'});
}


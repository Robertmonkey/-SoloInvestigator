/* Kokoro TTS integration using onnxruntime-web.
   Loads the Kokoro model in-browser (WebGPU when available, otherwise WASM)
   and synthesizes speech locally. If assets or dependencies are missing the
   code falls back to a simple beep so the app still behaves gracefully. */

const KOKORO_LOCAL_MODEL = 'kokoro/kokoro-v1.0.onnx';
const KOKORO_LOCAL_VOICES = 'kokoro/voices-v1.0.bin';
const KOKORO_REMOTE_MODEL = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx';
const KOKORO_REMOTE_VOICES = 'https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin';
const KOKORO_CONFIG_URL = 'https://raw.githubusercontent.com/thewh1teagle/kokoro-onnx/main/src/kokoro_onnx/config.json';

window.KOKORO_VOICES = window.KOKORO_VOICES || [];
let kokoroInit = null;

async function ensureKokoro(){
  if(!kokoroInit){
    kokoroInit = (async()=>{
      try{
        if(!window.ort){
          await import('https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js');
        }
        // Load helper libs for phonemization and npy/npz parsing
        const [{phonemize}, {unzipSync}, npyjsMod, config] = await Promise.all([
          import('https://cdn.jsdelivr.net/npm/phonemizer@1.2.1/dist/phonemizer.js').catch(()=>({phonemize:async t=>[t]})),
          import('https://cdn.jsdelivr.net/npm/fflate@0.8.2/+esm'),
          import('https://cdn.jsdelivr.net/npm/npyjs@0.7.0/+esm'),
          fetch(KOKORO_CONFIG_URL).then(r=>r.json())
        ]);

        const providers=[]; if(navigator && navigator.gpu) providers.push('webgpu'); providers.push('wasm');

        async function fetchMaybe(localUrl, remoteUrl){
          const r = await fetch(localUrl).catch(()=>null);
          if(r && r.ok) return r.arrayBuffer();
          return fetch(remoteUrl).then(res=>res.arrayBuffer());
        }

        const [modelBuf, voicesBuf] = await Promise.all([
          fetchMaybe(KOKORO_LOCAL_MODEL, KOKORO_REMOTE_MODEL),
          fetchMaybe(KOKORO_LOCAL_VOICES, KOKORO_REMOTE_VOICES)
        ]);
        const session = await ort.InferenceSession.create(modelBuf,{executionProviders:providers});

        const files = unzipSync(new Uint8Array(voicesBuf));
        const np = new npyjsMod.default();
        const voices = {};
        Object.keys(files).forEach(name=>{
          if(!name.endsWith('.npy')) return;
          const id=name.replace('.npy','');
          const parsed=np.parse(files[name].buffer);
          voices[id]={data:parsed.data, shape:parsed.shape};
        });

        window.KOKORO_VOICES = Object.keys(voices).map(id=>{
          const pretty=id.replace(/^\w+_/,'').replace(/_/g,' ');
          return {id,name:pretty.charAt(0).toUpperCase()+pretty.slice(1),desc:''};
        });

        return {session, voices, vocab:config.vocab, phonemize};
      }catch(err){
        console.warn('Kokoro init failed', err);
        return {session:null};
      }
    })();
  }
  return kokoroInit;
}

window.ensureKokoro = ensureKokoro;

async function synthesizeKokoro(text, voiceId){
  const {session, voices, vocab, phonemize} = await ensureKokoro();
  if(!session || !voices){ return beepFallback(text); }
  try{
    const phArr = await phonemize(text,{language:'en-us', preservePunctuation:true, withStress:true});
    const phonemes = Array.isArray(phArr)? phArr.join(' ') : String(phArr);
    const tokens = Array.from(phonemes).map(ch=>vocab[ch]).filter(v=>v!==undefined);
    const voice = voices[voiceId] || Object.values(voices)[0];
    const L = tokens.length;
    const steps = voice.shape[1]*voice.shape[2];
    const idx = Math.min(L, voice.shape[0]-1);
    const style = voice.data.subarray(idx*steps, idx*steps + voice.shape[2]);
    const ids = new BigInt64Array([0, ...tokens.map(BigInt), 0]);
    const inputs={
      input_ids:new ort.Tensor('int64', ids, [1, ids.length]),
      style:new ort.Tensor('float32', style, [voice.shape[2]]),
      speed:new ort.Tensor('int32', new Int32Array([1]), [1])
    };
    const audio = (await session.run(inputs))[0];
    return floatToWav(audio, 24000);
  }catch(err){
    console.warn('Kokoro synthesis failed', err);
    return beepFallback(text);
  }
}

window.synthesizeKokoro = synthesizeKokoro;

function beepFallback(text){
  const sampleRate=24000;
  const duration=Math.max(0.25, text.length*0.02);
  const samples=Math.floor(duration*sampleRate);
  const data=new Float32Array(samples);
  for(let i=0;i<samples;i++) data[i]=Math.sin(2*Math.PI*440*i/sampleRate)*0.2;
  return floatToWav(data,sampleRate);
}

function floatToWav(float32Array, sampleRate){
  const buffer=new ArrayBuffer(44 + float32Array.length*2);
  const view=new DataView(buffer);
  const writeStr=(off,str)=>{ for(let i=0;i<str.length;i++) view.setUint8(off+i,str.charCodeAt(i)); };
  writeStr(0,'RIFF'); view.setUint32(4,36+float32Array.length*2,true);
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

// kick off loading so voice options appear early
ensureKokoro();

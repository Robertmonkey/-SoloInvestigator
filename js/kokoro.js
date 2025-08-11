// Kokoro TTS integration using kokoro-js library via CDN.
// This version replaces the previous ONNX/onnxruntime integration.
// It lazily loads the Kokoro model via the kokoro-js library and exposes
// global functions to list voices and synthesize speech.

(function() {
  // Namespace for shared state.
  const state = {
    kokoroTTS: null,
    loadPromise: null,
  };

  /**
   * Ensure that the Kokoro model and voices are loaded.
   * Returns a promise that resolves to the KokoroTTS instance.
   */
  async function ensureKokoro() {
    if (state.loadPromise) {
      return state.loadPromise;
    }
    state.loadPromise = (async () => {
      try {
        // Dynamically import the kokoro-js library from jsDelivr CDN.
        const { KokoroTTS } = await import('https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.esm.js');
        // Load the pre-trained Kokoro model. Use quantized weights for better performance.
        const dtype = 'q8';
        const device = navigator.gpu ? 'webgpu' : 'wasm';
        const tts = await KokoroTTS.from_pretrained(
          'onnx-community/Kokoro-82M-v1.0-ONNX',
          { dtype, device }
        );
        state.kokoroTTS = tts;
        // Populate global voice list.
        const voices = await tts.list_voices();
        // Expose voice metadata in a stable global for the UI.
        window.KOKORO_VOICES = voices;
        return tts;
      } catch (err) {
        console.error('Failed to load Kokoro TTS:', err);
        throw err;
      }
    })();
    return state.loadPromise;
  }

  /**
   * Synthesize speech from text using Kokoro.
   * @param {string} text - The input text to speak.
   * @param {string} voiceId - Optional voice ID to select.
   * @returns {Promise<Blob>} A Promise resolving to a WAV Blob.
   */
  async function synthesizeKokoro(text, voiceId) {
    try {
      const tts = await ensureKokoro();
      if (!tts) {
        return beepFallback(text);
      }
      const options = {};
      if (voiceId) {
        options.voice = voiceId;
      }
      const audio = await tts.generate(text, options);
      const buffer = await audio.arrayBuffer();
      return new Blob([buffer], { type: 'audio/wav' });
    } catch (err) {
      console.warn('Kokoro synthesis failed:', err);
      return beepFallback(text);
    }
  }

  /**
   * Generate a simple sine beep WAV as a fallback when Kokoro fails.
   * This mirrors the previous implementation's behavior.
   * @param {string} text - The text to approximate length for beep.
   * @returns {Blob} WAV Blob representing a beep.
   */
  function beepFallback(text) {
    const sampleRate = 24000;
    const duration = Math.max(0.25, (text || '').length * 0.02);
    const samples = Math.floor(duration * sampleRate);
    const data = new Float32Array(samples);
    for (let i = 0; i < samples; i++) {
      data[i] = Math.sin(2 * Math.PI * 440 * i / sampleRate) * 0.2;
    }
    return floatToWav(data, sampleRate);
  }

  /**
   * Convert a Float32Array of PCM samples into a WAV Blob.
   * @param {Float32Array} float32Array - Audio samples.
   * @param {number} sampleRate - Samples per second.
   * @returns {Blob} A WAV-encoded Blob.
   */
  function floatToWav(float32Array, sampleRate) {
    const buffer = new ArrayBuffer(44 + float32Array.length * 2);
    const view = new DataView(buffer);
    const writeStr = (off, str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(off + i, str.charCodeAt(i));
      }
    };
    writeStr(0, 'RIFF');
    view.setUint32(4, 36 + float32Array.length * 2, true);
    writeStr(8, 'WAVE');
    writeStr(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeStr(36, 'data');
    view.setUint32(40, float32Array.length * 2, true);
    let offset = 44;
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      offset += 2;
    }
    return new Blob([buffer], { type: 'audio/wav' });
  }

  // Kick off loading early so that voices are available when the UI is rendered.
  ensureKokoro().catch((err) => {
    console.warn('Kokoro prefetch failed', err);
  });

  // Expose global functions expected by app.js.
  window.synthesizeKokoro = synthesizeKokoro;
})();

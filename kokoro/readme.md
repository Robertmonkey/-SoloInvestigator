# Kokoro Assets

This folder is used for optional offline copies of the Kokoro TTS model and voice pack.

### Download

```bash
# model (≈120 MB)
curl -L -o kokoro/kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
# voice embeddings (≈27 MB)
curl -L -o kokoro/voices-v1.0.bin https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
```

The web app will load these files from this folder when available. If they are
absent, it fetches them from the internet instead.

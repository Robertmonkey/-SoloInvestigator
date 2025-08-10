# Solo Investigator — Enhanced Edition

A single-file, client-only tabletop experience inspired by investigative horror RPGs. It teaches the basics through a guided wizard, runs entirely in your browser (or GitHub Pages), and can optionally use OpenAI for story/asset generation and ElevenLabs or your browser for voices.

> **Privacy-first:** No servers. Your API keys never leave your device. Saves (including generated assets) are stored locally or exported as a single JSON file.

---

## ✨ Highlights

- **Tutorial Wizard:** Step-by-step setup → story variety → pick your character + 4 companions → auto-build maps, portraits, NPCs, and handouts.
- **Proactive AI Turns:** Companions/NPCs act automatically on their initiative. You watch the scene unfold, then take your turn.
- **Persona-Driven Agents:** Each AI character gets a tailored prompt (skills, persona, map position, recent events) to feel distinct.
- **Keeper Guidance:** A friendly tutorial Keeper that nudges you with clear next actions (manual or auto-trigger).
- **Tactical Board:** Grid, fog of war (reveal/hide/undo), ruler, pings, tokens w/ portraits, active-turn highlight, movement budgets.
- **Voices:** Queue-based TTS with **Browser voices (free)** or **ElevenLabs** (premium). Per-speaker voice selection + local caching for replays.
- **Asset-Full Saves:** Export/import includes scenes, portraits, and handouts as data URLs—no re-generation needed when you reload.
- **Cost Controls:** Local asset cache, selective Keeper trigger (manual by default), quick command picker, offline placeholders if you disable images.

---

## 🗂 Project Structure

This repo has a single app file:

index.html # the entire application (HTML, CSS, JS)

java
Copy
Edit

Optional docs (for Codex and contributors):

readme.md # this file
agents.md # agent prompts, engine schema, and turn logic

markdown
Copy
Edit

---

## 🚀 Quick Start

### Option A — Open locally
1. Save `index.html` somewhere on your machine.
2. Double-click `index.html` (or open with any modern browser).
3. Click **Tutorial Wizard** and follow the steps.
4. Optional: add API keys in **Settings** to enable AI features.

> Safari/Chrome may block autoplay for voices. If using browser TTS, interact once (click) before expecting audio playback.

### Option B — GitHub Pages
1. Create a public repo.
2. Add `index.html`, `readme.md`, and `agents.md`.
3. In **Settings → Pages**, set **Branch: `main`** and **/ (root)**.
4. Wait for Pages to publish and open your site URL.

---

## 🔧 Settings

- **OpenAI API Key / Chat Model:** Enables Keeper + agents + optional generation.
  - Defaults: `gpt-4o-mini` for chat; Image model `dall-e-3` (or `gpt-image-1`).
- **Enable Images / Image Model:** If enabled and a key is provided, background/portraits/handouts can be AI-generated. Otherwise, tasteful placeholders are used.
- **TTS Provider (default):**
  - **Browser (free)** — system voices, zero cost.
  - **ElevenLabs** — premium quality. Set API key + voice ID. All audio is cached locally and replayable.
  - **None** — silent mode.
- **Keeper Trigger:** `Manual` (click **Ask Keeper** or `/keeper …`) or `Auto` (Keeper replies to normal messages).
- **Keeper Style/Max Tokens:** Control verbosity and token budget to reduce spend.
- **Rules Pack:** Your own notes/house-rules (do not paste copyrighted text).

> Settings are stored in `localStorage` under `si_settings_v8`.

---

## 🧭 Tutorial & Gameplay Loop

1. **Wizard**:
   - **Settings** → (optional) API keys and defaults.
   - **Variety Pack** → era, locale, theme, and randomness seed. We also steer away from repeated coastal openings unless explicitly chosen.
   - **Pick Party** → choose **YOU** + **4 companions** (10 curated investigators). Roll stats. Assign voices if desired.
   - **Auto-Build** → background images, scenes per act, companions/NPCs, portraits, handouts, and an NPC portrait catalog (all cached).
2. **Play**:
   - Use **Start Encounter** to enter turn mode.
   - Companions/NPCs act **automatically** on their turns. You can speak or move your PC on your turn.
   - Use slash commands in chat:
     - `/roll 1d100` or `/roll 3d6+2`
     - `/check Spot 60`
     - `/keeper What do we notice?`
     - `/endturn`
   - Use **fog tools**, **ruler**, and **pings** for tactics.

---

## 🧠 Agents (Overview)

See **`agents.md`** for full prompts and engine schema.

- **Keeper**: Tutorial-forward narrator/arbiter, returns narrative + a compact `<engine>{…}</engine>` block for moves, requested rolls, etc.
- **Investigator Agents**: On their turn, each AI gets a short, persona-rich instruction and returns an `<engine>` JSON with optional `"say"`, `"move"`, and `"perform"`.

---

## 💾 Saving & Loading

- **Slots**: 6 rotating `localStorage` slots (`si_slots_v6`).
- **Export**: One JSON file containing the full state **including assets** (portraits, handouts, backgrounds) as Data URLs.
- **Import**: Paste JSON in the Save/Load modal to restore your table exactly as you left it.

> Saves made before the “asset-full save” upgrade may lack images. Re-generate assets once and re-save.

---

## 🔊 Voices

- **Queue & Replay:** When TTS is on and queueing is enabled, lines won’t overlap. Each chat line has a ▶ replay button if a voice is available for that speaker.
- **Per-Speaker Mapping:** Set provider and voice per speaker (Keeper + each PC/NPC) in **Party**.
- **Cost Control:** Prefer **Browser** for routine chatter; reserve **ElevenLabs** for key moments. The app caches ElevenLabs audio locally to avoid re-charges.

---

## 🧩 Progress Indicator

Generation tasks display a modal with:
- Flowing gradient **progress bar** (keeps animating, so you know the app is alive),
- Step list with current/complete states,
- Asset generation is cached per prompt+model; re-runs are usually instant.

---

## 🔐 Security & Privacy

- **Keys never leave your machine** except when calling the vendor API directly from your browser.
- **No backend**: calls go from your browser → OpenAI/ElevenLabs endpoints.
- **Storage**: keys/preferences in `localStorage`; generated assets/voices in IndexedDB.
- **Exports**: your save file contains embedded images/audio as Data URLs (no network required to reload).

> If you’re on shared hardware, clear your browser storage or use a guest profile.

---

## 🧪 Troubleshooting

**OpenAI Images 403/400**  
- Make sure your OpenAI org has access to the selected model (`dall-e-3` or `gpt-image-1`).
- Use **HTTPS** hosting (GitHub Pages works). Some browsers block mixed content or third-party cookies.
- If blocked/firewalled, disable “Enable Images” or switch to placeholders.

**No audio / voices overlap**  
- Enable **Queue voice** in Settings (on by default).  
- Browser voices need a user interaction before autoplay on some browsers.  
- ElevenLabs: verify API key and Voice ID; audio is cached after first play.

**CORS/network**  
- All generated assets are saved as Data URLs → no cross-origin fetching after generation.
- If your network blocks vendor APIs, you can still play with offline placeholders.

**Performance**  
- Generating multiple 1024×1024 images can take time. The progress modal keeps you informed and caches results, so it’s a one-time hit per prompt.

**I always get similar arcs**  
- Use the **Variety** step: change **Era/Locale/Theme/Seed**.  
- The generator fingerprints recent arcs to avoid near-duplicates.

---

## 🛠 Dev Notes

- **Single file app** for easy GitHub Pages hosting.  
- **IndexedDB** stores `images` (DataURLs) and `tts` (Blobs).  
- **Local caches** keyed by SHA-256 of prompt+model to prevent duplicate costs.

### Editing Prompts / Agent Behavior
- Keeper/Investigator prompts and the `<engine>` schema are documented in `agents.md`.
- Tweak temperature/max tokens in Settings or in code (`keeperMax`, default 450).

---

## 📄 License

You own your saves and generated content. This project’s code may be used, modified, and hosted for your personal games. Ensure your use of third-party APIs follows their ToS.


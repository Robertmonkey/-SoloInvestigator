# Agents & Engine Guide

This document explains how the Keeper and Investigator agents think, how we keep them distinct and efficient, and how the app consumes their outputs.

---

## Core Concepts

- **Two agent types**:
  1. **Keeper** — tutorial-oriented narrator and arbiter. Produces short narrative plus an `<engine>` JSON block for structured actions.
  2. **Investigators/NPCs** — persona-driven, single-turn actors. On their turn they return an `<engine>` with optional `"say"`, `"move"`, and `"perform"`.

- **Engine JSON in `<engine>…</engine>`**  
  We always ask agents to return **only** a small JSON object inside an `<engine>` tag. The app extracts and applies it deterministically.

---

## Engine Schema

Minimal, compact, and purpose-built for turn resolution and chat rendering.

### Investigator/NPC Turn
```json
{
  "say": "short in-character line",
  "move": { "to": [x, y] },
  "perform": "short physical action"
}
say (string, optional) — one brief in-character utterance.

move (object, optional) — destination grid coordinates [x, y]. The app enforces Chebyshev distance ≤ remaining movement.

perform (string, optional) — a compact physical description (“searches the filing cabinet”, “draws a pistol”).

Keeper Response
json
Copy
Edit
{
  "say": [
    {"speaker":"Keeper","role":"keeper","text":"short narrative & prompt"},
    {"speaker":"Companion Name","role":"pc","text":"brief in-character quip"},
    {"speaker":"NPC Name","role":"npc","text":"brief response"}
  ],
  "moves": [
    {"tokenId":"t_abcd12","to":[6,2]}
  ],
  "rollRequests": [
    {"character":"You","skill":"Spot","mod":0}
  ]
}
say (array) — lines to render in chat with speaker portraits & per-speaker TTS.

moves (array) — programmatic moves (used sparingly by Keeper to reposition scene).

rollRequests (array) — ask the UI/log to roll checks; the app formats and displays percentile results.

Prompts
Keeper System Prompt (Summary)
Role: “You are The Keeper (tutorial). Teach gently; concise beats; give a clear next action.”

Constraints:

Avoid proprietary rules text; use generic percentile checks (Success/Hard/Extreme).

In encounters: prompt the active investigator; also add one brief line for a companion and an NPC (if present).

Return compact narrative + <engine> JSON with say[], moves[], rollRequests[].

Context provided:

Scenario title, logline, acts, mode (free vs encounter).

Party list with personas; NPCs present.

Player’s PC identity/persona.

Optional “Rules Pack” (user notes only).

Short “Memory” summary of recent chat (local only).

Knobs you can tweak (in code or Settings):

keeperStyle → brief | normal | verbose (alters expected length).

keeperMax tokens → ceils cost & verbosity.

Investigator/NPC System + User Prompts (Summary)
System (persona setup):

Name, archetype, backstory/persona, traits, vitals, top skills.

“Speak in short, in-character lines.”

User (turn instruction):

“It is your turn on scene X; you have N tiles of movement and 1 action.”

“Allies: …; NPCs: …”

“Recent events: …” (last ~6 chat lines)

“Return only JSON in <engine> with "say", "move", "perform"; keep it brief and specific.”

Why this works:
The system prompt locks in identity; the user prompt anchors to the tactical layer (movement/action limit) and scene context. Keeping outputs structured prevents rambling, lowers tokens, and enables deterministic application.

Turn Flow
Start Encounter → the app rolls initiative and sets movement/action budgets.

On AI turns, the app:

Builds the persona-rich prompt and calls the chat model,

Shows a thinking indicator on the Initiative list,

Parses <engine> and:

prints a brief italicized action line for perform,

applies a validated move (consuming movement),

renders a say line with portrait + optional TTS,

Auto-advances to the next turn after a short pause.

On Your turn:

Move your token by dragging (movement budget enforced),

Use /roll and /check or chat naturally; when ready, /endturn.

Variety & Repetition Control
The wizard’s Variety Pack (Era, Locale, Theme, Seed) feeds into Keeper/arc prompts to diversify openings (e.g., inland university, mountain mines, carnival, arctic station).

Recent arcs are fingerprinted by (title|setting|act names). If a new arc’s fingerprint matches a recent one, the generator retries or falls back to demos to avoid “always at the docks” syndrome.

Cost & Latency Controls
Manual Keeper trigger (default) — you decide when to spend tokens.

Short structured outputs — compact <engine> JSON with tight max_tokens (Keeper default 450).

Local caches:

Images — keyed by (model + size + prompt) hash; avoids re-billing for repeats.

TTS (ElevenLabs) — audio blobs cached by (voice + text + speaker) hash; replay is free.

Browser TTS — zero cost fallback with per-speaker mapping.

Image model selection — dall-e-3 (high quality), gpt-image-1, or placeholders (instant, offline).

Failure & Fallbacks
No API key / HTTP error:

Keeper → offline demo guidance.

Investigator turn → emits a safe default <engine> with a cautious action line.

Images → placeholder generator (painterly gradient with prompt caption).

Audio:

If ElevenLabs fails, the line is still logged; user can replay later after credentials are fixed.

Browser TTS is used when selected or when premium is unavailable.

Examples
Investigator Turn Output (expected)
xml
Copy
Edit
<engine>{"say":"I'll check those index cards.","move":{"to":[6,3]},"perform":"sweeps a pocket torch across the shelves"}</engine>
Keeper Output (expected)
xml
Copy
Edit
<engine>{
  "say": [
    {"speaker":"Keeper","role":"keeper","text":"Dust billows as the tray rattles. Two cards are out of order."},
    {"speaker":"Eleanor Shaw","role":"pc","text":"Let me see the donor name."},
    {"speaker":"Head Librarian","role":"npc","text":"We never cataloged that collection."}
  ],
  "moves":[{"tokenId":"t_ab12cd","to":[5,3]}],
  "rollRequests":[{"character":"You","skill":"Spot","mod":0}]
}</engine>
Safety & Scope
The Keeper avoids proprietary, paid rule text. It uses generic terms: percentile checks and broad success bands (Success/Hard/Extreme).

Agents do not introduce real-world sensitive data; content is fictional and tutorial-oriented.

Customization Hooks
keeperSystem() — adjust teaching tone, number of companion/NPC asides, or remove rollRequests.

buildAIPrompt(actor) — add/remove context (e.g., inventory highlights) or tweak movement/action guidance.

Temperature — 0.6–0.9 recommended for creativity vs. consistency.

Voices — map per speaker in UI; set defaults in Settings.

Debugging Tips
If an agent outputs prose instead of <engine> JSON, it will be ignored. Lower temperature or strengthen the “return only JSON” instruction.

If moves exceed budget, the app logs: “tries to move… but lacks the movement.” Consider hinting the remaining tiles in the prompt.

If arcs feel samey, change Locale/Theme/Seed and ensure “Avoid coastal openings” is checked when not playing a port setting.

pgsql
Copy
Edit

If you want me to include these two files as downloadable assets or commit-ready blobs, say the word and I’ll package them exactly as `readme.md` and `agents.md`.








Ask ChatGPT

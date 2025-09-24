# AI Avatar Creator – Ready Player Me Integration Blueprint

This document outlines the refreshed "AI Avatar Forge" experience after integrating the Ready Player Me (RPM) web avatar creator. The goal is to combine the native RPM workflow with our immersive UI shell so users can customise companions, review exports, and tune RPG-style abilities without leaving the page.

## Page Hierarchy

- **Step Indicator / Help (Top Bar)** – Keeps users oriented within the onboarding funnel.
- **Main Workbench** – Three-column layout pairing guidance, the embedded RPM creator, and quick-access utilities.
- **Bottom Toolbar** – Primary navigation and preset management.

## Layout Overview

| Zone | Contents |
| --- | --- |
| Top Bar | `Step 1 of 3` progress tracker, contextual help button |
| Left Sidebar | Creator checklist and toggle presets that configure helper tools |
| Center | Ready Player Me iframe, export review panel, AI skill loadout |
| Right Sidebar | Color harmony inputs and avatar randomiser control |
| Footer Toolbar | Back, Next, Save Preset actions |

## Ready Player Me Embed

- The iframe source is generated at runtime with the provided API key (`sk_live_6i_IfwonynTgljZ-vbFbkGJHcUBDhIHXw9Ro`).
- `frameApi` is enabled so RPM can communicate with the shell via `postMessage`.
- Allowed browser permissions: camera, microphone, clipboard write (required for photo-based onboarding and asset exports).
- A frosted-glass loader overlay is shown until RPM sends the ready event.

### Messaging Contract

1. **Ready Event** – Listen for `v1.iframe.ready` / `v1.frame.ready`, then subscribe to:
   - `v1.avatar.exported`
   - `v1.user.set`
   - `v1.avatar.export.failed`
2. **Avatar Export** – When `v1.avatar.exported` is received, update the export panel with the GLB URL, enable copy/download actions, and refresh the model viewer.
3. **Failure States** – If `v1.avatar.export.failed` is reported, display guidance and disable the action buttons.
4. **Randomise Shortcut** – The shell dispatches a `randomize-avatar` request to RPM and replays the loader while the creator responds.

## Export Review Panel

- Uses `<model-viewer>` for real-time GLB inspection (AR-ready, auto-rotate, camera controls).
- Displays the latest avatar URL inside a styled code block.
- Provides quick actions:
  - **Copy URL** – Writes the GLB link to the clipboard with feedback states.
  - **Download GLB** – Direct link to the exported asset (disabled until RPM responds).
  - **Re-open Creator** – Scrolls the iframe into view for fast iteration.

## AI Skill Loadout

- Cards represent companion capabilities: Web Search, Image Generation, Video Generation, Research Assistant, Creative Writing.
- Progress meters mirror the neon aesthetic and highlight the featured skill.
- Footer shows remaining points and includes an Auto/Manual allocation toggle.

## Guidance Panels & Utilities

- **Creator Checklist** – Step-by-step reminders for onboarding inside RPM.
- **Quick Toggles** – Simulated feature switches to set companion defaults (preview, library sync, AR mirror, share render).
- **Color Harmonies** – Accent, secondary, and highlight colour pickers to keep marketing assets on-brand.
- **Randomizer** – Sends a shuffle command to RPM to inspire new looks.

## Visual Direction

- Dark, high-contrast gradient background with neon highlights referencing sci-fi HUDs.
- Frosted glass panels, soft glows, and rounded geometry maintain the premium, game-inspired feel.
- Responsive grid reflows to a stacked layout on tablet/mobile while keeping the RPM creator central.

## Future Enhancements

- Mirror skill allocations back into RPM via the upcoming customization API.
- Store exported avatar metadata (user ID, body type, outfits) for unlockable inventory tracking.
- Add celebratory confetti or haptic feedback when exports complete.

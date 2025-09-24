# AI Avatar Creator – Screen Blueprint

This document captures the structure and interaction model for the "AI Avatar Forge" web application. The experience merges a modern character creator aesthetic with AI companion configuration.

## Page Hierarchy

- **Step Indicator / Help (Top Bar)** – Keeps users oriented within the onboarding funnel.
- **Main Workbench** – Three-column layout combining configuration, real-time 3D preview, and quick-access utilities.
- **Bottom Toolbar** – Primary navigation and preset management.

## Layout Overview

| Zone | Contents |
| --- | --- |
| Top Bar | `Step 1 of 3` progress tracker, contextual help button |
| Left Sidebar | Four stacked panels for Face, Hair, Outfit, Accessories customizations |
| Center | 3D avatar preview (rotatable) and RPG-style skill allocation deck |
| Right Sidebar | Color pickers (hair, outfit, accessories) + Randomize build action |
| Footer Toolbar | Back, Next, Save Preset actions |

## Customization Inventory

### Face Panel
- Presets: Masculine, Feminine, Androgynous.
- Skin tone slider (light → dark) with warm/neutral/cool undertone chips.
- Eye shape presets: Round, Almond, Sharp.
- Eye color swatches: Hazel, Blue, Green, Amber, Violet, Cyan (glowing).
- Mouth expressions: Smile, Neutral, Thoughtful toggle.

### Hair Panel
- Length presets: Short, Medium, Long.
- Styles: Straight, Curly, Wavy, Afro, Buzzcut, Ponytail.
- Color palette: Natural (Black, Brown, Blonde, Red) and Futuristic (Blue, Purple, Green, Silver).

### Outfit Panel
- Card gallery: Minimalist Hoodie, Sleek Suit, Futuristic Jumpsuit, Creative Robe, Gamer Streetwear.

### Accessories Panel
- Toggle chips: Glasses, Headphones, Visor, Beanie, Helmet, Jewelry, Mask, Robotic Arm, Holographic Pet.

### Palette Panel (Right Sidebar)
- Independent color inputs for Hair, Outfit, Accessories.
- Randomize build button with playful helper copy.

## Avatar Preview & Controls
- Halo-lit frame with rotate + zoom controls.
- Stylized placeholder geometry indicating face, torso, arms, and companion pet.
- Lower stage glow to imply depth and movement.

## AI Skill Loadout
- Skills: Web Search, Image Generation, Video Generation, Research Assistant, Creative Writing.
- Each card shows current points, segmented meter, and an active highlight for primary focus.
- Footer displays remaining points and auto/manual allocation toggle.

## Visual Direction
- Dark, high-contrast gradient background with neon highlights.
- Frosted glass panels with soft glows inspired by sci-fi HUDs.
- Rounded cards and pill toggles for a playful but premium feel.
- Responsiveness: collapses to stacked panels on tablet/mobile while preserving primary preview prominence.

## Interaction Notes
- Chips and cards use active states to communicate selections.
- Randomize button triggers celebratory micro-animations (future enhancement).
- Skill meters update in real time as points are redistributed beneath the avatar.
- Save Preset stores the configuration for later reuse.

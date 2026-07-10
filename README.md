# Remindly

A minimalist, modern browser extension to help you stay mindful, hydrated, and centered during deep work or long office hours. Set gentle reminders for basic human needs—like fixing your posture, drinking water, or stretching—without breaking your focus.

## Overview

Remindly lets you set recurring reminders directly from your browser extension popup. Built with a sleek, Apple-like aesthetic using Svelte 5 and Tailwind CSS, it features smooth animations, derived state runes (`$state`, `$derived`), and an intuitive UI to toggle and manage intervals for different activities. The backend relies on Chrome Extension Service Workers, Chrome Storage API, and the Chrome Alarms API to deliver reliable browser notifications.

The project was inspired by the simple fact that when we get into "deep work" or long office hours, we often forget the basic things: drinking water, maintaining good posture, and taking a moment to stretch. 

---

## The Story of Remindly

It was 3:00 PM on a Tuesday. Alex, a software engineer, had been staring at the same block of code since 10:00 AM. His spine had slowly morphed into the shape of a cooked shrimp. His coffee mug was a dry wasteland of brown rings, and his eyes felt like they were coated in sandpaper. 

Suddenly, a coworker tapped him on the shoulder. "Hey Alex, you okay? You look like a gargoyle defending a cathedral." 

Alex blinked, his neck cracking like a glowstick. He realized he hadn't taken a sip of water or moved his legs in five hours. He needed a hero. Not a cape-wearing, flying hero, but a tiny, polite hero that lived in his browser and gently whispered, *"Hey, buddy. Drink some water. And maybe un-shrimp your back."* 

Thus, Remindly was born. A tool to save us from ourselves during the treacherous depths of deep work.

---

## Install (via GitHub Releases)

Until Remindly is published to the Chrome Web Store, you can install it manually using the latest release from this repository.

### 1. Download the Extension

Go to the **Releases** page:

👉 https://github.com/Sujith-Srikar/Remindly/releases

Download the latest release file: Remindly-${{github.ref_name}}.zip


---

### 2. Extract the ZIP File

After downloading, extract the ZIP file.

You should see a folder like this: dist/

---

### 3. Load the Extension in Chrome

1. Open Chrome and navigate to: chrome://extensions

2. Enable **Developer Mode** (toggle in the top-right corner)

3. Click **Load unpacked**

4. Select the extracted **dist/** folder

---

### 4. Pin the Extension (Optional)

After loading the extension:

1. Click the **Extensions icon** in the Chrome toolbar
2. Find **Remindly**
3. Click the **Pin icon**

Now Remindly will always be visible in your browser toolbar.

---

### Updating the Extension

When a new version is released:

1. Download the latest release ZIP
2. Extract it
3. Go to `chrome://extensions`
4. Click **Reload** on the Remindly extension


## Tech Stack

- **Frontend:** Svelte 5 (with Runes), TypeScript, Vite
- **Styling:** Tailwind CSS
- **Extension APIs:** Chrome Storage API, Chrome Alarms API, Chrome Notifications API
- **Icons:** Lucide-Svelte
- **Build Tooling:** Vite Plugin Svelte, CRXJS Vite Plugin (for extension bundling)

---

## Project Structure

```text
Remindly/
├── src/
│   ├── background/
│   │   ├── engine/
│   │   │   └── remainderEngine.ts
│   │   ├── notification/
│   │   │   └── notificationService.ts
│   │   |   └── messages.ts
│   │   ├── scheduler/
│   │   │   └── alarmScheduler.ts
│   │   └── service-worker.ts
│   ├── core/
│   │   ├── storage/
│   │   │   └── storageService.ts
│   │   └── types.ts
│   ├── manifest.json
│   ├── plugins/
│   │   ├── water/
│   │   │   └── waterRemainder.ts
│   │   └── index.ts
│   ├── popup/
│   │   ├── components/
│   │   │   ├── controls/
│   │   │   │   ├── StepSlider.svelte
│   │   │   │   └── Toggle.svelte
│   │   │   ├── feedback/
│   │   │   │   └── ProcessingRing.svelte
│   │   │   └── layout/
│   │   │       ├── Header.svelte
│   │   │       ├── RemainderCard.svelte
│   │   │       └── ThemeToggle.svelte
│   │   ├── pages/
│   │   │   └── Popup.svelte
│   │   ├── store/
│   │   │   ├── remainderStore.ts
│   │   │   └── uiStore.ts
│   │   └── popup.ts
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── constant.ts
│       └── transition.ts
├── public/
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

### Key Directories Explained

**`/src/popup`** - The Svelte Frontend
- Contains the UI components that render when you click the extension icon.
- Built using modern Svelte 5 features (like `$state`, `$derived`, and `$effect`).
- Focuses on a buttery-smooth, accessible, and premium user experience.

**`/src/background`** - The Engine
- Contains `service-worker.ts`, the background script that runs persistently.
- Listens for changes in Chrome Storage.
- Schedules Chrome Alarms based on user intervals.
- Fires native Chrome Notifications when alarms trigger.

**`/src/stores`** - State Management
- `remainderStore.ts` acts as the bridge between the UI and Chrome Storage. It syncs the Reactivity of the UI with the persistent storage of the extension.

---

## Architecture & Principles

Remindly is built on a few core design and architectural principles:

### 1. Reactive Syncing (The Svelte 5 Way)
We heavily utilize Svelte 5's Runes (`$state`, `$derived`, `$effect`) to keep the UI in sync. The `remainderStore.ts` creates a reactive state object that automatically saves to `chrome.storage.sync` whenever a value changes. This ensures that the state is never lost when the popup closes.

### 2. Ephemeral UI, Persistent Background
Chrome extension popups are ephemeral—they die the moment you click away. Therefore, no critical timer logic lives in the UI. 
- The **UI** just updates `chrome.storage`.
- The **Service Worker** listens to storage changes and schedules `chrome.alarms`.
- When an alarm fires, the Service Worker triggers a `chrome.notification`.
This guarantees that reminders trigger exactly on time, even if the popup is never opened again.

### 3. Accessible & Fluid Components
Custom components like `StepSlider.svelte` are built from scratch to allow smooth, elastic dragging mechanics while adhering to ARIA standards (e.g., `role="slider"`, `aria-valuenow`).

---

## How to Add New Reminders (For Developers)

Adding a new type of reminder (e.g., "Look away from the screen", "Take a deep breath") is straightforward!

### 1. Create a New Plugin Config

If you want to track it, create a new config in `src/plugins/[remainder_name]/remainder_name.ts`. 

*Example:*
```typescript
export const stretchReminder = {
  id: "stretch",
  title: "Stretch",
  defaultInterval: 45,
  message: "Your spine filed a complaint.",
  retrySchedule: [3, 5, 10],
  iconUrl: "/icons/stretch.png",
};
```

### 2. Export it from index.ts
Export it from:

```text
src/plugins/index.ts
```
That's it

### 3. The Background Script Handles the Rest
Because of the architecture, **you don't need to change the service worker**. The `service-worker.ts` dynamically listens to any changes in `chrome.storage`. As soon as your UI flips `enabled` to `true` and sets an `interval`, the background script will automatically create an alarm labeled `reminder-breathe` and fire notifications automatically!

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- pnpm (recommended) or npm/yarn

### Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the dev server (Vite + CRXJS will hot-reload your extension):
   ```bash
   pnpm run dev
   ```

3. **Load the Extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (toggle in the top right).
   - Click **Load unpacked**.
   - Select the `dist/` folder that was generated by the build step.

### Building for Production

Compile the extension for the Chrome Web Store:
```bash
pnpm run build
```
The optimized bundle will be neatly packaged in the `dist/` directory, ready to be zipped and uploaded.

---

## Technologies Used

- **Svelte 5** - UI framework (Runes paradigm)
- **Vite** - Lightning-fast build tool
- **CRXJS** - Vite plugin making Chrome Extension development feel like modern web dev
- **Tailwind CSS** - Utility-first styling
- **Lucide Svelte** - Beautiful SVG icons
- **TypeScript** - Type safety

---

## Contributing

Feel free to submit issues, fork the repository, and send pull requests. Whether it's adding a new reminder type, tightening the Svelte animations, or improving the background worker reliability, all contributions are welcome!

---

## License

This project is open source and available under the MIT License.

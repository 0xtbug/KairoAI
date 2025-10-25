# Installation Guide

## Easy Installation (Recommended)

### Download Pre-built Extension

1. Go to [KairoAI Releases](https://github.com/0xtbug/KairoAI/releases)
2. Download the latest `chrome-mv3-prod.zip` file
3. Extract the ZIP file to a folder on your computer
4. Load in Chrome:
   - Open `chrome://extensions`
   - Enable **"Developer mode"** (toggle in top-right)
   - Click **"Load unpacked"**
   - Select the extracted folder

That's it! Skip to [SETUP.md](./SETUP.md) to configure your API keys.

---

## Build from Source (For Developers)

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- Google Chrome browser

## Step-by-Step Installation

### 1. Clone Repository

```bash
git clone https://github.com/0xtbug/KairoAI
cd KairoAI
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Build Extension

For production:
```bash
pnpm build
```

For development:
```bash
pnpm dev
```

### 4. Load Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions`
3. Enable **"Developer mode"** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the build folder:
   - Production: `build/chrome-mv3-prod`
   - Development: `build/chrome-mv3-dev`

### 5. Verify Installation

1. You should see the KairoAI extension icon in your Chrome toolbar
2. Click the extension icon to open the side panel
3. If you see the settings page, installation is successful!

## Troubleshooting

### Extension not loading?
- Make sure you selected the correct build folder
- Check that all files are present in the build directory
- Try rebuilding: `pnpm build`

### Build errors?
- Delete `node_modules` and reinstall: `pnpm install`
- Clear Plasmo cache: Delete `.plasmo` folder
- Check Node.js version: `node --version`

### Extension crashes?
- Check Chrome DevTools console for errors
- Reload extension from `chrome://extensions`
- Try development build for better error messages

## Next Steps

After installation, proceed to [SETUP.md](./SETUP.md) to configure your API keys.

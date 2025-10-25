# KairoAI - Twitter Reply Assistant 🤖

AI-powered Chrome extension for generating smart Twitter/X replies using Gemini AI.

## Features

- 🎯 Smart AI-generated replies
- 💬 Full thread context analysis
- 🎨 Clean side panel interface
- 🔄 Regenerate option

## Installation

### Easy Way (Recommended)

1. Download from [Releases Page](https://github.com/0xtbug/KairoAI/releases)
2. Extract ZIP file
3. Load in Chrome:
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select extracted folder

### Build from Source

```bash
git clone https://github.com/0xtbug/KairoAI
cd KairoAI
pnpm install
pnpm build
# Load from build/chrome-mv3-prod
```

## Documentation

See detailed guides in the [`guide/`](./guide) folder:

- 📦 [Installation Guide](./guide/INSTALLATION.md) - Detailed installation steps
- ⚙️ [Setup Guide](./guide/SETUP.md) - Configure API keys
- 📖 [Usage Guide](./guide/USAGE.md) - How to use KairoAI
- 🛠️ [Development Guide](./guide/DEVELOPMENT.md) - For developers

## Development (Quick)

```bash
# Development mode
pnpm dev

# Production build
pnpm build

# Package for distribution
pnpm package
```

## Tech Stack

- **Framework**: Plasmo 0.90.5
- **UI**: React 18.2.0 + TailwindCSS 3.4.1
- **AI**: Google Gemini AI
- **API**: TwitterAPI.io
- **Storage**: @plasmohq/storage

## 📝 License

MIT License - feel free to use this project for any purpose.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using [Plasmo Framework](https://docs.plasmo.com/)

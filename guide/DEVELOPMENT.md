# Development Guide

## Getting Started

### Prerequisites

- Node.js v16+
- pnpm
- Git
- Chrome browser

### Initial Setup

```bash
# Clone repository
git clone <your-repo-url>
cd extension-twitter

# Install dependencies
pnpm install
```

## Development Workflow

### Development Mode

Start development server with hot reload:

```bash
pnpm dev
```

This will:
- Build extension in watch mode
- Auto-rebuild on file changes
- Output to `build/chrome-mv3-dev`

Load the extension:
1. Open `chrome://extensions`
2. Enable Developer mode
3. Click "Load unpacked"
4. Select `build/chrome-mv3-dev`

### Production Build

Create production-ready extension:

```bash
pnpm build
```

Output: `build/chrome-mv3-prod`

### Package for Distribution

Create a ZIP file for Chrome Web Store:

```bash
pnpm package
```

Output: `build/chrome-mv3-prod.zip`

## Project Structure

```
extension-twitter/
├── src/
│   ├── background/
│   │   └── index.ts          # Background service worker
│   ├── contents/
│   │   └── injectButton.ts   # Content script for inject button
│   ├── components/
│   │   ├── Footer.tsx        # Footer component
│   │   └── WelcomeScreen.tsx # Onboarding screen
│   ├── lib/
│   │   ├── ai.ts            # Gemini AI integration
│   │   ├── twitter.ts       # Twitter API helpers
│   │   └── utils.ts         # Utility functions
│   ├── sidepanel/
│   │   └── index.tsx        # Main side panel UI
│   └── style.css            # Global Tailwind styles
├── assets/
│   └── icon.svg             # Extension icon
├── guide/                   # Documentation
├── build/                   # Build output (gitignored)
└── package.json
```

## Tech Stack

### Core
- **Plasmo** 0.90.5 - Extension framework
- **TypeScript** 5.0.4 - Type safety
- **React** 18.2.0 - UI library

### Styling
- **TailwindCSS** 3.4.1 - Utility-first CSS
- **PostCSS** - CSS processing

### APIs
- **Google Gemini AI** - Reply generation
- **TwitterAPI.io** - Thread fetching

### Storage
- **@plasmohq/storage** - Chrome storage wrapper

## Available Scripts

```bash
# Development with hot reload
pnpm dev

# Production build
pnpm build

# Create distribution package
pnpm package

# Type checking
pnpm type-check

# Clean build artifacts
rm -rf build .plasmo
```

## Key Files

### `src/sidepanel/index.tsx`
Main UI component containing:
- Thread fetching logic
- AI reply generation
- Settings management
- Character counter

### `src/contents/injectButton.ts`
Content script that:
- Injects floating AI button on Twitter
- Handles button visibility
- Opens side panel on click

### `src/background/index.ts`
Service worker that:
- Handles side panel opening
- Manages extension lifecycle

### `src/lib/ai.ts`
Gemini AI integration:
- API key management
- Prompt formatting
- Response generation

### `src/lib/twitter.ts`
Twitter API helpers:
- Thread context fetching
- Tweet parsing
- Reply insertion

## Configuration

### `package.json`
- Extension metadata
- Dependencies
- Build scripts

### `tailwind.config.js`
- Custom color scheme
- Component styles

### `tsconfig.json`
- TypeScript configuration
- Path aliases

## Debugging

### Console Logs

Development builds include console logs:
```typescript
if (process.env.NODE_ENV === "development") {
  console.log("Debug info")
}
```

Production builds strip these automatically.

### Chrome DevTools

1. Right-click extension icon → "Inspect popup"
2. Or open side panel → F12
3. Check Console, Network, and Storage tabs

### Background Script Debugging

1. Go to `chrome://extensions`
2. Find KairoAI extension
3. Click "Service worker" link
4. DevTools will open for background script

## Best Practices

### Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind utility classes
- Keep components small and focused

### State Management

- Use React hooks (useState, useEffect)
- Store persistent data in Chrome storage
- Keep UI state separate from stored state

### Error Handling

```typescript
try {
  // API call
} catch (error) {
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", error)
  }
  setError("User-friendly message")
}
```

### Testing

- Test in both dev and production builds
- Test with different API keys
- Test error scenarios
- Test on various Twitter thread types

## Common Issues

### Build errors
```bash
# Clear cache and rebuild
rm -rf .plasmo node_modules
pnpm install
pnpm build
```

### Extension not updating
- Reload extension from `chrome://extensions`
- Close and reopen side panel
- Clear Chrome cache

### Type errors
```bash
# Run type checker
pnpm type-check
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Resources

- [Plasmo Documentation](https://docs.plasmo.com/)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/)

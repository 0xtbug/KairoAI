# Setup Guide

## API Keys Configuration

KairoAI requires two API keys to function:

### 1. Gemini API Key (Required)

**What it's for:** AI-powered reply generation

**How to get:**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### 2. Twitter API Key (Required)

**What it's for:** Fetching thread context from Twitter

**How to get:**
1. Visit [TwitterAPI.io](https://twitterapi.io)
2. Sign up for an account
3. Choose a plan (Free tier available)
4. Copy your API key from dashboard

## Configuring the Extension

### Method 1: First-Time Setup

1. Click the KairoAI extension icon in Chrome toolbar
2. The side panel will open
3. Click the **Settings (⚙️)** icon in the top-right
4. Enter your API keys:
   - **Gemini API Key:** Paste your Google AI key
   - **Twitter API Key:** Paste your TwitterAPI.io key
5. Click **"Save Settings"**

### Method 2: Update Settings Anytime

1. Open any Twitter/X page
2. Click the KairoAI extension icon
3. Click the **Settings (⚙️)** icon
4. Update your keys
5. Click **"Save Settings"**

## Additional Settings

### Show Inject Button
- Toggle to show/hide the floating AI button on Twitter pages
- Default: **ON**

### Prompt Style
- **Default:** Balanced, professional responses
- **Gen Z:** Casual, trendy language
- **Custom:** Write your own prompt template

## Verify Setup

1. Navigate to any Twitter/X thread
2. Click the KairoAI icon to open side panel
3. Click **"Fetch Thread"**
4. If thread loads successfully, your Twitter API key is working
5. Click **"Generate Reply"**
6. If a reply is generated, your Gemini API key is working

## Privacy & Security

- All API keys are stored **locally** in Chrome's secure storage
- No data is sent to KairoAI servers
- API calls go directly to Google AI and TwitterAPI.io
- You can remove keys anytime from settings

## Troubleshooting

### "Invalid API Key" Error
- Double-check you copied the entire key
- Make sure there are no extra spaces
- Verify the key is active in your provider's dashboard

### "Failed to fetch thread" Error
- Check your Twitter API key
- Verify you have API credits remaining
- Make sure you're on a valid Twitter thread URL

### "Failed to generate reply" Error
- Check your Gemini API key
- Verify you haven't exceeded API quota
- Try again in a few moments

## Next Steps

After setup, proceed to [USAGE.md](./USAGE.md) to learn how to use KairoAI.

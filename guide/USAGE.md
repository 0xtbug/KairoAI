# Usage Guide

## First Time Setup

### Welcome Screen

When you first install KairoAI, you'll see a welcome screen:

1. **Follow @0xwein on Twitter** (required to use the extension)
2. Enter your Twitter username (without @)
3. Click "Verify Follow"
4. Once verified, you can proceed to use KairoAI

*Note: This is a one-time requirement. You won't see this screen again.*

## Getting Started

After completing the welcome screen and setting up your API keys (see [SETUP.md](./SETUP.md)), you're ready to use KairoAI!

## Basic Workflow

### 1. Navigate to a Twitter Thread

1. Open Twitter/X in Chrome
2. Navigate to any tweet thread (URL like `https://x.com/username/status/123456...`)
3. You'll see a floating AI button on the right side of the page

### 2. Open KairoAI Side Panel

**Method 1:** Click the floating AI button on the page

**Method 2:** Click the KairoAI extension icon in Chrome toolbar

The side panel will open on the right side of your browser.

### 3. Generate AI Reply

1. Click the **"Generate Reply"** button
2. KairoAI will automatically fetch the thread and generate a reply
3. Wait a few seconds while AI analyzes the conversation
4. The generated reply will appear in the text box below

### 4. Copy Reply

1. Review the generated reply
2. Click the **"Copy"** button to copy it to your clipboard
3. You'll see a "Copied to clipboard!" confirmation

### 5. Post on Twitter

1. Go back to the Twitter thread
2. Click the reply button on the tweet
3. Paste (Ctrl+V / Cmd+V) into Twitter's reply box
4. Edit if needed
5. Click Twitter's "Post" button to send

## Advanced Features

### Regenerate Reply

Not happy with the generated reply?

1. Click the **"Regenerate"** button (🔄)
2. AI will create a new response
3. Repeat until you're satisfied

### Prompt Styles

Choose different writing styles in Settings:

**Default Style:**
- Balanced and professional
- Neutral tone
- Good for most situations

**Gen Z Style:**
- Casual and trendy
- Uses modern slang
- Relatable tone

**Custom Prompt:**
1. Go to Settings (⚙️)
2. Select "Custom" from Prompt Style
3. Write your own instructions
4. Example: "Write like a tech expert, include emoji, be enthusiastic"

### Show/Hide Inject Button

Toggle the floating AI button:

1. Open Settings (⚙️)
2. Find "Show Inject Button" toggle
3. Turn ON/OFF as needed
4. The button will appear/disappear immediately

## Tips & Tricks

### Best Practices

✅ **DO:**
- Always review AI replies before posting
- Edit replies to add your personal touch
- Use regenerate if you're not satisfied
- Test different prompt styles

❌ **DON'T:**
- Post AI replies without reading them
- Use for spam or harmful content
- Reply to sensitive topics without careful review
- Share your API keys with anyone

### Getting Better Replies

KairoAI works best when:
- You're on a valid Twitter thread page
- The conversation has clear context
- The topic is suitable for AI assistance
- There are multiple tweets in the thread

### Custom Prompts

Create your own prompt style for specific needs:

**Example prompts:**
- `"Generate a professional reply to: {thread}"`
- `"Reply with humor and emojis to: {thread}"`
- `"Write a technical analysis of: {thread}"`
- `"Create a supportive and friendly reply to: {thread}"`

### Performance Tips

**For Speed:**
- Keep side panel open while browsing Twitter
- Have your API keys configured
- Use on threads with clear context

**For Quality:**
- Try different prompt styles
- Regenerate 2-3 times to compare
- Edit AI suggestions to match your voice
- Combine AI ideas with your own thoughts

## Common Use Cases

### 1. Quick Responses

When you want to reply fast to casual tweets:

1. Open thread on Twitter
2. Click floating AI button
3. "Generate Reply" (automatically fetches thread + generates)
4. Quick review
5. "Copy" → Paste on Twitter → Post

### 2. Thoughtful Engagement

For important or professional conversations:

1. Open KairoAI side panel
2. Generate reply
3. Regenerate 2-3 times
4. Pick the best version
5. Edit to add personal insights
6. Copy and post

### 3. Writer's Block

When you're stuck on what to say:

1. Let AI generate initial ideas
2. Use the reply as inspiration
3. Rewrite completely in your own style
4. Add your unique perspective

### 4. Different Tones

Experiment with prompt styles:

- **Default**: Professional discussions
- **Gen Z**: Casual, friendly conversations
- **Custom**: Specific situations (support, humor, technical, etc.)

## Workflow Examples

### Example 1: Tech Discussion
Scenario: Someone tweets about new AI features

1. Navigate to the tweet
2. Click floating button
3. "Generate Reply" (AI automatically fetches thread context)
4. Review: "Great points! The multimodal capabilities..."
5. Click "Copy"
6. Paste into Twitter reply box
7. Add your own take: "I've been testing this and..."
8. Post

### Example 2: Casual Chat
Scenario: Friend asks for restaurant recommendations
1. Open KairoAI side panel
2. Select "Gen Z" prompt style in Settings
3. "Generate Reply" (automatically fetches thread)
4. Review casual response
5. "Copy" → Paste on Twitter
6. Post

### Example 3: Professional Networking
Scenario: Industry leader shares insights

1. Navigate to their tweet
2. Open KairoAI
3. Use "Default" prompt style
4. "Generate Reply" (automatically fetches thread)
5. Review professional tone
6. Edit to add your specific question or insight
7. "Copy" → Paste on Twitter
8. Post

## Limitations

### What KairoAI CAN Do:

- ✅ Automatically fetch thread context when generating
- ✅ Generate contextual replies based on conversation
- ✅ Analyze entire conversation threads
- ✅ Copy replies to clipboard with one click
- ✅ Customize tone with prompt styles
- ✅ Unlimited regenerations
- ✅ Toggle floating button visibility

### What KairoAI CAN'T Do:

- ❌ Automatically post replies (you must manually paste and post)
- ❌ Insert directly into Twitter reply box
- ❌ Reply to DMs or private messages
- ❌ Analyze images/videos in threads
- ❌ Handle extremely long threads (API rate limits)
- ❌ Work offline (requires internet connection)

## Troubleshooting

### Reply Not Generating?

**Check these:**
1. ✅ Gemini API key entered in Settings
2. ✅ You're on a valid Twitter thread page
3. ✅ Internet connection is stable
4. ✅ API quota not exceeded

**Try:**
- Regenerate
- Refresh the page
- Check API key validity at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Thread Not Fetching?

Thread is fetched automatically when you click "Generate Reply". If you get errors:

**Check these:**
1. ✅ Twitter API key entered in Settings
2. ✅ You're on a valid tweet URL
3. ✅ Tweet is public (not protected)

**Try:**
- Check API key at [TwitterAPI.io](https://twitterapi.io)
- Reload the Twitter page
- Try a different tweet

### Copy Button Not Working?

**Check these:**
1. ✅ Browser has clipboard permissions
2. ✅ Reply was generated successfully

**Try:**
- Manually select and copy (Ctrl+C)
- Generate a new reply
- Check browser permissions

### Settings Not Saving?

**Check these:**
1. ✅ Extension has storage permissions
2. ✅ Chrome is up to date

**Try:**
- Re-enter your settings
- Reload extension (chrome://extensions)
- Restart Chrome

## Privacy & Security

### What Data KairoAI Uses:

- **Thread content**: Sent to APIs for context analysis
- **Your API keys**: Stored locally in Chrome
- **Settings**: Stored locally in Chrome

### What KairoAI Does NOT Collect:

- ❌ Your Twitter password or login credentials
- ❌ Personal information
- ❌ Browsing history outside Twitter
- ❌ Your posted replies or tweets

### Data Storage:

- **API keys**: Chrome local storage (your device only)
- **Settings**: Chrome local storage
- **No cloud storage**: Everything stays on your device
- **No tracking**: No analytics or telemetry

### API Privacy:

- **Google Gemini**: Processes thread content for AI replies (see [Google's Privacy Policy](https://policies.google.com/privacy))
- **TwitterAPI.io**: Fetches public tweet data (see [TwitterAPI.io Terms](https://twitterapi.io/terms))

## Best Practices Summary

### ✅ Recommended Workflow:

1. Open Twitter thread
2. Click KairoAI button
3. Generate Reply (auto-fetches thread)
4. Review and edit
5. Copy to clipboard
6. Paste into Twitter
7. Post manually

### 🎯 For Best Results:

- Always review AI replies before posting
- Personalize with your own voice
- Use appropriate prompt style for context
- Regenerate if needed
- Edit for accuracy and tone

### 🔒 For Security:

- Never share your API keys
- Keep extension updated
- Review replies for sensitive info
- Use official sources for API keys

## Getting Help

### Need Support?

1. **Setup issues**: Check [SETUP.md](./SETUP.md)
2. **Install problems**: Check [INSTALLATION.md](./INSTALLATION.md)
3. **Development**: Check [DEVELOPMENT.md](./DEVELOPMENT.md)
4. **Bug reports**: [GitHub Issues](https://github.com/0xtbug/KairoAI/issues)

### Additional Resources:

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [TwitterAPI.io Documentation](https://twitterapi.io/docs)
- [Plasmo Framework](https://docs.plasmo.com)

## Next Steps

Now that you know how to use KairoAI:

1. Start replying to threads!
2. Experiment with different prompt styles
3. Find your perfect workflow
4. Share feedback on GitHub

Happy tweeting! 🎉

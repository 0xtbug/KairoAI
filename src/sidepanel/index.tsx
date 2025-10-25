import React, { useState } from "react"

import { Storage } from "@plasmohq/storage"

import { WelcomeScreen } from "~components/WelcomeScreen"
import { GeminiProvider } from "~lib/ai"
import { fetchThreadContext, getTweetIdFromUrl } from "~lib/twitter"
import { formatPrompt } from "~lib/utils"
import { Footer } from "~components/Footer";

import "~./style.css"

import iconUrl from "data-base64:~../assets/icon.svg"

const storage = new Storage()

const SidePanel = () => {
  const [loading, setLoading] = useState(false)
  const [reply, setReply] = useState("")
  const [context, setContext] = useState<any>(null)
  const [error, setError] = useState("")
  const [geminiApiKey, setGeminiApiKey] = useState("")
  const [twitterApiKey, setTwitterApiKey] = useState("")
  const [showInjectButton, setShowInjectButton] = useState(true)
  const [promptStyle, setPromptStyle] = useState("default")
  const [customPrompt, setCustomPrompt] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)

  React.useEffect(() => {
    const loadSettings = async () => {
      try {
        // Check if user has completed onboarding
        const hasCompletedOnboarding = (await storage.get(
          "onboarding_completed"
        )) as boolean

        if (!hasCompletedOnboarding) {
          setShowWelcome(true)
          setIsFirstTime(true)
        } else {
          setIsFirstTime(false)
        }

        const geminiKey = (await storage.get("gemini_api_key")) as string
        const twitterKey = (await storage.get("twitter_api_key")) as string
        const buttonSetting = (await storage.get("show_inject_button")) as
          | boolean
          | undefined
        const promptStyleSetting = (await storage.get("prompt_style")) as
          | string
          | undefined
        const customPromptSetting = (await storage.get("custom_prompt")) as
          | string
          | undefined

        if (geminiKey) setGeminiApiKey(geminiKey)
        if (twitterKey) {
          setTwitterApiKey(twitterKey)
        } else if (process.env.PLASMO_PUBLIC_TWITTER_API_KEY) {
          setTwitterApiKey(process.env.PLASMO_PUBLIC_TWITTER_API_KEY)
        }
        setShowInjectButton(buttonSetting !== false)
        setPromptStyle(promptStyleSetting || "default")
        setCustomPrompt(customPromptSetting || "")
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Error loading settings:", error)
        }
      }
    }
    loadSettings()
  }, [])

  const handleWelcomeComplete = async () => {
    await storage.set("onboarding_completed", true)
    setShowWelcome(false)
    setIsFirstTime(false)
  }

  const saveSettings = async () => {
    try {
      await storage.set("gemini_api_key", geminiApiKey)
      await storage.set("twitter_api_key", twitterApiKey)
      await storage.set("show_inject_button", showInjectButton)
      await storage.set("prompt_style", promptStyle)
      await storage.set("custom_prompt", customPrompt)
      setShowSettings(false)
      setError("Settings saved successfully")
      setTimeout(() => setError(""), 2000)
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error saving settings:", error)
      }
      setError("Failed to save settings")
    }
  }

  const fetchThread = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (!tab.url) throw new Error("No active tab found")

    const tweetId = getTweetIdFromUrl(tab.url)
    if (!tweetId)
      throw new Error("Not a valid tweet page. Please open a tweet first.")

    const data = await fetchThreadContext(tweetId, twitterApiKey)
    if (!data)
      throw new Error(
        "Failed to fetch thread context. Check your Twitter API key."
      )

    setContext(data)
    return data
  }

  const generate = async () => {
    setLoading(true)
    setError("")

    try {
      if (!geminiApiKey) throw new Error("Please set your Gemini API key first")

      const data = await fetchThread()
      const prompt = formatPrompt(data, promptStyle, customPrompt)

      const ai = new GeminiProvider(geminiApiKey)
      const text = await ai.generateReply(prompt)
      setReply(text)
    } catch (err: any) {
      setError(err.message || "An error occurred")
      if (process.env.NODE_ENV === "development") {
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(reply)
      const originalError = error
      setError("Copied to clipboard!")
      setTimeout(() => setError(originalError), 2000)
    } catch (err: any) {
      setError(err.message || "Failed to copy to clipboard")
      if (process.env.NODE_ENV === "development") {
        console.error(err)
      }
    }
  }

  const regenerate = () => {
    generate()
  }

  // Show welcome screen if first time
  if (showWelcome && isFirstTime) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-[#083335] to-gray-800 text-white flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#083335]/50 bg-[#083335]/30 backdrop-blur-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img
              src={iconUrl}
              alt="Kairo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#00bf63] to-[#0ae87f] bg-clip-text text-transparent">
            KairoAI
          </h1>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
          title="Settings">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      {showSettings ? (
        <div className="p-6 flex-1 flex flex-col overflow-auto">
          <h2 className="text-lg font-semibold mb-6 text-gray-200">Settings</h2>

          {/* API Keys Section */}
          <div className="space-y-5 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Twitter API Key
              </label>
              <input
                type="password"
                value={twitterApiKey}
                onChange={(e) => setTwitterApiKey(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-[#083335] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00bf63] focus:border-transparent transition-all"
                placeholder="Enter your Twitter API key"
              />
              <p className="text-xs text-gray-400 mt-2">
                Get from{" "}
                <a
                  href="https://twitterapi.io"
                  target="_blank"
                  className="text-[#00bf63] hover:text-[#0ae87f] transition-colors">
                  twitterapi.io
                </a>
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Gemini API Key
              </label>
              <input
                type="password"
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-[#083335] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00bf63] focus:border-transparent transition-all"
                placeholder="Enter your Gemini API key"
              />
              <p className="text-xs text-gray-400 mt-2">
                Get from{" "}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  className="text-[#00bf63] hover:text-[#0ae87f] transition-colors">
                  Google AI Studio
                </a>
              </p>
            </div>
          </div>

          {/* Prompt Style Section */}
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Prompt Style
            </label>
            <select
              value={promptStyle}
              onChange={(e) => setPromptStyle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-[#083335] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00bf63] focus:border-transparent transition-all">
              <option value="default">Default (Professional)</option>
              <option value="genz">Gen Z (Casual & Witty)</option>
              <option value="custom">Custom (Manual)</option>
            </select>
            <p className="text-xs text-gray-400 mt-2">
              Choose reply style and tone
            </p>
          </div>

          {promptStyle === "custom" && (
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Custom Prompt
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-gray-800 border border-[#083335] text-white text-sm min-h-[140px] resize-y focus:outline-none focus:ring-2 focus:ring-[#00bf63] focus:border-transparent transition-all"
                placeholder="Enter your custom prompt instructions here...&#10;&#10;Example:&#10;You are replying in Gen Z Twitter style: casual, witty, and short. Keep it under 35 words. Do not use emojis and do not put a dot at the end."
              />
              <p className="text-xs text-gray-400 mt-2">
                Write your custom instructions for how the AI should reply
              </p>
            </div>
          )}

          {/* Button Visibility Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-[#083335]/50">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Show Kairo icon
                </label>
                <p className="text-xs text-gray-400">
                  Display Kairo icon on tweet pages
                </p>
              </div>
              <button
                onClick={() => setShowInjectButton(!showInjectButton)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showInjectButton ? "bg-[#00bf63]" : "bg-gray-600"
                }`}>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showInjectButton ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <button
            onClick={saveSettings}
            className="w-full bg-gradient-to-r from-[#083335] to-[#00bf63] hover:from-[#0a4447] hover:to-[#0ae87f] px-4 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
            Save Settings
          </button>
        </div>
      ) : (
        <div className="p-6 flex-1 flex flex-col">
          <button
            onClick={generate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#083335] to-[#00bf63] hover:from-[#0a4447] hover:to-[#0ae87f] disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl mb-4">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Reply"
            )}
          </button>

          {error && (
            <div
              className={`px-4 py-3 rounded-lg mb-4 text-sm ${
                error.includes("Copied") || error.includes("saved")
                  ? "bg-[#00bf63]/20 border border-[#00bf63] text-[#00bf63]"
                  : "bg-red-900/30 border border-red-700 text-red-300"
              }`}>
              {error}
            </div>
          )}

          {reply && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-300">
                  Generated Reply
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 bg-[#00bf63] hover:bg-[#0ae87f] text-white rounded-lg text-sm transition-all shadow-md hover:shadow-lg">
                    Copy
                  </button>
                  <button
                    onClick={regenerate}
                    disabled={loading}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-all border border-[#083335] disabled:opacity-50 disabled:cursor-not-allowed">
                    Regenerate
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 bg-gray-800/50 rounded-lg border border-[#083335]/50 overflow-auto">
                <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                  {reply}
                </p>
              </div>
            </div>
          )}

          {!reply && !loading && !error && (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 opacity-30">
                  <img
                    src={iconUrl}
                    alt="KairoAI"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>
                <p className="text-sm">
                  Click "Generate Reply" to create a KairoAI-powered response
                </p>
              </div>
            </div>
          )}

            {/* Footer */}
          <div className="mt-auto pt-4 border-t border-[#083335]/30">
            <Footer />
          </div>
        </div>
      )}
    </div>
  )
}

export default SidePanel

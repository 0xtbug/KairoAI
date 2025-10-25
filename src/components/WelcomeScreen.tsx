import iconUrl from "data-base64:~../assets/icon.svg"
import React, { useState } from "react"

import { Footer } from "./Footer"

interface WelcomeScreenProps {
  onComplete: () => void
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const checkFollow = async () => {
    if (!username.trim()) {
      setError("Please enter your Twitter username")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("https://tw-follow.vercel.app/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          source_username: username.replace("@", "").trim(),
          target_username: "0xwein"
        })
      })

      const data = await response.json()

      if (data.status === "success" && data.data?.following) {
        setSuccess(true)
        setError("")
        setTimeout(() => {
          onComplete()
        }, 2000)
      } else if (data.status === "success" && !data.data?.following) {
        setError(data.customMessage || "You don't follow yet! Go follow me.")
      } else {
        setError(data.error)
      }
    } catch (err: any) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error checking follow:", err)
      }
      setError("Failed to connect to server. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-[#083335] to-gray-800 text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4">
            <img
              src={iconUrl}
              alt="KairoAI"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00bf63] to-[#0ae87f] bg-clip-text text-transparent mb-2">
            Welcome to KairoAI
          </h1>
          <p className="text-gray-400 text-sm">
            AI-powered Twitter Reply Assistant
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-[#083335]/50 p-6 shadow-2xl">
          {!success ? (
            <>
              {/* Follow Request */}
              <div className="mb-6 text-center">
                <p className="text-gray-300 mb-3">
                  To get started, please follow our Twitter account:
                </p>
                <a
                  href="https://x.com/0xwein"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#083335] to-[#00bf63] hover:from-[#0a4447] hover:to-[#0ae87f] rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Follow @0xwein
                </a>
              </div>

              <div className="border-t border-[#083335]/30 pt-1">
                <p className="text-gray-400 text-sm mb-4 text-center">
                  Enter your Twitter username to verify:
                </p>

                {/* Username Input */}
                <div className="mb-4">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && checkFollow()}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-[#083335] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00bf63] focus:border-transparent transition-all"
                    disabled={loading}
                  />
                </div>

                {/* Error/Success Message */}
                {error && (
                  <div className="mb-4 px-4 py-3 rounded-lg bg-red-900/30 border border-red-700 text-red-300 text-sm">
                    {error}
                  </div>
                )}

                {/* Check Button */}
                <button
                  onClick={checkFollow}
                  disabled={loading || !username.trim()}
                  className="w-full bg-gradient-to-r from-[#083335] to-[#00bf63] hover:from-[#0a4447] hover:to-[#0ae87f] disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl">
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
                      Checking...
                    </span>
                  ) : (
                    "Verify Follow"
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00bf63]/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#00bf63]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#00bf63] mb-2">
                Thanks for following!
              </h3>
              <p className="text-gray-400 text-sm">Redirecting to KairoAI...</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  )
}

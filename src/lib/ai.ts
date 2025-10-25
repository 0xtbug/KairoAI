export interface AIProvider {
  generateReply(prompt: string): Promise<string>;
}

export class GeminiProvider implements AIProvider {
  constructor(private apiKey: string) {}

  async generateReply(prompt: string): Promise<string> {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      )

      if (!res.ok) {
        throw new Error(`Gemini API error: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "No reply generated."
    } catch (error) {
      console.error("Error generating reply:", error)
      throw error
    }
  }
}

export interface TweetData {
  target_tweet: string
  author: string
  thread_context: Array<{
    tweet: string
    author: string
  }>
}

export async function fetchThreadContext(
  tweetId: string,
  apiKey?: string
): Promise<TweetData | null> {
  try {
    const url = `https://api.twitterapi.io/twitter/tweet/thread_context?tweetId=${tweetId}`

    const key = apiKey || process.env.PLASMO_PUBLIC_TWITTER_API_KEY || ""

    console.log("Fetching thread context for tweet:", tweetId)
    console.log("API URL:", url)
    console.log("Using API key:", key.substring(0, 10) + "...")

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": key,
        Accept: "application/json"
      }
    })

    if (!res.ok) {
      console.error(`Failed to fetch thread: ${res.status}`)
      const errorText = await res.text()
      console.error("Error response:", errorText)
      return null
    }

    const data = await res.json()
    console.log("Thread data received:", data)

    if (
      !data.tweets ||
      !Array.isArray(data.tweets) ||
      data.tweets.length === 0
    ) {
      console.error("No tweets found in response")
      return null
    }

    const targetTweet = data.tweets[0]

    const threadTweets = data.tweets.slice(1)

    return {
      target_tweet: targetTweet.text || "",
      author:
        targetTweet.author?.userName || targetTweet.author?.name || "Unknown",
      thread_context: threadTweets.map((tweet) => ({
        tweet: tweet.text || "",
        author: tweet.author?.userName || tweet.author?.name || "Unknown"
      }))
    }
  } catch (error) {
    console.error("Error fetching thread context:", error)
    return null
  }
}

export function getTweetIdFromUrl(url: string): string | null {
  const match = url.match(/status\/(\d+)/)
  return match ? match[1] : null
}

import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

import iconUrl from "data-base64:~../assets/icon.svg"

const storage = new Storage()

export const config: PlasmoCSConfig = {
  matches: ["https://x.com/*/status/*", "https://twitter.com/*/status/*"],
  run_at: "document_end"
}

const createButton = async () => {
  const showButton = (await storage.get("show_inject_button")) as boolean | undefined
  const shouldShow = showButton !== false

  if (!shouldShow) {
    removeButton()
    return
  }

  if (!window.location.href.match(/\/status\/\d+/)) {
    removeButton()
    return
  }

  if (document.getElementById("ai-reply-button")) {
    return
  }

  const btn = document.createElement("button")
  btn.id = "ai-reply-button"
  btn.innerHTML = `<img src="${iconUrl}" style="width: 50px; height: 50px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));" alt="AI Reply" />`
  btn.style.cssText = `
    position: fixed;
    top: 100px;
    right: 5px;
    z-index: 9999;
    padding: 8px;
    background: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  `

  btn.onmouseover = () => {
    btn.style.transform = "scale(1.15)"
    btn.style.filter = "brightness(1.2)"
  }

  btn.onmouseout = () => {
    btn.style.transform = "scale(1)"
    btn.style.filter = "brightness(1)"
  }

  btn.onclick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    btn.disabled = true
    btn.style.opacity = "0.5"
    btn.style.animation = "pulse 1s infinite"

    try {
      chrome.runtime.sendMessage({ action: "open_sidepanel" }, (response) => {
        if (chrome.runtime.lastError) {
          if (process.env.NODE_ENV === "development") {
            console.error("Error opening side panel:", chrome.runtime.lastError)
          }
          btn.disabled = false
          btn.style.opacity = "1"
          btn.style.animation = "none"
        } else {
          btn.disabled = false
          btn.style.opacity = "1"
          btn.style.animation = "none"
        }
      })
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("Exception:", err)
      }
      btn.disabled = false
      btn.style.opacity = "1"
      btn.style.animation = "none"
    }
  }

  document.body.appendChild(btn)
}

const removeButton = () => {
  const existingBtn = document.getElementById("ai-reply-button")
  if (existingBtn) {
    existingBtn.remove()
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => createButton(), 1000)
  })
} else {
  setTimeout(() => createButton(), 1000)
}

let lastUrl = window.location.href
const checkUrlChange = async () => {
  const currentUrl = window.location.href
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl

    if (currentUrl.match(/\/status\/\d+/)) {
      setTimeout(() => createButton(), 1000)
    } else {
      removeButton()
    }
  }
}

const observer = new MutationObserver(() => {
  checkUrlChange()
})

observer.observe(document.body, { childList: true, subtree: true })

window.addEventListener("popstate", () => {
  setTimeout(checkUrlChange, 500)
})

storage.watch({
  "show_inject_button": (change) => {
    if (change.newValue === false) {
      removeButton()
    } else {
      setTimeout(() => createButton(), 500)
    }
  }
})

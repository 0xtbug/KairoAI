export {}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "open_sidepanel") {
    console.log("📩 Received open_sidepanel message from:", sender.tab?.id)

    const openPanel = async () => {
      try {
        let windowId = sender.tab?.windowId

        if (!windowId) {
          const window = await chrome.windows.getCurrent()
          windowId = window.id
        }

        if (windowId) {
          console.log("🔧 Opening side panel in window:", windowId)
          await chrome.sidePanel.open({ windowId: windowId })
          console.log("✅ Side panel opened successfully")
          sendResponse({ success: true })
        } else {
          throw new Error("No window ID available")
        }
      } catch (err) {
        console.error("❌ Error opening side panel:", err)
        sendResponse({ success: false, error: String(err) })
      }
    }

    openPanel()
    return true
  }
})

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error("Error setting panel behavior:", error))

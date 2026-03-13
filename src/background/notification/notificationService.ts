import type { RemainderConfig } from "../../core/types";

export const notificationService = {

  showRemainderNotification (remainderConfig: RemainderConfig) {
    console.log(JSON.stringify(remainderConfig))
    chrome.notifications.create(remainderConfig.id, {
      title: remainderConfig.title,
      message: remainderConfig.message,
      type: "basic",
      buttons: [{ title: "YES" }, { title: "You have to!!!" }],
      iconUrl:  chrome.runtime.getURL("tank-truck.png"),
    });
  },

  showGoodByeNotification (remainderConfig: RemainderConfig) {
    chrome.notifications.create(remainderConfig.id, {
      title: "Remainder Disabled",
      message: "Looks like you're busy. I'll stop reminding you 👋",
      type: "basic",
      iconUrl:  chrome.runtime.getURL("tank-truck.png"),
    })
  }
};

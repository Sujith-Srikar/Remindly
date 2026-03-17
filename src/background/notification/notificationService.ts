import type { RemainderConfig } from "../../core/types";

export const notificationService = {

  showRemainderNotification (remainderConfig: RemainderConfig) {
    const uniqueId = `${remainderConfig.id}-${Date.now()}`;
    chrome.notifications.create(uniqueId, {
      title: remainderConfig.title,
      message: remainderConfig.message,
      type: "basic",
      buttons: [{ title: "YES" }, { title: "You have to!!!" }],
      iconUrl:  "tank-truck.png",
    }, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error("Notification Error:", chrome.runtime.lastError);
      } else {
        console.log("Notification created successfully:", notificationId);
      }
    });
  },

  showGoodByeNotification (remainderConfig: RemainderConfig) {
    chrome.notifications.create(remainderConfig.id, {
      title: "Remainder Disabled",
      message: "Looks like you're busy. I'll stop reminding you 👋",
      type: "basic",
      iconUrl:  "tank-truck.png",
    }, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error("GoodBye Notification Error:", chrome.runtime.lastError);
      }
    });
  }
};

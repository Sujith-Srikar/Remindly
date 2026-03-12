import type { RemainderConfig } from "../../core/types";

export const notificationService = {
  showRemainderNotification(remainderConfig: RemainderConfig) {
    chrome.notifications.create(remainderConfig.id, {
      title: remainderConfig.title,
      message: remainderConfig.message,
      type: "basic",
      buttons: [{ title: "YES" }, { title: "You have to!!!" }],
      iconUrl:  chrome.runtime.getURL("tank-truck.png"),
    });
  },
};

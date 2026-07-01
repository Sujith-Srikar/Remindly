import type { RemainderConfig } from "../../core/types";
import { randomGoodByeMessage } from "./messages";

const DEFAULT_ICON = "icons/default.png";

export const notificationService = {

  showRemainderNotification(remainderConfig: RemainderConfig) {
    const uniqueId = `${remainderConfig.id}`;
    chrome.notifications.create(uniqueId, {
      title: remainderConfig.title,
      message: remainderConfig.message,
      type: "basic",
      buttons: [{
        title: remainderConfig.buttonLabels?.accept ?? "On it"
      }, {
        title: remainderConfig.buttonLabels?.dismiss ?? "Maybe later"
      }],
      iconUrl: chrome.runtime.getURL(remainderConfig.iconUrl ?? DEFAULT_ICON),
    }, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error(`Notification Error for id-${notificationId}:`, JSON.stringify(chrome.runtime.lastError));
      } else {
        console.log("Notification created successfully:", notificationId);
      }
    });
  },

  showGoodByeNotification(remainderConfig: RemainderConfig) {
    const message = randomGoodByeMessage();
    chrome.notifications.create(remainderConfig.id, {
      title: "Remainder Disabled",
      message,
      type: "basic",
      iconUrl: chrome.runtime.getURL(remainderConfig.iconUrl ?? DEFAULT_ICON),
    }, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error(`GoodBye Notification Error for id-${notificationId}:`, JSON.stringify(chrome.runtime.lastError));
      }
      else {
        console.log("Notification created successfully:", notificationId);
      }
    });
  }
};

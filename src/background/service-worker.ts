import { type RemainderSettings } from "./../core/types";
import { remainderEngine } from "./engine/remainderEngine";

const notificationsClosedByButton = new Set<string>();

chrome.runtime.onInstalled.addListener(() => remainderEngine.init());

chrome.runtime.onStartup.addListener(() => remainderEngine.init());
chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    const newSettings = newValue as RemainderSettings | undefined;
    console.log("Key:",key)
    remainderEngine.stopRemainder(key);

    if (newSettings?.enabled) {
      remainderEngine.startRemainder(key, newSettings);
    }
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  remainderEngine.handleAlarm(alarm);
});

chrome.notifications.onButtonClicked.addListener(
  (notificationId, buttonIndex) => {
    notificationsClosedByButton.add(notificationId);

    if (buttonIndex === 1) {
      remainderEngine.handleIgnored(notificationId);
    }
  },
);

chrome.notifications.onClosed.addListener((notificationId, byuser) => {
  if(!byuser) return;

  if (notificationsClosedByButton.has(notificationId)) {
    notificationsClosedByButton.delete(notificationId);
    return;
  }

  remainderEngine.handleIgnored(notificationId);
})
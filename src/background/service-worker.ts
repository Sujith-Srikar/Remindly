import { type RemainderSettings } from "./../core/types";
import { remainderEngine } from "./engine/remainderEngine";

chrome.runtime.onInstalled.addListener(() => remainderEngine.init());

chrome.runtime.onStartup.addListener(() => remainderEngine.init());

chrome.storage.onChanged.addListener((changes) => {
  for (let [key, { newValue }] of Object.entries(changes)) {
    const newSettings = newValue as RemainderSettings | undefined;

    remainderEngine.stopRemainder(key);

    if(newSettings?.enabled){
        remainderEngine.startRemainder(key, newSettings);
    }
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  remainderEngine.handleAlarm(alarm);
});

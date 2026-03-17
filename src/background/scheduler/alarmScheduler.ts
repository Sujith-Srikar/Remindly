import { REMAINDER, RETRY } from "../../utils/constant";

export const alarmScheduler = {

  async scheduleAlarm (remainderId: string, interval: number) {
    await chrome.alarms.create(`${REMAINDER}:${remainderId}`, { periodInMinutes: interval });
  },

  async scheduleRetryAlarm (remainderId: string, stage: number, delay: number) {
    await chrome.alarms.create(`${RETRY}:${remainderId}:${stage}` , { delayInMinutes: delay })
  },

  async clearAlarm (remainderId: string) {
    const alarms = await chrome.alarms.getAll();
    const retryPrefix = `${RETRY}:${remainderId}:`;
    const remainderPrefix = `${REMAINDER}:${remainderId}`

    await Promise.all(
      alarms
        .filter((alarm) => alarm.name.startsWith(retryPrefix) || alarm.name.startsWith(remainderPrefix))
        .map((alarm) => chrome.alarms.clear(alarm.name)),
    );
  },

};
